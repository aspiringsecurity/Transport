import { BigDecimal } from "@subsquid/big-decimal";
import { SubstrateBlock } from "@subsquid/substrate-processor";
import { Big, RoundingMode } from "big.js";
import { LessThanOrEqual } from "typeorm";
import { Currency, DexStableFees, Height, PoolType, Swap, Token } from "../../model";
import { Ctx } from "../../processor";
import { DexGeneralPairStatusesStorage, DexStablePoolsStorage } from "../../types/storage";
import { BasePool, CurrencyId, PairStatus_Trading, Pool, Pool_Base, Pool_Meta } from "../../types/v1021000";
import { invertMap } from "../_utils";
import { currencyId as currencyEncoder, currencyToString } from "../encoding";
import EntityBuffer from "../utils/entityBuffer";
import { SwapDetails, createPooledAmount } from "./cumulativeVolumes";

// Matching value on parachain
// See https://github.com/interlay/interbtc/blob/4cf80ce563825d28d637067a8a63c1d9825be1f4/crates/dex-stable/src/primitives.rs#L11
const DEX_STABLE_FEE_DENOMINATOR: number = 10_000_000_000;

// DexGeneral fees are denominated in basis points
const DEX_GENERAL_FEE_DENOMINATOR: number = 10_000;

// Replicated order from parachain code. 
// See https://github.com/interlay/interbtc/blob/4cf80ce563825d28d637067a8a63c1d9825be1f4/primitives/src/lib.rs#L492-L498
const indexToCurrencyTypeMap: Map<number, string> = new Map([
    [0, "NativeToken"],
    [1, "ForeignAsset"],
    [2, "LendToken"],
    [3, "LpToken"],
    [4, "StableLpToken"]
]);
const currencyTypeToIndexMap = invertMap(indexToCurrencyTypeMap);

// Replicated order from parachain code. 
// See also https://github.com/interlay/interbtc/blob/d48fee47e153291edb92525221545c2f4fa58501/primitives/src/lib.rs#L469-L476
const indexToNativeTokenMap: Map<number, Token> = new Map([
    [0, Token.DOT],
    [1, Token.IBTC],
    [2, Token.INTR],
    [10, Token.KSM],
    [11, Token.KBTC],
    [12, Token.KINT]
]);

const nativeTokenToIndexMap = invertMap(indexToNativeTokenMap);

// poor man's stable pool id to currencies cache
const stablePoolCurrenciesCache = new Map<number, [Currency, CurrencyId][]>();

function setPoolCurrencies(poolId: number, currencies: [Currency, CurrencyId][]) {
    stablePoolCurrenciesCache.set(poolId, currencies);
}

export function clearPoolCurrencies() {
    stablePoolCurrenciesCache.clear();
}

export function isBasePool(pool: Pool): pool is Pool_Base {
    return pool.__kind === "Base";
}

export function isMetaPool(pool: Pool): pool is Pool_Meta {
    return pool.__kind === "Meta";
}

