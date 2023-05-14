import { CurrencyExt, CurrencyIdentifier, currencyIdToMonetaryCurrency, newMonetaryAmount, StandardPooledTokenIdentifier } from "@interlay/interbtc-api";
import { Bitcoin, InterBtc, Interlay, KBtc, Kintsugi, Kusama, Polkadot } from "@interlay/monetary-js";
import { ApiPromise, WsProvider } from '@polkadot/api';
import { BigDecimal } from "@subsquid/big-decimal";
import { Store } from "@subsquid/typeorm-store";
import { Big } from "big.js";
import * as process from "process";
import { LessThanOrEqual, Like } from "typeorm";
import { Currency, Height, Issue, OracleUpdate, Redeem, Vault } from "../model";
import { Ctx, getInterBtcApi } from "../processor";
import { VaultId as VaultIdV1021000 } from "../types/v1021000";
import { VaultId as VaultIdV15 } from "../types/v15";
import { VaultId as VaultIdV6 } from "../types/v6";
import { encodeLegacyVaultId, encodeVaultId } from "./encoding";

export type eventArgs = {
    event: { args: true };
};
export type eventArgsData = {
    data: eventArgs;
};

const parachainBlocksPerBitcoinBlock = 100; // TODO: HARDCODED - find better way to set?

export async function getVaultIdLegacy(
    store: Store,
    vaultId: VaultIdV15 | VaultIdV6
) {
    return store.get(Vault, {
        where: { id: encodeLegacyVaultId(vaultId) },
    });
}

export async function getVaultId(store: Store, vaultId: VaultIdV1021000) {
    return store.get(Vault, {
        where: { id: encodeVaultId(vaultId) },
    });
}

export async function isRequestExpired(
    store: Store,
    request: Issue | Redeem,
    latestBtcBlock: number,
    latestActiveBlock: number,
    period: number
): Promise<boolean> {
    const requestHeight = await store.get(Height, {
        where: { id: request.request.height },
    });
    if (requestHeight === undefined) return false; // no active blocks yet

    const btcPeriod = Math.ceil(period / parachainBlocksPerBitcoinBlock);

    return (
        request.request.backingHeight + btcPeriod < latestBtcBlock &&
        requestHeight.active + period < latestActiveBlock
    );
}

export function getFirstAndLastFour(str: string) {
    // If the string is less than 8 characters, return it as-is
    if (str.length < 8) {
        return str;
    }

    // Otherwise, return the first four characters plus "..." plus the last four characters
    return str.substring(0, 4) + "..." + str.substring(str.length - 4);
}

type AssetMetadata = {
    decimals: number;
    name: string;
    symbol: string;
}

// This function uses the storage API to obtain the details directly from the
// WSS RPC provider for the correct chain
const cache: { [id: number]: AssetMetadata } = {};
let usdtAssetId: number;

export async function cacheForeignAsset(): Promise<void> {
    try {
        const wsProvider = new WsProvider(process.env.CHAIN_ENDPOINT);
        const api = await ApiPromise.create({ provider: wsProvider, noInitWarn: true });
        const assets = await api.query.assetRegistry.metadata.entries();
        assets.forEach(([key, details]) => {
            const id:number = Number(key.args[0]);
            const assetDetails = details.toHuman() as AssetMetadata;
            cache[id] = assetDetails;
            if(assetDetails.symbol==='USDT') usdtAssetId = id;
          });        
    } catch (error) {
        console.error(`Error getting foreign asset metadata: ${error}`);
        throw error;
    }
}


export async function getForeignAsset(id: number): Promise<AssetMetadata> {
    if (id in cache) {
        return cache[id];
    }
    try {
        const wsProvider = new WsProvider(process.env.CHAIN_ENDPOINT);
        const api = await ApiPromise.create({ provider: wsProvider, noInitWarn: true });
        const assets = await api.query.assetRegistry.metadata(id);
        const assetsJSON = assets.toHuman();
        const metadata = assetsJSON as AssetMetadata;
        console.debug(`Foreign Asset (${id}): ${JSON.stringify(metadata)}`);
        cache[id] = metadata;
        return metadata;
    } catch (error) {
        console.error(`Error getting foreign asset metadata: ${error}`);
        throw error;
    }
}

