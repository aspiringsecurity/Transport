import { Store } from "@subsquid/typeorm-store";
import { isEqual, cloneDeep } from "lodash";
import { Equal, LessThan, LessThanOrEqual } from "typeorm";
import {
    CumulativeDexTradeCount,
    CumulativeDexTradeCountPerAccount,
    CumulativeDexTradingVolume,
    CumulativeDexTradingVolumePerAccount,
    CumulativeDexTradingVolumePerPool,
    CumulativeVolume,
    CumulativeVolumePerCurrencyPair,
    Currency,
    PooledAmount,
    PooledToken,
    PoolType,
    VolumeType
} from "../../model";
import { convertAmountToHuman } from "../_utils";
import EntityBuffer from "./entityBuffer";
import { inferGeneralPoolId } from "./pools";
import { CurrencyId } from "../../types/v1021000";

function getLatestCurrencyPairCumulativeVolume(
    cumulativeVolumes: CumulativeVolumePerCurrencyPair[],
    atOrBeforeTimestamp: Date,
    collateralCurrency: Currency,
    wrappedCurrency: Currency
): CumulativeVolumePerCurrencyPair | undefined {
    if (cumulativeVolumes.length < 1) {
        return undefined;
    }

    return cumulativeVolumes
        .filter(
            (entity) =>
                entity.tillTimestamp.getTime() <= atOrBeforeTimestamp.getTime()
        )
        .filter(
            (entity) =>
                entity.collateralCurrency?.toJSON().toString() ===
                collateralCurrency.toJSON().toString()
        )
        .filter(
            (entity) =>
                entity.wrappedCurrency?.toJSON().toString() ===
                wrappedCurrency.toJSON().toString()
        )
        .reduce((prev, current) => {
            // if timestamps are equal, the larger amount is latest for accumulative amounts
            if (
                prev.tillTimestamp.getTime() === current.tillTimestamp.getTime()
            ) {
                return prev.amount > current.amount ? prev : current;
            }
            return prev.tillTimestamp.getTime() >
                current.tillTimestamp.getTime()
                ? prev
                : current;
        });
}

function getLatestCumulativeVolume(
    cumulativeVolumes: CumulativeVolume[],
    atOrBeforeTimestamp: Date
): CumulativeVolume | undefined {
    if (cumulativeVolumes.length < 1) {
        return undefined;
    }

    // find the latest entry that has a tillTimestamp of less than or equal to timestamp
    return cumulativeVolumes
        .filter(
            (entity) =>
                entity.tillTimestamp.getTime() <= atOrBeforeTimestamp.getTime()
        )
        .reduce((prev, current) => {
            // if timestamps are equal, the larger amount is latest for accumulative amounts
            if (
                prev.tillTimestamp.getTime() === current.tillTimestamp.getTime()
            ) {
                return prev.amount > current.amount ? prev : current;
            }
            return prev.tillTimestamp.getTime() >
                current.tillTimestamp.getTime()
                ? prev
                : current;
        });
}

export async function updateCumulativeVolumes(
    store: Store,
    type: VolumeType,
    amount: bigint,
    timestamp: Date,
    entityBuffer: EntityBuffer
): Promise<CumulativeVolume> {
    const id = `${type.toString()}-${timestamp.getTime().toString()}`;

    // find by id if it exists in either entity buffer or db
    const existingValueInBlock =
        (entityBuffer.getBufferedEntityBy(
            CumulativeVolume.name,
            id
        ) as CumulativeVolume) || (await store.get(CumulativeVolume, id));

    if (existingValueInBlock !== undefined) {
        // new event in same block, update total
        existingValueInBlock.amount += amount;
        return existingValueInBlock;
    } else {
        // new event in new block, insert new entity

        // get last entity in buffer, otherwise from DB
        const cumulativeVolumeEntitiesInBuffer = (
            entityBuffer.getBufferedEntities(
                CumulativeVolume.name
            ) as CumulativeVolume[]
        ).filter((entity) => entity.type === type);

        // find CumulativeVolume entities of specific type in buffer first
        const maybeLatestEntityInBuffer = getLatestCumulativeVolume(
            cumulativeVolumeEntitiesInBuffer,
            timestamp
        );
        const existingCumulativeVolume =
            maybeLatestEntityInBuffer ||
            (await store.get(CumulativeVolume, {
                where: {
                    tillTimestamp: LessThanOrEqual(timestamp),
                    type: type,
                },
                order: { tillTimestamp: "DESC" },
            }));
        let newCumulativeVolume = new CumulativeVolume({
            id,
            type,
            tillTimestamp: timestamp,
            amount: (existingCumulativeVolume?.amount || 0n) + amount,
        });
        return newCumulativeVolume;
    }
}

