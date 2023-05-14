import { tokenSymbolToCurrency } from "@interlay/interbtc-api";
import { BigDecimal } from "@subsquid/big-decimal";
import { SubstrateBlock } from "@subsquid/substrate-processor";
import { Currency, NativeToken, OracleUpdate, OracleUpdateType, Token } from "../../model";
import { Ctx, EventItem } from "../../processor";
import { OracleFeedValuesEvent } from "../../types/events";
import { CurrencyId as CurrencyId_V15 } from "../../types/v15";
import { CurrencyId as CurrencyId_V17 } from "../../types/v17";
import { address, currencyId, legacyCurrencyId } from "../encoding";
import EntityBuffer from "../utils/entityBuffer";
import { blockToHeight } from "../utils/heights";
import { convertAmountToHuman } from "../_utils";

export async function feedValues(
    ctx: Ctx,
    block: SubstrateBlock,
    item: EventItem,
    entityBuffer: EntityBuffer
): Promise<void> {
    const rawEvent = new OracleFeedValuesEvent(ctx, item.event);
    let e;
    let useLegacyCurrency = false;
    if (rawEvent.isV6 || rawEvent.isV15) {
        useLegacyCurrency = true;
    }
    if (rawEvent.isV6) e = rawEvent.asV6;
    else if (rawEvent.isV15) e = rawEvent.asV15;
    else if (rawEvent.isV17) e = rawEvent.asV17;
    else if (rawEvent.isV1020000) e = rawEvent.asV1020000;
    else if (rawEvent.isV1021000) e = rawEvent.asV1021000;
    else {
        ctx.log.warn(`UNKOWN EVENT VERSION: Oracle.feedValues`);
        return;
    }
    for (const [key, value] of e.values) {
        const height = await blockToHeight(ctx, block.height, "FeedValues");
        const oracleAddress = address.interlay.encode(e.oracleId);
        const update = new OracleUpdate({
            height,
            timestamp: new Date(block.timestamp),
            oracleId: oracleAddress,
            type: OracleUpdateType[key.__kind],
            updateValue: value,
        });
        let keyToString = key.__kind.toString();
        let updateValueHuman : BigDecimal = BigDecimal("0");
        if (key.__kind === "ExchangeRate") {
            const exchangeCurrency = useLegacyCurrency
                ? legacyCurrencyId.encode(key.value as CurrencyId_V15)
                : currencyId.encode(key.value as CurrencyId_V17);
            update.typeKey = exchangeCurrency;
            keyToString += JSON.stringify(exchangeCurrency);
            updateValueHuman = await convertAmountToHuman(update.typeKey, value);
        }
        else { // FeeEstimation
            if (process.env.SS58_CODEC === "kintsugi") {
                updateValueHuman = await convertAmountToHuman( new NativeToken({ token: Token.KINT }), value);
            }
            else if (process.env.SS58_CODEC === "interlay") {
                updateValueHuman = await convertAmountToHuman( new NativeToken({ token: Token.INTR }), value);
            }
            else {
                ctx.log.error("Undefined SS58_CODEC");
            }
        }
        update.updateValueHuman = updateValueHuman;
        update.id = `${oracleAddress}-${item.event.id}-${keyToString}`;
        entityBuffer.pushEntity(OracleUpdate.name, update);
    }
}