/* This function takes a currency object (could be native, could be foreign) and
an amount (in the smallest unit, e.g. Planck) and returns a human friendly string
with a reasonable accuracy (6 digits after the decimal point for BTC and 2 for
all others)
*/
export async function friendlyAmount(currency: Currency, amount: number): Promise<string> {
    let amountFriendly: number;
    switch(currency.isTypeOf) {
        case 'NativeToken':
            switch (currency.token) {
                case 'KINT':
                case 'KSM':
                    amountFriendly = amount / 10 ** 12;
                    return `${amountFriendly.toFixed(2)} ${currency.token}`;
                case 'INTR':
                case 'DOT':
                    amountFriendly = amount / 10 ** 10;
                    return `${amountFriendly.toFixed(2)} ${currency.token}`;
                case 'KBTC':
                case 'IBTC':
                    amountFriendly = amount / 10 ** 8;
                    return `${amountFriendly.toFixed(6)} ${currency.token}`;
                default:
                    return `Unknown token: ${currency}`
            }
        case 'ForeignAsset':
            const details = await getForeignAsset(currency.asset)
            amountFriendly = amount / 10 ** (details.decimals);
            return `${amountFriendly.toFixed(2)} ${details.symbol}`;
        default:
            return `Unknown asset: ${currency}`
    }
}

export function divideByTenToTheNth(amount: bigint, n: number): number {
    const divisor = Big(10**n);
    const amountBig = Big(amount.toString())
    const division = amountBig.div(divisor);
    const result = division.toNumber();
    return result;
}

export async function symbolFromCurrency(currency: Currency): Promise<string> {
    let amountFriendly: number;
    switch(currency.isTypeOf) {
        case 'NativeToken':
            return currency.token;
        case 'ForeignAsset':
            const details = await getForeignAsset(currency.asset)
            return details.symbol;
        default:
            return `UNKNOWN`;
    }
}

export async function decimalsFromCurrency(currency: Currency): Promise<number> {
    switch(currency.isTypeOf) {
        case 'NativeToken':
            switch (currency.token) {
                case 'KINT':
                case 'KSM':
                    return 12
                case 'INTR':
                case 'DOT':
                    return 10
                case 'KBTC':
                case 'IBTC':
                    return 8
                default:
                    return 0
            }
        case 'ForeignAsset':
            const details = await getForeignAsset(currency.asset)
            return details.decimals;
        default:
            return 0;
    }
}

type CurrencyType = Bitcoin | Kintsugi | Kusama | Interlay | Polkadot;

function mapCurrencyType(currency: Currency): CurrencyType {
    switch(currency.isTypeOf) {
        case 'NativeToken':
            switch(currency.token) {
                case 'KINT':
                    return Kintsugi;
                case 'KSM':
                    return Kusama;
                case 'INTR':
                    return Interlay;
                case 'DOT':
                    return Polkadot;
                case 'KBTC':
                    return KBtc;
                case 'INTR':
                    return InterBtc;
            }
        case 'ForeignAsset':
            return Bitcoin;
        default:
            throw new Error(`Unsupported currency type: ${currency.isTypeOf}`);
    }
}

type OracleRate = {
    btc: Big;
    usdt: Big;
}