export async function getStablePoolCurrencyByIndex(
    ctx: Ctx,
    block: SubstrateBlock,
    poolId: number,
    index: number
): Promise<[Currency, CurrencyId]> {
    if (stablePoolCurrenciesCache.has(poolId)) {
        const currencies = stablePoolCurrenciesCache.get(poolId)!;
        if (currencies.length > index) {
            return currencies[index];
        }
    }

    // (attempt to) fetch from storage
    const rawPoolStorage = getDexStablePoolsStorage(ctx, block);
    if (rawPoolStorage.isV1021000) {
        const pool = await rawPoolStorage.getAsV1021000(poolId);
        let currencies: [Currency, CurrencyId][] = [];
        // check pool is found and as a BasePool
        if (pool == undefined ) {
            throw Error(`getStablePoolCurrencyByIndex: Unable to find stable pool in storage for given poolId [${poolId}]`);
        } else if (isBasePool(pool)) {
            const basePoolCurrencyIds = pool.value.currencyIds;
            currencies = basePoolCurrencyIds.map(currencyId => [currencyEncoder.encode(currencyId), currencyId]);
        } else if (isMetaPool(pool)) {
            const metaPoolCurrencyIds = pool.value.info.currencyIds;
            currencies = metaPoolCurrencyIds.map(currencyId => [currencyEncoder.encode(currencyId), currencyId]);
        } else {
            // use of any to future-proof for if/when pool types are expanded.
            throw Error(`getStablePoolCurrencyByIndex: Found pool for given poolId [${poolId}], but it is an unexpected pool type [${(pool as any).__kind}]`);
        }

        setPoolCurrencies(poolId, currencies);

        if (currencies.length > index) {
            return currencies[index];
        }
    } else {
        ctx.log.warn("UNKOWN STORAGE VERSION: DexStable.PoolsStorage");
    }

    throw Error(`getStablePoolCurrencyByIndex: Unable to find currency in DexStablePoolsStorage for given poolId [${poolId}] and currency index [${index}]`);
}

function compareCurrencyType(currency0: Currency, currency1: Currency): number {
    if (currency0.isTypeOf === currency1.isTypeOf) {
        return 0;
    }

    const typeIndex0 = currencyTypeToIndexMap.get(currency0.isTypeOf);
    const typeIndex1 = currencyTypeToIndexMap.get(currency1.isTypeOf);

    if (typeIndex0 === undefined) {
        throw Error(`Unable to find index for given currency type [${currency0.isTypeOf}]`);
    }
    if (typeIndex1 === undefined) {
        throw Error(`Unable to find index for given currency type [${currency1.isTypeOf}]`);
    }

    return typeIndex0 - typeIndex1;
}

function currencyToIndex(currency: Currency): number {
    switch(currency.isTypeOf) {
        case "NativeToken":
            const tokenIndex = nativeTokenToIndexMap.get(currency.token);
            if (tokenIndex === undefined) {
                throw Error(`currencyToIndex: Unknown or unhandled native token [${currency.token.toString()}]`);
            }
            return tokenIndex;
        case "ForeignAsset":
            return currency.asset;
        case "LendToken":
            return currency.lendTokenId;
        case "StableLpToken":
            return currency.poolId;
        default:
            throw Error(`currencyToIndex:  Unknown or unsupported currency type [${currency.isTypeOf}]`);
    }
}

/**
 * For sorting currencies.
 * @param currency0 first currency
 * @param currency1 second currency
 * @returns A negative number if currency0 should be listed before currency1, 
 *          a positive number if currency1 should be listed before currency0, 
 *          otherwise returns 0
 */
export function compareCurrencies(currency0: Currency, currency1: Currency): number {
    const typeCompare = compareCurrencyType(currency0, currency1);
    if (typeCompare != 0) {
        return typeCompare;
    }

    const index0 = currencyToIndex(currency0);
    const index1 = currencyToIndex(currency1);
    return index0 - index1;
}

/**
 * Order the given currencies in a consistent manner according to their type and ids / token names.
 * 
 * Replicates the parachain's ordering as defined in these two spots: 
 * https://github.com/interlay/interbtc/blob/4cf80ce563825d28d637067a8a63c1d9825be1f4/primitives/src/lib.rs#L492-L498
 * and
 * https://github.com/interlay/interbtc/blob/d48fee47e153291edb92525221545c2f4fa58501/primitives/src/lib.rs#L469-L476
 * 
 * @param currency0 One currency
 * @param currency1 The other currency
 * @returns A tuple of the two currencies in the same order as the parachain would put them in. 
 */
export function orderCurrencies(currency0: Currency, currency1: Currency): [Currency, Currency] {
    if (compareCurrencies(currency0, currency1) > 0) {
        return [currency1, currency0];
    } else {
        return [currency0, currency1];
    }
}