export async function updateCumulativeVolumesForCurrencyPair(
    store: Store,
    type: VolumeType,
    amount: bigint,
    timestamp: Date,
    collateralCurrency: Currency,
    wrappedCurrency: Currency,
    entityBuffer: EntityBuffer
): Promise<CumulativeVolumePerCurrencyPair> {
    const currencyPairId = `${type.toString()}-${timestamp
        .getTime()
        .toString()}-${collateralCurrency?.toString()}-${wrappedCurrency?.toString()}`;

    // find by id if it exists in either entity buffer or database
    const existingValueInBlock =
        (entityBuffer.getBufferedEntityBy(
            CumulativeVolumePerCurrencyPair.name,
            currencyPairId
        ) as CumulativeVolumePerCurrencyPair) ||
        (await store.get(CumulativeVolumePerCurrencyPair, currencyPairId));

    if (existingValueInBlock !== undefined) {
        // new event in same block, update total
        existingValueInBlock.amount += amount;
        return existingValueInBlock;
    } else {
        // new event in new block, insert new entity

        // find CumulativeVolumePerCurrencyPair entities of specific type in buffer first
        const cumulativeEntitiesInBuffer = (
            entityBuffer.getBufferedEntities(
                CumulativeVolumePerCurrencyPair.name
            ) as CumulativeVolumePerCurrencyPair[]
        ).filter((entity) => entity.type === type);

        // get last cumulative amount in buffer, otherwise from DB
        const maybeLatestAmountInBuffer = getLatestCurrencyPairCumulativeVolume(
            cumulativeEntitiesInBuffer,
            timestamp,
            collateralCurrency,
            wrappedCurrency
        )?.amount;
        const existingCumulativeVolumeForCollateral =
            maybeLatestAmountInBuffer ||
            (
                await store.get(CumulativeVolumePerCurrencyPair, {
                    where: {
                        tillTimestamp: LessThanOrEqual(timestamp),
                        type: type,
                        collateralCurrency: Equal(collateralCurrency),
                        wrappedCurrency: Equal(wrappedCurrency),
                    },
                    order: { tillTimestamp: "DESC" },
                })
            )?.amount ||
            0n;
        let cumulativeVolumeForCollateral = new CumulativeVolumePerCurrencyPair(
            {
                id: currencyPairId,
                type,
                tillTimestamp: timestamp,
                amount: existingCumulativeVolumeForCollateral + amount,
                amountHuman: await convertAmountToHuman(collateralCurrency, existingCumulativeVolumeForCollateral + amount),
                collateralCurrency,
                wrappedCurrency,
            }
        );
        return cumulativeVolumeForCollateral;
    }
}

export type SwapDetailsAmount = {
    currency: PooledToken,
    atomicAmount: bigint,
    accountId: string,
    currencyId: CurrencyId
};

export type SwapDetails = {
    from: SwapDetailsAmount,
    to: SwapDetailsAmount
}

export async function createPooledAmount(swapAmount: SwapDetailsAmount): Promise<PooledAmount> {
    const amountHuman = await convertAmountToHuman(swapAmount.currency, swapAmount.atomicAmount);
    return new PooledAmount({
        token: swapAmount.currency,
        amount: swapAmount.atomicAmount,
        amountHuman
    });
}