/* This function is used to calculate the exchange rate for a given currency at
a given time.
*/
export async function getExchangeRate(
    ctx: Ctx,
    timestamp: number,
    currency: Currency,
    amount: number
): Promise<OracleRate>  {
    const mappedCurrency = mapCurrencyType(currency);
    let baseMonetaryAmount
    let searchBlock = currency.toJSON();

    if (mappedCurrency === KBtc || mappedCurrency === InterBtc) {
        baseMonetaryAmount = newMonetaryAmount(Big(1e8), Bitcoin)
    }
    else {
        let lastUpdate = await ctx.store.get(OracleUpdate, {
            where: { 
                id: Like(`%${JSON.stringify(searchBlock)}`),
                timestamp: LessThanOrEqual(new Date(timestamp)),
            },
            order: { timestamp: "DESC" },
        });
        if (lastUpdate === undefined) {
            ctx.log.warn(
                `WARNING: no price registered by Oracle for ${JSON.stringify(searchBlock)} at timestamp ${new Date(timestamp)}. Fetching first value.`
            );
            lastUpdate = await ctx.store.get(OracleUpdate, {
                where: { 
                    id: Like(`%${JSON.stringify(searchBlock)}`),
                },
                order: { timestamp: "ASC" },
            });
        }
        const lastPrice = new Big((Number(lastUpdate?.updateValue) || 0) / 1e10);
        // Why 1e10? All prices are in BTC (8 digits) and there 18 digits worth of units for all values (18-8=10)
        baseMonetaryAmount = newMonetaryAmount(lastPrice, mappedCurrency);
    }

    if(!usdtAssetId) throw new Error("Unable to determine USDT Asset ID");
    searchBlock = {
        isTypeOf: 'ForeignAsset',
        asset: usdtAssetId // determined at the start of the processor by reading all foreign assets into cache
    }
    let btcUpdate = await ctx.store.get(OracleUpdate, {
        where: { 
            id: Like(`%${JSON.stringify(searchBlock)}`),
            timestamp: LessThanOrEqual(new Date(timestamp)),
        },
        order: { timestamp: "DESC" },
    });
    if (btcUpdate === undefined) {
        ctx.log.warn(
            `WARNING: no price registered by Oracle for ${JSON.stringify(searchBlock)} at time ${new Date(timestamp)}`
        );
        btcUpdate = await ctx.store.get(OracleUpdate, {
            where: { 
                id: Like(`%${JSON.stringify(searchBlock)}`),
            },
            order: { timestamp: "ASC" },
        });
    }
    const btcPrice = new Big((Number(btcUpdate?.updateValue) || 0) / 1e8);
    // there are 8 digits in BTC
    const btcMonetaryAmount = newMonetaryAmount(btcPrice, Bitcoin);

    const exchangeRate = btcMonetaryAmount.toBig().div(baseMonetaryAmount.toBig());
    const monetaryAmount = newMonetaryAmount(Big(amount), mappedCurrency);

    return {
        btc: monetaryAmount.toBig().div(baseMonetaryAmount.toBig()), 
        usdt: monetaryAmount.toBig().mul(exchangeRate)
    };
}

let currencyMap = new Map<CurrencyIdentifier, CurrencyExt>();

export async function currencyToLibCurrencyExt(currency: Currency): Promise<CurrencyExt> {
    const interBtcApi = await getInterBtcApi();

    let id: CurrencyIdentifier;
    if (currency.isTypeOf === "NativeToken") {
        id = {token: currency.token};
    } else if (currency.isTypeOf === "ForeignAsset") {
        id = {foreignAsset: currency.asset };
    } else if (currency.isTypeOf === "LendToken") {
        id = {lendToken: currency.lendTokenId};
    } else if (currency.isTypeOf === "StableLpToken") {
        id = {stableLpToken: currency.poolId};
    } else if (currency.isTypeOf === "LpToken") {
        const token0 = (await currencyToLibCurrencyExt(currency.token0)) as unknown as StandardPooledTokenIdentifier;
        const token1 = (await currencyToLibCurrencyExt(currency.token1)) as unknown as StandardPooledTokenIdentifier;
        id =  {lpToken: [token0, token1]};
    } else {
        // using any for future proofing, TS thinks this is never which is correct until it isn't anymore
        // and we've extended the types
        throw new Error(`No handling implemented for given currency type [${(currency as any).isTypeOf}]`);
    }
    let currencyInfo: CurrencyExt;
    if ( currencyMap.has(id) ) {
        currencyInfo = currencyMap.get(id) as CurrencyExt;
    } else {
        const currencyId = interBtcApi.api.createType("InterbtcPrimitivesCurrencyId", id );
        currencyInfo  = await currencyIdToMonetaryCurrency(interBtcApi.api, currencyId);

        currencyMap.set(id , currencyInfo);
    }
    return currencyMap.get(id) as CurrencyExt;
}

/* This function takes a currency object (could be native, could be foreign) and
an atomic amount (in the smallest unit, e.g. Planck) and returns a BigDecimal representing 
the amount without rounding.
*/
export async function convertAmountToHuman(currency: Currency, amount: bigint ) : Promise<BigDecimal> {
    const currencyInfo: CurrencyExt = await currencyToLibCurrencyExt(currency);
    const monetaryAmount = newMonetaryAmount(amount.toString(), currencyInfo);
    return BigDecimal(monetaryAmount.toString());
}

// helper method to switch around key/value pairs for a given map
export function invertMap<K extends Object, V extends Object>(map: Map<K, V>): Map<V, K> {
    return new Map(Array.from(map, ([key, value]) => [value, key]));
}