import assert from 'assert'
import {Block, Chain, ChainContext, BlockContext, Result, Option} from './support'
import * as v1021000 from './v1021000'

export class DexGeneralPairStatusesStorage {
    private readonly _chain: Chain
    private readonly blockHash: string

    constructor(ctx: BlockContext)
    constructor(ctx: ChainContext, block: Block)
    constructor(ctx: BlockContext, block?: Block) {
        block = block || ctx.block
        this.blockHash = block.hash
        this._chain = ctx._chain
    }

    /**
     *  (T::AssetId, T::AssetId) -> PairStatus
     */
    get isV1021000() {
        return this._chain.getStorageItemTypeHash('DexGeneral', 'PairStatuses') === '76a1869bbdaab66d28110f9e64b6a17291d90f48aa261faa9ef287897775caa1'
    }

    /**
     *  (T::AssetId, T::AssetId) -> PairStatus
     */
    async getAsV1021000(key: [v1021000.CurrencyId, v1021000.CurrencyId]): Promise<v1021000.PairStatus> {
        assert(this.isV1021000)
        return this._chain.getStorage(this.blockHash, 'DexGeneral', 'PairStatuses', key)
    }

    async getManyAsV1021000(keys: [v1021000.CurrencyId, v1021000.CurrencyId][]): Promise<(v1021000.PairStatus)[]> {
        assert(this.isV1021000)
        return this._chain.queryStorage(this.blockHash, 'DexGeneral', 'PairStatuses', keys.map(k => [k]))
    }

    async getAllAsV1021000(): Promise<(v1021000.PairStatus)[]> {
        assert(this.isV1021000)
        return this._chain.queryStorage(this.blockHash, 'DexGeneral', 'PairStatuses')
    }

    /**
     * Checks whether the storage item is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getStorageItemTypeHash('DexGeneral', 'PairStatuses') != null
    }
}

export class DexStablePoolsStorage {
    private readonly _chain: Chain
    private readonly blockHash: string

    constructor(ctx: BlockContext)
    constructor(ctx: ChainContext, block: Block)
    constructor(ctx: BlockContext, block?: Block) {
        block = block || ctx.block
        this.blockHash = block.hash
        this._chain = ctx._chain
    }

    /**
     *  Info of a pool.
     */
    get isV1021000() {
        return this._chain.getStorageItemTypeHash('DexStable', 'Pools') === '589bc6643ae522e9f672bbb153dcc85f9ed48dd356b43697ce45ce589424599a'
    }

    /**
     *  Info of a pool.
     */
    async getAsV1021000(key: number): Promise<v1021000.Pool | undefined> {
        assert(this.isV1021000)
        return this._chain.getStorage(this.blockHash, 'DexStable', 'Pools', key)
    }

    async getManyAsV1021000(keys: number[]): Promise<(v1021000.Pool | undefined)[]> {
        assert(this.isV1021000)
        return this._chain.queryStorage(this.blockHash, 'DexStable', 'Pools', keys.map(k => [k]))
    }

    async getAllAsV1021000(): Promise<(v1021000.Pool)[]> {
        assert(this.isV1021000)
        return this._chain.queryStorage(this.blockHash, 'DexStable', 'Pools')
    }

    /**
     * Checks whether the storage item is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getStorageItemTypeHash('DexStable', 'Pools') != null
    }
}

export class IssueIssuePeriodStorage {
    private readonly _chain: Chain
    private readonly blockHash: string

    constructor(ctx: BlockContext)
    constructor(ctx: ChainContext, block: Block)
    constructor(ctx: BlockContext, block?: Block) {
        block = block || ctx.block
        this.blockHash = block.hash
        this._chain = ctx._chain
    }

    /**
     *  The time difference in number of blocks between an issue request is created
     *  and required completion time by a user. The issue period has an upper limit
     *  to prevent griefing of vault collateral.
     */
    get isV1() {
        return this._chain.getStorageItemTypeHash('Issue', 'IssuePeriod') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  The time difference in number of blocks between an issue request is created
     *  and required completion time by a user. The issue period has an upper limit
     *  to prevent griefing of vault collateral.
     */
    async getAsV1(): Promise<number> {
        assert(this.isV1)
        return this._chain.getStorage(this.blockHash, 'Issue', 'IssuePeriod')
    }

    /**
     * Checks whether the storage item is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getStorageItemTypeHash('Issue', 'IssuePeriod') != null
    }
}

export class RedeemRedeemPeriodStorage {
    private readonly _chain: Chain
    private readonly blockHash: string

    constructor(ctx: BlockContext)
    constructor(ctx: ChainContext, block: Block)
    constructor(ctx: BlockContext, block?: Block) {
        block = block || ctx.block
        this.blockHash = block.hash
        this._chain = ctx._chain
    }

    /**
     *  The time difference in number of blocks between a redeem request is created and required completion time by a
     *  vault. The redeem period has an upper limit to ensure the user gets their BTC in time and to potentially
     *  punish a vault for inactivity or stealing BTC.
     */
    get isV1() {
        return this._chain.getStorageItemTypeHash('Redeem', 'RedeemPeriod') === '81bbbe8e62451cbcc227306706c919527aa2538970bd6d67a9969dd52c257d02'
    }

    /**
     *  The time difference in number of blocks between a redeem request is created and required completion time by a
     *  vault. The redeem period has an upper limit to ensure the user gets their BTC in time and to potentially
     *  punish a vault for inactivity or stealing BTC.
     */
    async getAsV1(): Promise<number> {
        assert(this.isV1)
        return this._chain.getStorage(this.blockHash, 'Redeem', 'RedeemPeriod')
    }

    /**
     * Checks whether the storage item is defined for the current chain version.
     */
    get isExists(): boolean {
        return this._chain.getStorageItemTypeHash('Redeem', 'RedeemPeriod') != null
    }
}
