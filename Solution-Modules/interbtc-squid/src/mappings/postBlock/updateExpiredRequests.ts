import { LessThanOrEqual } from "typeorm";
import {
    Issue,
    IssuePeriod,
    IssueStatus,
    Redeem,
    RedeemPeriod,
    RedeemStatus,
    RelayedBlock,
} from "../../model";
import { Ctx } from "../../processor";
import { blockToHeight } from "../utils/heights";
import {
    getCurrentIssuePeriod,
    getCurrentRedeemPeriod,
} from "../utils/requestPeriods";
import { isRequestExpired } from "../_utils";

const MIN_DELAY = 5000; // ms
let lastTimestamp = 0;

export async function findAndUpdateExpiredRequests(ctx: Ctx): Promise<void> {
    const now = Date.now();
    if (now < lastTimestamp + MIN_DELAY) {
        return; // only run it at most once ever MIN_DELAY ms
    }
    lastTimestamp = now;
    const block = ctx.blocks[ctx.blocks.length - 1];

    const latestBtcBlock = (
        await ctx.store.get(RelayedBlock, {
            where: { relayedAtHeight: LessThanOrEqual(block.header.height) },
            order: { backingHeight: "DESC" },
        })
    )?.backingHeight;
    if (!latestBtcBlock) return; // no relayed blocks yet, can't determine whether anything is expired

    let latestActiveBlock: number;
    try {
        latestActiveBlock = (await blockToHeight(ctx, block.header.height))
            .active;
    } catch (e) {
        return; // likely first few blocks, before any active blocks were generated yet
    }

    const pendingIssues = await ctx.store.find(Issue, {
        where: { status: IssueStatus.Pending },
        relations: { period: true },
    });
    const pendingRedeems = await ctx.store.find(Redeem, {
        where: { status: RedeemStatus.Pending },
        relations: { period: true },
    });

    const currentIssuePeriod = await getCurrentIssuePeriod(ctx, block.header);
    const currentRedeemPeriod = await getCurrentRedeemPeriod(ctx, block.header);
    if (currentIssuePeriod === undefined) {
        ctx.log.warn(
            `WARNING: Issue period is not set at block ${block.header.height}.`
        );
        return;
    }
    if (currentRedeemPeriod === undefined) {
        ctx.log.warn(
            `WARNING: Redeem period is not set at block ${block.header.height}.`
        );
        return;
    }

    const checkRequestExpiration = async (
        request: Issue | Redeem,
        latestPeriod: IssuePeriod | RedeemPeriod
    ) => {
        const updated = [];
        const period = Math.max(latestPeriod.value, request.period?.value || 0);
        const isExpired = await isRequestExpired(
            ctx.store,
            request,
            latestBtcBlock,
            latestActiveBlock,
            period
        );
        if (isExpired) {
            request.status = "Expired" as IssueStatus | RedeemStatus;
            updated.push(request);
        }
        return updated;
    };

    for (const issueRequest of pendingIssues) {
        const updated = await checkRequestExpiration(
            issueRequest,
            currentIssuePeriod
        );
        await ctx.store.save(updated);
    }
    for (const redeemRequest of pendingRedeems) {
        const updated = await checkRequestExpiration(
            redeemRequest,
            currentRedeemPeriod
        );
        await ctx.store.save(updated);
    }
}