/**
 * Modifies the passed in entity to add or update pooled token volumes.
 * @param entity The entity to add pooled amounts to, or update existing ones
 * @param amounts The swap detail amounts to add to the entity's values
 * @return Returns the modified entity
 */
async function increaseSwapDetailsAmountsForEntity<T extends CumulativeDexTradingVolume | CumulativeDexTradingVolumePerAccount>(
    entity: T,
    amounts: SwapDetailsAmount[]
): Promise<T> {
    for (const amountToAdd of amounts) {
        let updatedExistingAmount = false;
        for (const pooledAmount of entity.amounts) {
            if (isEqual(pooledAmount.token, amountToAdd.currency)) {
                const newAmount = pooledAmount.amount + amountToAdd.atomicAmount;
                pooledAmount.amount = newAmount;
                pooledAmount.amountHuman = await convertAmountToHuman(pooledAmount.token, newAmount);
                updatedExistingAmount = true;
                break;
            }
        }

        // did not find amount in the entity's list of pooled amounts
        // add new pooled amount
        if (!updatedExistingAmount) {
            const pooledAmount = await createPooledAmount(amountToAdd);
            entity.amounts.push(pooledAmount);
        }
    }

    return entity;
}

function findLatestTimestampedEntityBefore<
    T extends CumulativeDexTradingVolume | 
    CumulativeDexTradingVolumePerPool | 
    CumulativeDexTradingVolumePerAccount |
    CumulativeDexTradeCount |
    CumulativeDexTradeCountPerAccount
>(
    timestampedEntities: T[],
    beforeTimestamp: Date,
    customFilter?: (elem: T) => boolean
): T | undefined {
    if (timestampedEntities.length < 1) {
        return undefined;
    }

    // find the latest entry that has a tillTimestamp of less than the search timestamp
    const timestampFiltered = timestampedEntities
        .filter(entity => entity.tillTimestamp.getTime() < beforeTimestamp.getTime());

    // apply custom filter (most likely checking poolId for volume per pool entities)
    const customFiltered = (customFilter == undefined) ? timestampFiltered : timestampFiltered.filter(customFilter);

    return customFiltered.reduce((prev: T | undefined, current) => {
        if (prev === undefined) {
            return current;
        }

        return prev.tillTimestamp.getTime() >
            current.tillTimestamp.getTime()
            ? prev
            : current;
    },
    undefined);
}

function cloneTimestampedEntity<
    T extends CumulativeDexTradingVolume | 
    CumulativeDexTradingVolumePerPool | 
    CumulativeDexTradingVolumePerAccount |
    CumulativeDexTradeCount |
    CumulativeDexTradeCountPerAccount
>(
    entity: T,
    entityId: string,
    tillTimestamp: Date
): T {
    // deep clone to preserve existing amounts
    const clone = cloneDeep(entity);
    // change id and tillTimestamp
    clone.id = entityId;
    clone.tillTimestamp = tillTimestamp;
    return clone;
}

async function fetchOrCreateTotalVolumeEntity(
    entityId: string, 
    tillTimestamp: Date, 
    store: Store, 
    entityBuffer: EntityBuffer
): Promise<CumulativeDexTradingVolume> {
    // first try to find by id
    let maybeEntity = entityBuffer.getBufferedEntityBy(
        CumulativeDexTradingVolume.name,
        entityId
    ) as CumulativeDexTradingVolume | undefined;

    if (maybeEntity !== undefined) {
        return maybeEntity;
    }

    // next, try to find latest matching entity in buffer to copy values from
    const bufferedEntities = entityBuffer.getBufferedEntities(CumulativeDexTradingVolume.name) as CumulativeDexTradingVolume[];
    maybeEntity = findLatestTimestampedEntityBefore(bufferedEntities, tillTimestamp);

    if (maybeEntity !== undefined) {
        return cloneTimestampedEntity(maybeEntity, entityId, tillTimestamp);
    }

    // not found in buffer, try store next
    maybeEntity = await store.get(CumulativeDexTradingVolume, entityId);
    if (maybeEntity !== undefined) {
        return maybeEntity;
    }

    // try to find latest matching entity before tillTimestamp
    maybeEntity = await store.get(CumulativeDexTradingVolume, {
        where: { 
            tillTimestamp: LessThan(tillTimestamp),
        },
        order: { tillTimestamp: "DESC" },
    });

    if (maybeEntity) {
        return cloneTimestampedEntity(maybeEntity, entityId, tillTimestamp);
    }

    // not found in buffer or store, create new empty
    return new CumulativeDexTradingVolume({
        id: entityId,
        tillTimestamp,
        amounts: []
    });
}

