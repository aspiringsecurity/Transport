import { SubstrateBlock, toHex } from "@subsquid/substrate-processor";
import { LessThanOrEqual } from "typeorm";
import {
    CumulativeVolume,
    CumulativeVolumePerCurrencyPair,
    Redeem,
    RedeemCancellation,
    RedeemExecution,
    RedeemPeriod,
    RedeemRequest,
    RedeemStatus,
    RelayedBlock,
    VolumeType,
} from "../../model";
import { Ctx, EventItem } from "../../processor";
import {
    RedeemCancelRedeemEvent,
    RedeemExecuteRedeemEvent,
    RedeemRedeemPeriodChangeEvent,
    RedeemRequestRedeemEvent,
} from "../../types/events";
import {
    address,
    currencyId,
    encodeLegacyVaultId,
    encodeVaultId,
    legacyCurrencyId,
} from "../encoding";
import {
    updateCumulativeVolumes,
    updateCumulativeVolumesForCurrencyPair,
} from "../utils/cumulativeVolumes";
import EntityBuffer from "../utils/entityBuffer";
import { blockToHeight } from "../utils/heights";
import { getCurrentRedeemPeriod } from "../utils/requestPeriods";
import { getVaultId, getVaultIdLegacy } from "../_utils";

export async function requestRedeem(
    ctx: Ctx,
    block: SubstrateBlock,
    item: EventItem,
    entityBuffer: EntityBuffer
): Promise<void> {
    const rawEvent = new RedeemRequestRedeemEvent(ctx, item.event);
    let e;
    let vault;
    let vaultIdString;
    if (rawEvent.isV6 || rawEvent.isV15) {
        // legacy encodings
        if (rawEvent.isV6) e = rawEvent.asV6;
        else e = rawEvent.asV15;
        vault = await getVaultIdLegacy(ctx.store, e.vaultId);
        vaultIdString = encodeLegacyVaultId(e.vaultId);
    } else {
        if (rawEvent.isV17) e = rawEvent.asV17;
        else if (rawEvent.isV1020000) e = rawEvent.asV1020000;
        else if (rawEvent.isV1021000) e = rawEvent.asV1021000;
        else {
            ctx.log.warn(`UNKOWN EVENT VERSION: Redeem.requestRedeem`);
            return;
        }

        vault = await getVaultId(ctx.store, e.vaultId);
        vaultIdString = encodeVaultId(e.vaultId);
    }

    if (vault === undefined) {
        ctx.log.warn(
            `WARNING: no vault ID found for issue request ${toHex(
                e.redeemId
            )}, with encoded account-wrapped-collateral ID of ${vaultIdString} (at parachain absolute height ${
                block.height
            }`
        );
        return;
    }

    const period = await getCurrentRedeemPeriod(ctx, block);

    const redeem = new Redeem({
        id: toHex(e.redeemId),
        bridgeFee: e.fee,
        collateralPremium: e.premium,
        userParachainAddress: address.interlay.encode(e.redeemer),
        vault: vault,
        userBackingAddress: address.btc.encode(e.btcAddress),
        btcTransferFee: e.transferFee,
        status: RedeemStatus.Pending,
        period,
    });
    const height = await blockToHeight(ctx, block.height, "RequestIssue");

    const backingBlock = await ctx.store.get(RelayedBlock, {
        order: { backingHeight: "DESC" },
        relations: { relayedAtHeight: true },
        where: {
            relayedAtHeight: {
                absolute: LessThanOrEqual(height.absolute),
            },
        },
    });

    if (backingBlock === undefined) {
        ctx.log.warn(
            `WARNING: no BTC blocks relayed before redeem request ${redeem.id} (at parachain absolute height ${height.absolute})`
        );
    }

    redeem.request = new RedeemRequest({
        requestedAmountBacking: e.amount,
        height: height.id,
        timestamp: new Date(block.timestamp),
        backingHeight: backingBlock?.backingHeight || 0,
    });

    entityBuffer.pushEntity(Redeem.name, redeem);
}

