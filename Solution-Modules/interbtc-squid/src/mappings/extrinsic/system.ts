import { SubstrateBlock } from "@subsquid/substrate-processor";
import { CallItem, Ctx } from "../../processor";
import { SystemSetStorageCall } from "../../types/calls";
import {
    REDEEM_REDEEMPERIOD_KEY,
    updateRedeemPeriodFromBufferValue,
} from "../utils/requestPeriods";

export async function setStorage(
    ctx: Ctx,
    block: SubstrateBlock,
    item: CallItem
): Promise<void> {
    const call: SystemSetStorageCall = new SystemSetStorageCall(ctx, item.call);
    const callDecoded = call.asV1;

    // items contains an array of buffer pairs, despite TS's interpretation
    for (const [key, value] of callDecoded.items as [Buffer, Buffer][]) {
        const keyHexString = key.toString("hex");
        if (keyHexString === REDEEM_REDEEMPERIOD_KEY) {
            updateRedeemPeriodFromBufferValue(ctx, block, value);
        }
    }
}