async function fetchOrCreatePerAccountVolumeEntity(
    entityId: string, 
    accountId: string, 
    tillTimestamp: Date, 
    store: Store, 
    entityBuffer: EntityBuffer
): Promise<CumulativeDexTradingVolumePerAccount> {
    // try to find in buffer by id first
    let maybeEntity = entityBuffer.getBufferedEntityBy(
        CumulativeDexTradingVolumePerAccount.name,
        entityId
    ) as CumulativeDexTradingVolumePerAccount | undefined;

    if (maybeEntity !== undefined) {
        return maybeEntity;
    }

    // next try to find latest entry with volumes in the entity buffer
    const bufferedEntities = entityBuffer.getBufferedEntities(CumulativeDexTradingVolumePerAccount.name) as CumulativeDexTradingVolumePerAccount[];
    const accountFilter = (elem: CumulativeDexTradingVolumePerAccount) => elem.accountId == accountId;
    maybeEntity = findLatestTimestampedEntityBefore(bufferedEntities, tillTimestamp, accountFilter);

    if (maybeEntity !== undefined) {
        return cloneTimestampedEntity(maybeEntity, entityId, tillTimestamp);
    }

    // not found in buffer, try store next
    maybeEntity = await store.get(CumulativeDexTradingVolumePerAccount, entityId);

    if (maybeEntity !== undefined) {
        return maybeEntity;
    }

    // not found, try and locate latest matching entity to clone volumes from
    maybeEntity = await store.get(CumulativeDexTradingVolumePerAccount, {
        where: {
            accountId: accountId,
            tillTimestamp: LessThan(tillTimestamp),
        },
        order: { tillTimestamp: "DESC" },
    });

    if (maybeEntity) {
        return cloneTimestampedEntity(maybeEntity, entityId, tillTimestamp);
    }

    // not found in buffer or store, create new empty
    return new CumulativeDexTradingVolumePerAccount({
        id: entityId,
        accountId,
        tillTimestamp,
        amounts: []
    });
}

async function fetchOrCreateVolumePerPoolEntity(
    entityId: string, 
    poolId: string, 
    poolType: PoolType, 
    tillTimestamp: Date, 
    store: Store, 
    entityBuffer: EntityBuffer
): Promise<CumulativeDexTradingVolumePerPool> {
    // try to find in buffer by id first
    let maybeEntity = entityBuffer.getBufferedEntityBy(
        CumulativeDexTradingVolumePerPool.name,
        entityId
    ) as CumulativeDexTradingVolumePerPool | undefined;

    if (maybeEntity !== undefined) {
        return maybeEntity;
    }

    // next try to find latest entry with volumes in the entity buffer
    const bufferedEntities = entityBuffer.getBufferedEntities(CumulativeDexTradingVolumePerPool.name) as CumulativeDexTradingVolumePerPool[];
    const poolFilter = (elem: CumulativeDexTradingVolumePerPool) => elem.poolId == poolId && elem.poolType == poolType;
    maybeEntity = findLatestTimestampedEntityBefore(bufferedEntities, tillTimestamp, poolFilter);

    if (maybeEntity !== undefined) {
        return cloneTimestampedEntity(maybeEntity, entityId, tillTimestamp);
    }

    // not found in buffer, try store next
    maybeEntity = await store.get(CumulativeDexTradingVolumePerPool, entityId);

    if (maybeEntity !== undefined) {
        return maybeEntity;
    }

    // not found, try and locate latest matching entity to clone volumes from
    maybeEntity = await store.get(CumulativeDexTradingVolumePerPool, {
        where: {
            poolId: poolId,
            poolType: poolType,
            tillTimestamp: LessThan(tillTimestamp),
        },
        order: { tillTimestamp: "DESC" },
    });

    if (maybeEntity) {
        return cloneTimestampedEntity(maybeEntity, entityId, tillTimestamp);
    }

    // not found in buffer or store, create new empty
    return new CumulativeDexTradingVolumePerPool({
        id: entityId,
        poolId,
        poolType,
        tillTimestamp,
        amounts: []
    });
}

