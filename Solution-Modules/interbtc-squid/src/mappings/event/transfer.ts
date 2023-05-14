import { SubstrateBlock } from "@subsquid/substrate-processor";
import { Currency, Transfer } from "../../model";
import { Ctx, EventItem } from "../../processor";
import { TokensTransferEvent } from "../../types/events";
import { CurrencyId_Token as CurrencyId_Token_V6 } from "../../types/v6";
import { CurrencyId_Token as CurrencyId_Token_V10 } from "../../types/v10";
import { CurrencyId_Token as CurrencyId_Token_V15 } from "../../types/v15";
import { CurrencyId as CurrencyId_V17 } from "../../types/v17";
import { CurrencyId as CurrencyId_V1020000 } from "../../types/v1020000";
import { CurrencyId as CurrencyId_V1021000 } from "../../types/v1021000";
import { address, currencyId, legacyCurrencyId } from "../encoding";
import EntityBuffer from "../utils/entityBuffer";
import { blockToHeight } from "../utils/heights";
import { convertAmountToHuman } from "../_utils";

export async function tokensTransfer(
    ctx: Ctx,
    block: SubstrateBlock,
    item: EventItem,
    entityBuffer: EntityBuffer
): Promise<void> {
    const rawEvent = new TokensTransferEvent(ctx, item.event);
    let amount: bigint;
    let to: Uint8Array;
    let from: Uint8Array;
    let eventCcyId:
        | CurrencyId_Token_V6
        | CurrencyId_Token_V10
        | CurrencyId_Token_V15
        | CurrencyId_V17
        | CurrencyId_V1020000
        | CurrencyId_V1021000
    let currency: Currency;
    if (rawEvent.isV6 || rawEvent.isV10 || rawEvent.isV15) {
        if (rawEvent.isV6) {
            [eventCcyId, from, to, amount] = rawEvent.asV6;
        } else if (rawEvent.isV10) {
            ({ currencyId: eventCcyId, from, to, amount } = rawEvent.asV10);
        } else {
            ({ currencyId: eventCcyId, from, to, amount } = rawEvent.asV15);
        }
        currency = legacyCurrencyId.encode(eventCcyId);
    } else {
        if (rawEvent.isV17)
            ({ currencyId: eventCcyId, from, to, amount } = rawEvent.asV17);
        else if (rawEvent.isV1020000)
            ({
                currencyId: eventCcyId,
                from,
                to,
                amount,
            } = rawEvent.asV1020000);
        else if (rawEvent.isV1021000)
            ({
                currencyId: eventCcyId,
                from,
                to,
                amount,
            } = rawEvent.asV1021000);
        else {
            ctx.log.warn(`UNKOWN EVENT VERSION: tokens.transfer`);
            return;
        }

        currency = currencyId.encode(eventCcyId);
    }

    const height = await blockToHeight(ctx, block.height, "TokensTransfer");
    const amountHuman = await convertAmountToHuman(currency, amount);

    entityBuffer.pushEntity(
        Transfer.name,
        new Transfer({
            id: item.event.id,
            height,
            timestamp: new Date(block.timestamp),
            from: address.interlay.encode(from),
            to: address.interlay.encode(to),
            token: currency,
            amount,
            amountHuman,
        })
    );
}