export async function executeRedeem(
    ctx: Ctx,
    block: SubstrateBlock,
    item: EventItem,
    entityBuffer: EntityBuffer
): Promise<void> {
    const rawEvent = new RedeemExecuteRedeemEvent(ctx, item.event);
    let e;
    let collateralCurrency;
    let wrappedCurrency;
    if (rawEvent.isV6 || rawEvent.isV15) {
        if (rawEvent.isV6) e = rawEvent.asV6;
        else e = rawEvent.asV15;
        collateralCurrency = legacyCurrencyId.encode(
            e.vaultId.currencies.collateral
        );
        wrappedCurrency = legacyCurrencyId.encode(e.vaultId.currencies.wrapped);
    } else {
        if (rawEvent.isV17) e = rawEvent.asV17;
        else if (rawEvent.isV1020000) e = rawEvent.asV1020000;
        else if (rawEvent.isV1021000) e = rawEvent.asV1021000;
        else {
            ctx.log.warn(`UNKOWN EVENT VERSION: Redeem.executeRedeem`);
            return;
        }

        collateralCurrency = currencyId.encode(e.vaultId.currencies.collateral);
        wrappedCurrency = currencyId.encode(e.vaultId.currencies.wrapped);
    }

    const redeem = await ctx.store.get(Redeem, {
        where: { id: toHex(e.redeemId) },
    });
    if (redeem === undefined) {
        ctx.log.warn(
            "WARNING: ExecuteRedeem event did not match any existing redeem requests! Skipping."
        );
        return;
    }
    const height = await blockToHeight(ctx, block.height, "ExecuteRedeem");
    const execution = new RedeemExecution({
        id: redeem.id,
        redeem,
        height,
        timestamp: new Date(block.timestamp),
    });
    redeem.status = RedeemStatus.Completed;
    redeem.execution = execution;

    entityBuffer.pushEntity(RedeemExecution.name, execution);
    entityBuffer.pushEntity(Redeem.name, redeem);

    const volumeTypes = [VolumeType.Redeemed, VolumeType.BridgeVolume];
    for (const volumeType of volumeTypes) {
        entityBuffer.pushEntity(
            CumulativeVolume.name,
            await updateCumulativeVolumes(
                ctx.store,
                volumeType,
                redeem.request.requestedAmountBacking,
                new Date(block.timestamp),
                entityBuffer
            )
        );
    }
    // amount is negated as locked value is decreasing
    entityBuffer.pushEntity(

        CumulativeVolume.name,
        await updateCumulativeVolumes(
            ctx.store,
            VolumeType.Locked,
            - redeem.request.requestedAmountBacking,
            new Date(block.timestamp),
            entityBuffer
        )
    );
    entityBuffer.pushEntity(
        CumulativeVolumePerCurrencyPair.name,
        await updateCumulativeVolumesForCurrencyPair(
            ctx.store,
            VolumeType.Redeemed,
            redeem.request.requestedAmountBacking,
            new Date(block.timestamp),
            collateralCurrency,
            wrappedCurrency,
            entityBuffer
        )
    );
}

export async function cancelRedeem(
    ctx: Ctx,
    block: SubstrateBlock,
    item: EventItem,
    entityBuffer: EntityBuffer
): Promise<void> {
    const rawEvent = new RedeemCancelRedeemEvent(ctx, item.event);
    let e;
    if (rawEvent.isV6) e = rawEvent.asV6;
    else if (rawEvent.isV15) e = rawEvent.asV15;
    else if (rawEvent.isV17) e = rawEvent.asV17;
    else if (rawEvent.isV1020000) e = rawEvent.asV1020000;
    else if (rawEvent.isV1021000) e = rawEvent.asV1021000;
    else {
        ctx.log.warn(`UNKOWN EVENT VERSION: Redeem.cancelRedeem`);
        return;
    }

    const redeem = await ctx.store.get(Redeem, {
        where: { id: toHex(e.redeemId) },
    });
    if (redeem === undefined) {
        ctx.log.warn(
            "WARNING: CancelRedeem event did not match any existing redeem requests! Skipping."
        );
        return;
    }
    const height = await blockToHeight(ctx, block.height, "CancelIssue");
    const cancellation = new RedeemCancellation({
        id: redeem.id,
        redeem,
        height,
        timestamp: new Date(block.timestamp),
        slashedCollateral: e.slashedAmount,
        reimbursed: e.status.__kind === "Reimbursed",
    });
    redeem.status =
        e.status.__kind === "Reimbursed"
            ? RedeemStatus.Reimbursed
            : RedeemStatus.Retried;
    redeem.cancellation = cancellation;
    entityBuffer.pushEntity(RedeemCancellation.name, cancellation);
    entityBuffer.pushEntity(Redeem.name, redeem);
}

export async function redeemPeriodChange(
    ctx: Ctx,
    block: SubstrateBlock,
    item: EventItem,
    entityBuffer: EntityBuffer
): Promise<void> {
    const rawEvent = new RedeemRedeemPeriodChangeEvent(ctx, item.event);
    let e;
    if (!rawEvent.isV16) {
        ctx.log.warn(`UNKOWN EVENT VERSION: redeem.redeemPeriodChange`);
        return;
    }
    e = rawEvent.asV16;

    const height = await blockToHeight(ctx, block.height, "RedeemPeriodChange");

    entityBuffer.pushEntity(
        RedeemPeriod.name,
        new RedeemPeriod({
            id: item.event.id,
            height,
            timestamp: new Date(block.timestamp),
            value: e.period,
        })
    );
}