async function fetchOrCreateTotalTradeCountEntity(
    entityId: string,
    tillTimestamp: Date,
    store: Store,
    entityBuffer: EntityBuffer
): Promise<CumulativeDexTradeCount> {
    // try to find in buffer by id first
    let maybeEntity = entityBuffer.getBufferedEntityBy(
        CumulativeDexTradeCount.name,
        entityId
    ) as CumulativeDexTradeCount | undefined;

    if (maybeEntity !== undefined) {
        return maybeEntity;
    }

    // next try to find latest entry with volumes in the entity buffer
    const bufferedEntities = entityBuffer.getBufferedEntities(CumulativeDexTradeCount.name) as CumulativeDexTradeCount[];
    maybeEntity = findLatestTimestampedEntityBefore(bufferedEntities, tillTimestamp);

    if (maybeEntity !== undefined) {
        return cloneTimestampedEntity(maybeEntity, entityId, tillTimestamp);
    }

    // not found in buffer, try store next
    maybeEntity = await store.get(CumulativeDexTradeCount, entityId);

    if (maybeEntity !== undefined) {
        return maybeEntity;
    }

    // not found, try and locate latest matching entity to clone volumes from
    maybeEntity = await store.get(CumulativeDexTradeCount, {
        where: {
            tillTimestamp: LessThan(tillTimestamp),
        },
        order: { tillTimestamp: "DESC" },
    });

    if (maybeEntity) {
        return cloneTimestampedEntity(maybeEntity, entityId, tillTimestamp);
    }

    // not found in buffer or store, create new one
    return new CumulativeDexTradeCount({
        id: entityId,
        tillTimestamp,
        count: 0n
    });
}

async function fetchOrCreateTradeCountPerAccountEntity(
    entityId: string,
    accountId: string,
    tillTimestamp: Date,
    store: Store,
    entityBuffer: EntityBuffer
): Promise<CumulativeDexTradeCountPerAccount> {
    // try to find in buffer by id first
    let maybeEntity = entityBuffer.getBufferedEntityBy(
        CumulativeDexTradeCountPerAccount.name,
        entityId
    ) as CumulativeDexTradeCountPerAccount | undefined;

    if (maybeEntity !== undefined) {
        return maybeEntity;
    }

    // next try to find latest entry with volumes in the entity buffer
    const bufferedEntities = entityBuffer.getBufferedEntities(CumulativeDexTradeCountPerAccount.name) as CumulativeDexTradeCountPerAccount[];
    const accountFilter = (elem: CumulativeDexTradeCountPerAccount) => elem.accountId == accountId;
    maybeEntity = findLatestTimestampedEntityBefore(bufferedEntities, tillTimestamp, accountFilter);

    if (maybeEntity !== undefined) {
        return cloneTimestampedEntity(maybeEntity, entityId, tillTimestamp);
    }

    // not found in buffer, try store next
    maybeEntity = await store.get(CumulativeDexTradeCountPerAccount, entityId);

    if (maybeEntity !== undefined) {
        return maybeEntity;
    }

    // not found, try and locate latest matching entity to clone volumes from
    maybeEntity = await store.get(CumulativeDexTradeCountPerAccount, {
        where: {
            accountId: accountId,
            tillTimestamp: LessThan(tillTimestamp),
        },
        order: { tillTimestamp: "DESC" },
    });

    if (maybeEntity) {
        return cloneTimestampedEntity(maybeEntity, entityId, tillTimestamp);
    }

    // not found in buffer or store, create new one
    return new CumulativeDexTradeCountPerAccount({
        id: entityId,
        accountId,
        tillTimestamp,
        count: 0n
    });
}