/**
 * Calculate the standard pool's id given 2 currencies.
 * This method will sort the currencies and return their ids/tickers in a specific order.
 * 
 * @param currency0 One currency
 * @param currency1 The other currency
 */
export function inferGeneralPoolId(currency0: Currency, currency1: Currency): string {
    const [first, second] = orderCurrencies(currency0, currency1);

    const firstCurrencyString: string = currencyToString(first);
    const secondCurrencyString: string = currencyToString(second);
    
    return `(${firstCurrencyString},${secondCurrencyString})`;
}

function getDexGeneralPairStatusesStorage(ctx: Ctx, block: SubstrateBlock): DexGeneralPairStatusesStorage {
    const dexGeneralStorage = new DexGeneralPairStatusesStorage(ctx, block);
    if (!dexGeneralStorage.isExists) {
        throw Error("DexGeneral.PairStatuses storage is not defined for this spec version");
    }
    return dexGeneralStorage;
}

function getDexStablePoolsStorage(ctx: Ctx, block: SubstrateBlock): DexStablePoolsStorage {
    const dexStablePoolStorage = new DexStablePoolsStorage(ctx, block);
    if (!dexStablePoolStorage.isExists) {
        throw Error("DexStable.Pools storage is not defined for this spec version");
    }
    return dexStablePoolStorage;
}

function getAsBasePool(pool: Pool): BasePool {
    if (isBasePool(pool)) {
        return pool.value;
    } else if (isMetaPool(pool)) {
        return pool.value.info;
    } else {
        // use of any to future-proof for if/when pool types are expanded.
        throw Error(`getAsBasePool: Unkown pool type [${(pool as any).__kind}], unable to return BasePool data.`);
    }
}

export async function buildNewSwapEntity(
    ctx: Ctx,
    block: SubstrateBlock,
    eventId: string,
    poolType: PoolType,
    swapDetails: SwapDetails,
    height: Height,
    blockTimestamp: Date,
    poolId?: number
): Promise<Swap> {
    let feeRate = Big(0);

    if (poolType == PoolType.Standard) {
        const currencyCompareValue = compareCurrencies(swapDetails.from.currency, swapDetails.to.currency);
        const currencyPairKey: [CurrencyId, CurrencyId] = currencyCompareValue < 0 
            ? [swapDetails.from.currencyId, swapDetails.to.currencyId] 
            : [swapDetails.to.currencyId, swapDetails.from.currencyId];
    
        const dexGeneralStorage = getDexGeneralPairStatusesStorage(ctx, block);
        
        if (dexGeneralStorage.isV1021000) {
            const rawStorage = await dexGeneralStorage.getAsV1021000(currencyPairKey);
            if (rawStorage.__kind === "Trading") {
                // raw fee rate is in basis points, so divide by 10_000 to get the actual rate
                feeRate = Big((rawStorage as PairStatus_Trading).value.feeRate.toString()).div(DEX_GENERAL_FEE_DENOMINATOR);
            }
        } else {
            ctx.log.warn("UNKOWN STORAGE VERSION: DexGeneral.PairStatuses");
        }
    } else if (poolId === undefined) {
        throw new Error(`buildNewSwapEntity: unable to lookup fee rates; poolType is ${poolType}, but poolId is undefined`);
    } else {
        const dexStableFees = await getOrCreateDexStableFeesEntityFromStore(ctx, block, poolId, blockTimestamp);
        // raw fee rate is is ratio with custom denomination
        feeRate = Big(dexStableFees.fee.toString()).div(DEX_STABLE_FEE_DENOMINATOR);
    }

    // clone from amount, then apply feeRate
    const feeDetails = {...swapDetails.from};
    // round down to get atomic value
    const adjustedAmount = feeRate.mul(feeDetails.atomicAmount.toString()).round(RoundingMode.RoundDown);
    feeDetails.atomicAmount = BigInt(adjustedAmount.toString());

    const [fromAmount, toAmount, feesAmount] = await Promise.all([
        createPooledAmount(swapDetails.from),
        createPooledAmount(swapDetails.to),
        createPooledAmount(feeDetails),
    ]);

    const ccyPair = inferGeneralPoolId(swapDetails.from.currency, swapDetails.to.currency);

    const entity = new Swap({
        id: `swap_${ccyPair}_${eventId}`,
        height,
        timestamp: blockTimestamp,
        fromAccount: swapDetails.from.accountId,
        toAccount: swapDetails.to.accountId,
        from: fromAmount,
        to: toAmount,
        fees: feesAmount,
        feeRate: BigDecimal(feeRate.toString())
    });

    return entity;
}

