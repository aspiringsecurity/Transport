import { xxhashAsHex } from "@polkadot/util-crypto";
import { SubstrateBlock } from "@subsquid/substrate-processor";
import { LessThanOrEqual } from "typeorm";
import { Height, IssuePeriod, RedeemPeriod } from "../../model";
import { Ctx } from "../../processor";
import {
    IssueIssuePeriodStorage,
    RedeemRedeemPeriodStorage,
} from "../../types/storage";
import { blockToHeight } from "./heights";

export const REDEEM_REDEEMPERIOD_KEY =
    xxhashAsHex("Redeem", 128).substring(2) +
    xxhashAsHex("RedeemPeriod", 128).substring(2);

export async function getCurrentIssuePeriod(
    ctx: Ctx,
    block: SubstrateBlock
): Promise<IssuePeriod> {
    const height = await blockToHeight(ctx, block.height);
    const latest = await ctx.store.get(IssuePeriod, {
        where: {
            height: { absolute: LessThanOrEqual(block.height) },
        },
        order: { timestamp: "DESC" },
    });
    if (latest !== undefined) return latest;

    // else fetch from storage
    return await setInitialIssuePeriod(ctx, block, height);
}

export async function getCurrentRedeemPeriod(ctx: Ctx, block: SubstrateBlock) {
    const height = await blockToHeight(ctx, block.height);
    const latest = await getLatestStoredRedeemPeriod(ctx, block.height);
    if (latest !== undefined) return latest;

    // else fetch from storage
    return await setInitialRedeemPeriod(ctx, block, height);
}

async function getLatestStoredRedeemPeriod(
    ctx: Ctx,
    height: number
): Promise<RedeemPeriod | undefined> {
    return ctx.store.get(RedeemPeriod, {
        where: {
            height: { absolute: LessThanOrEqual(height) },
        },
        order: { timestamp: "DESC" },
    });
}

async function setInitialIssuePeriod(
    ctx: Ctx,
    block: SubstrateBlock,
    height: Height
) {
    const rawIssuePeriodStorage = new IssueIssuePeriodStorage(ctx, block);
    let value;
    if (rawIssuePeriodStorage.isV1)
        value = await rawIssuePeriodStorage.getAsV1();
    else throw Error("Unknown storage version");
    if (!rawIssuePeriodStorage.isExists)
        throw new Error("Issue period does not exist");

    const issuePeriod = new IssuePeriod({
        id: `initial-${block.timestamp.toString()}`,
        height,
        timestamp: new Date(block.timestamp),
        value,
    });

    await ctx.store.save(issuePeriod);
    return issuePeriod;
}

export async function updateRedeemPeriodFromBufferValue(
    ctx: Ctx,
    block: SubstrateBlock,
    bufferValue: Buffer
): Promise<void> {
    const newPeriodValue = bufferValue.readUIntLE(0, bufferValue.length);

    if (newPeriodValue == undefined) {
        ctx.log.warn(
            `REDEEM PERIOD: Failed to convert setStorage value to number. Buffer contains: ${bufferValue?.toString()}`
        );
        return;
    }

    // find latest stored period
    const lastPeriod = await getLatestStoredRedeemPeriod(ctx, block.height);

    // add new entry if value has changed
    if (lastPeriod === undefined || newPeriodValue != lastPeriod.value) {
        const height = await blockToHeight(ctx, block.height);
        const redeemPeriod = new RedeemPeriod({
            id: `update-${block.timestamp.toString()}`,
            height,
            timestamp: new Date(block.timestamp),
            value: newPeriodValue,
        });

        ctx.store.insert(redeemPeriod);
    }
}

async function setInitialRedeemPeriod(
    ctx: Ctx,
    block: SubstrateBlock,
    height: Height
) {
    const rawRedeemPeriodStorage = new RedeemRedeemPeriodStorage(ctx, block);
    let value;
    if (rawRedeemPeriodStorage.isV1)
        value = await rawRedeemPeriodStorage.getAsV1();
    else throw Error("Unknown storage version");
    if (!rawRedeemPeriodStorage.isExists)
        throw new Error("Redeem period does not exist");

    const redeemPeriod = new RedeemPeriod({
        id: `initial-${block.timestamp.toString()}`,
        height,
        timestamp: new Date(block.timestamp),
        value,
    });

    ctx.store.save(redeemPeriod);
    return redeemPeriod;
}