function buildPoolEntityId(poolId: string, poolType: PoolType, timestamp: Date): string {
    return `${poolId}-${poolType}-${timestamp
        .getTime()
        .toString()}`;
}

export async function updateCumulativeDexTotalVolumes(
    store: Store,
    timestamp: Date,
    amounts: SwapDetailsAmount[],
    entityBuffer: EntityBuffer 
): Promise<CumulativeDexTradingVolume> {
    const entityId = `total-${timestamp.getTime().toString()}`;
    const entity = await fetchOrCreateTotalVolumeEntity(entityId, timestamp, store, entityBuffer);
    return increaseSwapDetailsAmountsForEntity(entity, amounts);
}

export async function updateCumulativeDexVolumesPerAccount(
    store: Store,
    timestamp: Date,
    amounts: SwapDetailsAmount[],
    accountId: string,
    entityBuffer: EntityBuffer 
): Promise<CumulativeDexTradingVolumePerAccount> {
    const entityId = `account-${accountId}-${timestamp.getTime().toString()}`;
    const entity = await fetchOrCreatePerAccountVolumeEntity(entityId, accountId, timestamp, store, entityBuffer);
    return increaseSwapDetailsAmountsForEntity(entity, amounts);
}

export async function updateCumulativeDexVolumesForStandardPool(
    store: Store,
    timestamp: Date,
    swapDetails: SwapDetails,
    entityBuffer: EntityBuffer
): Promise<CumulativeDexTradingVolumePerPool> {
    const poolType = PoolType.Standard;

    const poolId = inferGeneralPoolId(swapDetails.from.currency, swapDetails.to.currency);

    const entityId = buildPoolEntityId(poolId, poolType, timestamp);

    const entity = await fetchOrCreateVolumePerPoolEntity(entityId, poolId, poolType, timestamp, store, entityBuffer);

    return await increaseSwapDetailsAmountsForEntity(entity, [swapDetails.from, swapDetails.to]);
}

export async function updateCumulativeDexVolumesForStablePool(
    store: Store,
    timestamp: Date,
    poolId: number,
    swapDetails: SwapDetails,
    entityBuffer: EntityBuffer
): Promise<CumulativeDexTradingVolumePerPool> {
    const poolType = PoolType.Stable;

    const entityId = buildPoolEntityId(poolId.toString(), poolType, timestamp);

    const entity = await fetchOrCreateVolumePerPoolEntity(entityId, poolId.toString(), poolType, timestamp, store, entityBuffer);
    return await increaseSwapDetailsAmountsForEntity(entity, [swapDetails.from, swapDetails.to]);
}

export async function updateCumulativeDexTotalTradeCount(
    store: Store,
    timestamp: Date,
    entityBuffer: EntityBuffer 
): Promise<CumulativeDexTradeCount> {
    const entityId = `total-${timestamp.getTime().toString()}`;
    const entity = await fetchOrCreateTotalTradeCountEntity(entityId, timestamp, store, entityBuffer);
    entity.count = entity.count + 1n;
    return entity;
}

export async function updateCumulativeDexTradeCountPerAccount(
    store: Store,
    timestamp: Date,
    accountId: string,
    entityBuffer: EntityBuffer 
): Promise<CumulativeDexTradeCountPerAccount> {
    const entityId = `account-${accountId}-${timestamp.getTime().toString()}`;
    const entity = await fetchOrCreateTradeCountPerAccountEntity(entityId, accountId, timestamp, store, entityBuffer);
    entity.count = entity.count + 1n;
    return entity;
}