export function deriveDexStableFeesEntityId(poolId: number, timestamp: Date): string {
    return `poolId_${poolId}_${timestamp.getTime().toString()}`;
}

export function createNewDexStableFeesEntity(
    poolId: number,
    timestamp: Date,
    fee: bigint,
    adminFee: bigint | null | undefined,
): DexStableFees {
    const entity = new DexStableFees({
        id: deriveDexStableFeesEntityId(poolId, timestamp),
        poolId: BigInt(poolId),
        timestamp,
        fee,
        adminFee
    });
    return entity;
}

async function getOrCreateDexStableFeesEntityFromStore(
    ctx: Ctx,
    block: SubstrateBlock,
    poolId: number,
    timestamp: Date
): Promise<DexStableFees> {
    const maybeEntity = await ctx.store.get(DexStableFees, {
        where: { 
            poolId: BigInt(poolId),
            timestamp: LessThanOrEqual(timestamp)
        },
        order: { timestamp: "DESC" }
    });

    if (maybeEntity !== undefined) {
        return maybeEntity;
    }
    
    // not found, fetch from chain, create and store entity immediately
    const dexStablePoolsStorage = getDexStablePoolsStorage(ctx, block);
    let fee = 0n;
    let adminFee = 0n;

    if (dexStablePoolsStorage.isV1021000) {
        const pool = await dexStablePoolsStorage.getAsV1021000(poolId);
        if (pool == undefined ) {
            throw Error(`buildNewSwapEntity: Unable to find stable pool in storage for given poolId [${poolId}]`);
        }

        const basePool = getAsBasePool(pool);
        fee = basePool.fee;
        adminFee = basePool.adminFee;
    } else {
        ctx.log.warn("UNKOWN STORAGE VERSION: DexStable.PoolsStorage");
    }

    const entity = createNewDexStableFeesEntity(poolId, timestamp, fee, adminFee);
    await ctx.store.save(entity);
    return entity;
}

/**
 * Tries to find the latest DexStableFees entity, first in the entity buffer if it can find an exact match
 * by id. If not, it searches in the context store for the latest available entity for the given pool id
 * with a timestamp at of before the provided timestamp. If still not found, it will fetch the fees from
 * the parachain's storage and store it to the database before returning the new entity.
 * 
 * @param ctx The context with store
 * @param block The block
 * @param timestamp The timestamp to use for looking up potentially existing entities
 * @param poolId The pool id
 * @param entityBuffer The entitiy buffer to search in
 * @returns A pre-existing entity, or a newly created (and stored) one.
 */
export async function getLatestDexStableFeesEntity(
    ctx: Ctx,
    block: SubstrateBlock,
    timestamp: Date,
    poolId: number,
    entityBuffer: EntityBuffer
): Promise<DexStableFees> {
    // The id contains pool id and timestamp
    const id = deriveDexStableFeesEntityId(poolId, timestamp);

    const latestEntity =
        // the entity buffer only returns an exact poolId and timestamp match or undefined
        (entityBuffer.getBufferedEntityBy(
            DexStableFees.name,
            id
        ) as DexStableFees) || 
        // looks in data store for latest entry prior to or at timestamp,
        // if not found, creates new entity using parachain data and stores before returning
        (await getOrCreateDexStableFeesEntityFromStore(ctx, block, poolId, timestamp));

    return latestEntity;
}