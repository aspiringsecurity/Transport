import {LessThanOrEqual} from "typeorm";
import { Height } from "../../model";
import {Ctx} from "../../processor";

const inMemoryCache = new Map<number, Height>();

export function setCache(block: number, height: Height) {
    inMemoryCache.set(block, height);
}

export async function blockToHeight(
    ctx: Ctx,
    absoluteBlock: number,
    eventName?: string // for logging purposes
): Promise<Height> {
    // first check in-memory
    const cacheLookup = inMemoryCache.get(absoluteBlock);
    if (cacheLookup !== undefined) return cacheLookup;

    // if not found, fetch from DB
    const existingEntity = await ctx.store.get(Height, {
        where: { absolute: absoluteBlock },
    });
    if (existingEntity !== undefined) {
        // was already set for current block, either by UpdateActiveBlock or previous invocation of blockToHeight
        inMemoryCache.set(absoluteBlock, existingEntity)
        return existingEntity;
    } else {
        // not set for current block - get latest value of `active` and save Height for current block (if exists)
        const lastSetActive = (
            await ctx.store.get(Height, {
                where: { absolute: LessThanOrEqual(absoluteBlock) },
                order: { active: "DESC" },
            })
        )?.active;
        if (lastSetActive === undefined) {
            ctx.log.warn(
                `WARNING: Did not find Height entity for absolute block ${absoluteBlock}. This means the chain did not generate UpdateActiveBlock events priorly, yet other events are being processed${
                    eventName ? ` (such as ${eventName})` : ""
                }, which may not be normal.`
            );
        }
        const height = new Height({
            id: absoluteBlock.toString(),
            absolute: absoluteBlock,
            active: lastSetActive || 0,
        });
        inMemoryCache.set(absoluteBlock, height);
        await ctx.store.save(height); // TODO: do we need this?
        return height;
    }
}

export function clearCache() {
    inMemoryCache.clear();
}
