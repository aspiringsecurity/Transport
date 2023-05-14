import assert from 'assert'
import {Chain, ChainContext, EventContext, Event, Result, Option} from './support'
import * as v1 from './v1'
import * as v3 from './v3'
import * as v4 from './v4'
import * as v6 from './v6'
import * as v10 from './v10'
import * as v15 from './v15'
import * as v17 from './v17'
import * as v1020000 from './v1020000'
import * as v1021000 from './v1021000'

export class BtcRelayStoreMainChainHeaderEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'BTCRelay.StoreMainChainHeader')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     *  new chain height, block_header_hash, relayer_id
     */
    get isV1(): boolean {
        return this._chain.getEventHash('BTCRelay.StoreMainChainHeader') === 'f968eb148e0dc7739feb64d5c72eea0de823dbf44259d08f9a6218f8117bf19a'
    }

    /**
     *  new chain height, block_header_hash, relayer_id
     */
    get asV1(): [number, Uint8Array, Uint8Array] {
        assert(this.isV1)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * new chain height, block_header_hash, relayer_id
     */
    get isV3(): boolean {
        return this._chain.getEventHash('BTCRelay.StoreMainChainHeader') === '290531519837049ab1429ea437847c9beb65c88478190b3042d7b5068e32692c'
    }

    /**
     * new chain height, block_header_hash, relayer_id
     */
    get asV3(): [number, v3.H256Le, Uint8Array] {
        assert(this.isV3)
        return this._chain.decodeEvent(this.event)
    }

    get isV4(): boolean {
        return this._chain.getEventHash('BTCRelay.StoreMainChainHeader') === '3a178b8aa8fda895164a8d649ecb2cd8dfbc42daa449008b2b703520d2768e74'
    }

    get asV4(): {blockHeight: number, blockHash: v4.H256Le, relayerId: Uint8Array} {
        assert(this.isV4)
        return this._chain.decodeEvent(this.event)
    }
}

export class DexGeneralAssetSwapEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'DexGeneral.AssetSwap')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Transact in trading \[owner, recipient, swap_path, balances\]
     */
    get isV1021000(): boolean {
        return this._chain.getEventHash('DexGeneral.AssetSwap') === '30f80dbfcfdeb3f5f4ee219068494b5b646f7456fb27dea0316737eec2e3f8c6'
    }

    /**
     * Transact in trading \[owner, recipient, swap_path, balances\]
     */
    get asV1021000(): [Uint8Array, Uint8Array, v1021000.CurrencyId[], bigint[]] {
        assert(this.isV1021000)
        return this._chain.decodeEvent(this.event)
    }
}

export class DexGeneralLiquidityAddedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'DexGeneral.LiquidityAdded')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Add liquidity. \[owner, asset_0, asset_1, add_balance_0, add_balance_1,
     * mint_balance_lp\]
     */
    get isV1021000(): boolean {
        return this._chain.getEventHash('DexGeneral.LiquidityAdded') === 'd8b087aac9964db76a860392438c8c03122c1821fc97316158cf5177e3078899'
    }

    /**
     * Add liquidity. \[owner, asset_0, asset_1, add_balance_0, add_balance_1,
     * mint_balance_lp\]
     */
    get asV1021000(): [Uint8Array, v1021000.CurrencyId, v1021000.CurrencyId, bigint, bigint, bigint] {
        assert(this.isV1021000)
        return this._chain.decodeEvent(this.event)
    }
}

export class DexGeneralLiquidityRemovedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'DexGeneral.LiquidityRemoved')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Remove liquidity. \[owner, recipient, asset_0, asset_1, rm_balance_0, rm_balance_1,
     * burn_balance_lp\]
     */
    get isV1021000(): boolean {
        return this._chain.getEventHash('DexGeneral.LiquidityRemoved') === '3b79687d35ae212367d8e45de1258467b263a0005a6840dceaf3184c4aad8999'
    }

    /**
     * Remove liquidity. \[owner, recipient, asset_0, asset_1, rm_balance_0, rm_balance_1,
     * burn_balance_lp\]
     */
    get asV1021000(): [Uint8Array, Uint8Array, v1021000.CurrencyId, v1021000.CurrencyId, bigint, bigint, bigint] {
        assert(this.isV1021000)
        return this._chain.decodeEvent(this.event)
    }
}

export class DexStableAddLiquidityEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'DexStable.AddLiquidity')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Supply some liquidity to a pool.
     */
    get isV1021000(): boolean {
        return this._chain.getEventHash('DexStable.AddLiquidity') === 'a13771fa4a43699908fd74b590a40e3758df36687bc93151bb61c4d8276f23d5'
    }

    /**
     * Supply some liquidity to a pool.
     */
    get asV1021000(): {poolId: number, who: Uint8Array, to: Uint8Array, supplyAmounts: bigint[], fees: bigint[], newD: bigint, mintAmount: bigint} {
        assert(this.isV1021000)
        return this._chain.decodeEvent(this.event)
    }
}

export class DexStableCurrencyExchangeEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'DexStable.CurrencyExchange')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Swap a amounts of currency to get other.
     */
    get isV1021000(): boolean {
        return this._chain.getEventHash('DexStable.CurrencyExchange') === '0abe856f4fa3b499a28439696d7ae07664a33ec25834861bc9032b5d4950a766'
    }

    /**
     * Swap a amounts of currency to get other.
     */
    get asV1021000(): {poolId: number, who: Uint8Array, to: Uint8Array, inIndex: number, inAmount: bigint, outIndex: number, outAmount: bigint} {
        assert(this.isV1021000)
        return this._chain.decodeEvent(this.event)
    }
}

export class DexStableNewAdminFeeEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'DexStable.NewAdminFee')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * A pool's admin fee parameters was updated
     */
    get isV1021000(): boolean {
        return this._chain.getEventHash('DexStable.NewAdminFee') === '354aacd87525ee5edab25bfc7703181a00e6bb535431cf8546eea25c7f0fcf9d'
    }

    /**
     * A pool's admin fee parameters was updated
     */
    get asV1021000(): {poolId: number, newAdminFee: bigint} {
        assert(this.isV1021000)
        return this._chain.decodeEvent(this.event)
    }
}

export class DexStableNewSwapFeeEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'DexStable.NewSwapFee')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * A pool's swap fee parameters was updated
     */
    get isV1021000(): boolean {
        return this._chain.getEventHash('DexStable.NewSwapFee') === '5a651444f44feda108605f5777f9ad6e8411982c46c30660727dcdc176f49c48'
    }

    /**
     * A pool's swap fee parameters was updated
     */
    get asV1021000(): {poolId: number, newSwapFee: bigint} {
        assert(this.isV1021000)
        return this._chain.decodeEvent(this.event)
    }
}

export class DexStableRemoveLiquidityEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'DexStable.RemoveLiquidity')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Remove some liquidity from a pool.
     */
    get isV1021000(): boolean {
        return this._chain.getEventHash('DexStable.RemoveLiquidity') === 'dfcb09ba3f04d8111a917fe1f5c015f63a37a2fad3f099a51c4e4d6947e2897a'
    }

    /**
     * Remove some liquidity from a pool.
     */
    get asV1021000(): {poolId: number, who: Uint8Array, to: Uint8Array, amounts: bigint[], fees: bigint[], newTotalSupply: bigint} {
        assert(this.isV1021000)
        return this._chain.decodeEvent(this.event)
    }
}

export class EscrowDepositEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Escrow.Deposit')
        this._chain = ctx._chain
        this.event = event
    }

    get isV6(): boolean {
        return this._chain.getEventHash('Escrow.Deposit') === 'cffee376c25258e64c55b292b2ef7fd293b8dae2b1bded46ae86117b6bef1e06'
    }

    get asV6(): {who: Uint8Array, amount: bigint, unlockHeight: number} {
        assert(this.isV6)
        return this._chain.decodeEvent(this.event)
    }
}

export class EscrowWithdrawEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Escrow.Withdraw')
        this._chain = ctx._chain
        this.event = event
    }

    get isV6(): boolean {
        return this._chain.getEventHash('Escrow.Withdraw') === 'e84a34a6a3d577b31f16557bd304282f4fe4cbd7115377f4687635dc48e52ba5'
    }

    get asV6(): {who: Uint8Array, amount: bigint} {
        assert(this.isV6)
        return this._chain.decodeEvent(this.event)
    }
}

export class IssueCancelIssueEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Issue.CancelIssue')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1(): boolean {
        return this._chain.getEventHash('Issue.CancelIssue') === 'dad2bcdca357505fa3c7832085d0db53ce6f902bd9f5b52823ee8791d351872c'
    }

    get asV1(): [Uint8Array, Uint8Array, bigint] {
        assert(this.isV1)
        return this._chain.decodeEvent(this.event)
    }

    get isV4(): boolean {
        return this._chain.getEventHash('Issue.CancelIssue') === 'dd10ea1f015728a5572b75e327aaa9f9728439faeebf53fdb44dfd30dab17474'
    }

    get asV4(): {issueId: Uint8Array, requester: Uint8Array, griefingCollateral: bigint} {
        assert(this.isV4)
        return this._chain.decodeEvent(this.event)
    }
}

export class IssueExecuteIssueEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Issue.ExecuteIssue')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1(): boolean {
        return this._chain.getEventHash('Issue.ExecuteIssue') === '2820d4c58b8c4ec99257547a894db861abc1a572bd87d7a2ba5a25416d6d49df'
    }

    get asV1(): [Uint8Array, Uint8Array, bigint, Uint8Array, bigint] {
        assert(this.isV1)
        return this._chain.decodeEvent(this.event)
    }

    get isV3(): boolean {
        return this._chain.getEventHash('Issue.ExecuteIssue') === 'a1f3d32d29a387d7b9013ef2d1b13fea592053869403bfdb77f39e02178dbac0'
    }

    get asV3(): [Uint8Array, Uint8Array, v3.VaultId, bigint, bigint] {
        assert(this.isV3)
        return this._chain.decodeEvent(this.event)
    }

    get isV4(): boolean {
        return this._chain.getEventHash('Issue.ExecuteIssue') === '49e3902185f84af75b36ed39680404c296dd95ff77f390f753e7c37a64f2cbe4'
    }

    get asV4(): {issueId: Uint8Array, requester: Uint8Array, vaultId: v4.VaultId, amount: bigint, fee: bigint} {
        assert(this.isV4)
        return this._chain.decodeEvent(this.event)
    }

    get isV6(): boolean {
        return this._chain.getEventHash('Issue.ExecuteIssue') === '2ff5138d78f3f6a2653075dd3a176e19ea3d74dff5322a66842829791cc1bf1c'
    }

    get asV6(): {issueId: Uint8Array, requester: Uint8Array, vaultId: v6.VaultId, amount: bigint, fee: bigint} {
        assert(this.isV6)
        return this._chain.decodeEvent(this.event)
    }

    get isV15(): boolean {
        return this._chain.getEventHash('Issue.ExecuteIssue') === '59b466a6e015f85e94002e9665fe08f0186b5e846ef923083d28d6a163240ef5'
    }

    get asV15(): {issueId: Uint8Array, requester: Uint8Array, vaultId: v15.VaultId, amount: bigint, fee: bigint} {
        assert(this.isV15)
        return this._chain.decodeEvent(this.event)
    }

    get isV17(): boolean {
        return this._chain.getEventHash('Issue.ExecuteIssue') === '566276893c9ed457216387ebf43f6abe618732a1c66cf1fce9ec1e6549b3e23a'
    }

    get asV17(): {issueId: Uint8Array, requester: Uint8Array, vaultId: v17.VaultId, amount: bigint, fee: bigint} {
        assert(this.isV17)
        return this._chain.decodeEvent(this.event)
    }

    get isV1020000(): boolean {
        return this._chain.getEventHash('Issue.ExecuteIssue') === 'bae508274af5c9fc4bd05965c69829482ed886550bb4ffd798a9f91033ce8c9e'
    }

    get asV1020000(): {issueId: Uint8Array, requester: Uint8Array, vaultId: v1020000.VaultId, amount: bigint, fee: bigint} {
        assert(this.isV1020000)
        return this._chain.decodeEvent(this.event)
    }

    get isV1021000(): boolean {
        return this._chain.getEventHash('Issue.ExecuteIssue') === '4baf9dd6d4b264e164bc5dd9f4bec3a40af0fa314fd15de6368c879740f10c21'
    }

    get asV1021000(): {issueId: Uint8Array, requester: Uint8Array, vaultId: v1021000.VaultId, amount: bigint, fee: bigint} {
        assert(this.isV1021000)
        return this._chain.decodeEvent(this.event)
    }
}

export class IssueIssuePeriodChangeEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Issue.IssuePeriodChange')
        this._chain = ctx._chain
        this.event = event
    }

    get isV16(): boolean {
        return this._chain.getEventHash('Issue.IssuePeriodChange') === 'e4e1ffe21a95b5f4c933e4d40a2443e9cc2637c056d780de97e2e7ad5f6a7f59'
    }

    get asV16(): {period: number} {
        assert(this.isV16)
        return this._chain.decodeEvent(this.event)
    }
}

export class IssueRequestIssueEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Issue.RequestIssue')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1(): boolean {
        return this._chain.getEventHash('Issue.RequestIssue') === 'ef06c322f93c1464c44b998ba5b001d4b07defc39952ee26eb5dd165e2feb3cc'
    }

    get asV1(): [Uint8Array, Uint8Array, bigint, bigint, bigint, Uint8Array, v1.BtcAddress, Uint8Array] {
        assert(this.isV1)
        return this._chain.decodeEvent(this.event)
    }

    get isV3(): boolean {
        return this._chain.getEventHash('Issue.RequestIssue') === 'da8b8369ee4b69f852a27eb4204d9100b66fdba5008f7343b322a11b7ae3e108'
    }

    get asV3(): [Uint8Array, Uint8Array, bigint, bigint, bigint, v3.VaultId, v3.Address, Uint8Array] {
        assert(this.isV3)
        return this._chain.decodeEvent(this.event)
    }

    get isV4(): boolean {
        return this._chain.getEventHash('Issue.RequestIssue') === 'e9c053c04240da9f4e2ea2147886c8716c19d1b52338aaa74eb784127a3e8349'
    }

    get asV4(): {issueId: Uint8Array, requester: Uint8Array, amount: bigint, fee: bigint, griefingCollateral: bigint, vaultId: v4.VaultId, vaultAddress: v4.Address, vaultPublicKey: Uint8Array} {
        assert(this.isV4)
        return this._chain.decodeEvent(this.event)
    }

    get isV6(): boolean {
        return this._chain.getEventHash('Issue.RequestIssue') === '9910df9068ce728a128a44ed3596fac8d6668c4542edc3d1b0633e7f6f22427e'
    }

    get asV6(): {issueId: Uint8Array, requester: Uint8Array, amount: bigint, fee: bigint, griefingCollateral: bigint, vaultId: v6.VaultId, vaultAddress: v6.Address, vaultPublicKey: Uint8Array} {
        assert(this.isV6)
        return this._chain.decodeEvent(this.event)
    }

    get isV15(): boolean {
        return this._chain.getEventHash('Issue.RequestIssue') === 'be2b62a770052ad3efd867964c7b393dc73d5a0d8e1e478ae5a5a98e49d5a24c'
    }

    get asV15(): {issueId: Uint8Array, requester: Uint8Array, amount: bigint, fee: bigint, griefingCollateral: bigint, vaultId: v15.VaultId, vaultAddress: v15.Address, vaultPublicKey: Uint8Array} {
        assert(this.isV15)
        return this._chain.decodeEvent(this.event)
    }

    get isV17(): boolean {
        return this._chain.getEventHash('Issue.RequestIssue') === '769ffeb97beaff8fe740f3751c457b8fc376b93ebf99b41c29772f70804e3b37'
    }

    get asV17(): {issueId: Uint8Array, requester: Uint8Array, amount: bigint, fee: bigint, griefingCollateral: bigint, vaultId: v17.VaultId, vaultAddress: v17.Address, vaultPublicKey: Uint8Array} {
        assert(this.isV17)
        return this._chain.decodeEvent(this.event)
    }

    get isV1020000(): boolean {
        return this._chain.getEventHash('Issue.RequestIssue') === 'dec8a3f27b7c40d26a4cb398193a1e9d6acd7b0d5297dd6cf8c276afd738d913'
    }

    get asV1020000(): {issueId: Uint8Array, requester: Uint8Array, amount: bigint, fee: bigint, griefingCollateral: bigint, vaultId: v1020000.VaultId, vaultAddress: v1020000.Address, vaultPublicKey: Uint8Array} {
        assert(this.isV1020000)
        return this._chain.decodeEvent(this.event)
    }

    get isV1021000(): boolean {
        return this._chain.getEventHash('Issue.RequestIssue') === '185fc3b1ef633698c63afd240d23a4639cd68c37174891b6ab4c599638fd22e5'
    }

    get asV1021000(): {issueId: Uint8Array, requester: Uint8Array, amount: bigint, fee: bigint, griefingCollateral: bigint, vaultId: v1021000.VaultId, vaultAddress: v1021000.Address, vaultPublicKey: Uint8Array} {
        assert(this.isV1021000)
        return this._chain.decodeEvent(this.event)
    }
}

export class LoansActivatedMarketEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Loans.ActivatedMarket')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Event emitted when a market is activated
     */
    get isV1021000(): boolean {
        return this._chain.getEventHash('Loans.ActivatedMarket') === '1858bf9b3628aa8a8687f8aae9510db8522c614695943242734a006d019f2b4a'
    }

    /**
     * Event emitted when a market is activated
     */
    get asV1021000(): {underlyingCurrencyId: v1021000.CurrencyId} {
        assert(this.isV1021000)
        return this._chain.decodeEvent(this.event)
    }
}

export class LoansBorrowedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Loans.Borrowed')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Event emitted when cash is borrowed
     */
    get isV1021000(): boolean {
        return this._chain.getEventHash('Loans.Borrowed') === '8b5f8c59012e371082ee5cf1c169dd9db23e561ebe6f21ad24df07a6aeb565c6'
    }

    /**
     * Event emitted when cash is borrowed
     */
    get asV1021000(): {accountId: Uint8Array, currencyId: v1021000.CurrencyId, amount: bigint} {
        assert(this.isV1021000)
        return this._chain.decodeEvent(this.event)
    }
}

export class LoansDepositCollateralEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Loans.DepositCollateral')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Enable collateral for certain asset
     */
    get isV1021000(): boolean {
        return this._chain.getEventHash('Loans.DepositCollateral') === '8b5f8c59012e371082ee5cf1c169dd9db23e561ebe6f21ad24df07a6aeb565c6'
    }

    /**
     * Enable collateral for certain asset
     */
    get asV1021000(): {accountId: Uint8Array, currencyId: v1021000.CurrencyId, amount: bigint} {
        assert(this.isV1021000)
        return this._chain.decodeEvent(this.event)
    }
}

export class LoansDepositedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Loans.Deposited')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Event emitted when assets are deposited
     */
    get isV1021000(): boolean {
        return this._chain.getEventHash('Loans.Deposited') === '8b5f8c59012e371082ee5cf1c169dd9db23e561ebe6f21ad24df07a6aeb565c6'
    }

    /**
     * Event emitted when assets are deposited
     */
    get asV1021000(): {accountId: Uint8Array, currencyId: v1021000.CurrencyId, amount: bigint} {
        assert(this.isV1021000)
        return this._chain.decodeEvent(this.event)
    }
}

export class LoansDistributedBorrowerRewardEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Loans.DistributedBorrowerReward')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Deposited when Reward is distributed to a borrower
     */
    get isV1021000(): boolean {
        return this._chain.getEventHash('Loans.DistributedBorrowerReward') === '68fa21fcb9442e46b747c3695d8bc646e9b35992467ac2b847c5592a1ba7c113'
    }

    /**
     * Deposited when Reward is distributed to a borrower
     */
    get asV1021000(): {underlyingCurrencyId: v1021000.CurrencyId, borrower: Uint8Array, rewardDelta: bigint, borrowRewardIndex: bigint} {
        assert(this.isV1021000)
        return this._chain.decodeEvent(this.event)
    }
}

export class LoansDistributedSupplierRewardEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Loans.DistributedSupplierReward')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Deposited when Reward is distributed to a supplier
     */
    get isV1021000(): boolean {
        return this._chain.getEventHash('Loans.DistributedSupplierReward') === '04b7b20babbbc895d835a3e014c5f07e29d558296e9308fcad90f4f707a620b8'
    }

    /**
     * Deposited when Reward is distributed to a supplier
     */
    get asV1021000(): {underlyingCurrencyId: v1021000.CurrencyId, supplier: Uint8Array, rewardDelta: bigint, supplyRewardIndex: bigint} {
        assert(this.isV1021000)
        return this._chain.decodeEvent(this.event)
    }
}

export class LoansInterestAccruedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Loans.InterestAccrued')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Event emitted when interest has been accrued for a market
     */
    get isV1021000(): boolean {
        return this._chain.getEventHash('Loans.InterestAccrued') === '5e1e11157770abecf8ddbc4721189df242e4184a3c8d5e05e7c7164d6a0ef8ae'
    }

    /**
     * Event emitted when interest has been accrued for a market
     */
    get asV1021000(): {underlyingCurrencyId: v1021000.CurrencyId, totalBorrows: bigint, totalReserves: bigint, borrowIndex: bigint, utilizationRatio: number, borrowRate: bigint, supplyRate: bigint, exchangeRate: bigint} {
        assert(this.isV1021000)
        return this._chain.decodeEvent(this.event)
    }
}

export class LoansLiquidatedBorrowEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Loans.LiquidatedBorrow')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Event emitted when a borrow is liquidated
     */
    get isV1021000(): boolean {
        return this._chain.getEventHash('Loans.LiquidatedBorrow') === 'd0f3e3242008bbb680214549c50727b0a70514faa69486b7a3e1a61e83b3df56'
    }

    /**
     * Event emitted when a borrow is liquidated
     */
    get asV1021000(): {liquidator: Uint8Array, borrower: Uint8Array, liquidationCurrencyId: v1021000.CurrencyId, collateralCurrencyId: v1021000.CurrencyId, repayAmount: bigint, collateralUnderlyingAmount: bigint} {
        assert(this.isV1021000)
        return this._chain.decodeEvent(this.event)
    }
}

export class LoansNewMarketEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Loans.NewMarket')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * New market is set
     */
    get isV1021000(): boolean {
        return this._chain.getEventHash('Loans.NewMarket') === 'c2948dac1e13b8d635e1ae5b599cbfcbe91e27f1432b4729ae57cd280ddb3a58'
    }

    /**
     * New market is set
     */
    get asV1021000(): {underlyingCurrencyId: v1021000.CurrencyId, market: v1021000.Market} {
        assert(this.isV1021000)
        return this._chain.decodeEvent(this.event)
    }
}

export class LoansRedeemedEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Loans.Redeemed')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Event emitted when assets are redeemed
     */
    get isV1021000(): boolean {
        return this._chain.getEventHash('Loans.Redeemed') === '8b5f8c59012e371082ee5cf1c169dd9db23e561ebe6f21ad24df07a6aeb565c6'
    }

    /**
     * Event emitted when assets are redeemed
     */
    get asV1021000(): {accountId: Uint8Array, currencyId: v1021000.CurrencyId, amount: bigint} {
        assert(this.isV1021000)
        return this._chain.decodeEvent(this.event)
    }
}

export class LoansRepaidBorrowEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Loans.RepaidBorrow')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Event emitted when a borrow is repaid
     */
    get isV1021000(): boolean {
        return this._chain.getEventHash('Loans.RepaidBorrow') === '8b5f8c59012e371082ee5cf1c169dd9db23e561ebe6f21ad24df07a6aeb565c6'
    }

    /**
     * Event emitted when a borrow is repaid
     */
    get asV1021000(): {accountId: Uint8Array, currencyId: v1021000.CurrencyId, amount: bigint} {
        assert(this.isV1021000)
        return this._chain.decodeEvent(this.event)
    }
}

export class LoansUpdatedMarketEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Loans.UpdatedMarket')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * New market parameters is updated
     */
    get isV1021000(): boolean {
        return this._chain.getEventHash('Loans.UpdatedMarket') === 'c2948dac1e13b8d635e1ae5b599cbfcbe91e27f1432b4729ae57cd280ddb3a58'
    }

    /**
     * New market parameters is updated
     */
    get asV1021000(): {underlyingCurrencyId: v1021000.CurrencyId, market: v1021000.Market} {
        assert(this.isV1021000)
        return this._chain.decodeEvent(this.event)
    }
}

export class LoansWithdrawCollateralEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Loans.WithdrawCollateral')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     * Disable collateral for certain asset
     */
    get isV1021000(): boolean {
        return this._chain.getEventHash('Loans.WithdrawCollateral') === '8b5f8c59012e371082ee5cf1c169dd9db23e561ebe6f21ad24df07a6aeb565c6'
    }

    /**
     * Disable collateral for certain asset
     */
    get asV1021000(): {accountId: Uint8Array, currencyId: v1021000.CurrencyId, amount: bigint} {
        assert(this.isV1021000)
        return this._chain.decodeEvent(this.event)
    }
}

export class OracleFeedValuesEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Oracle.FeedValues')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     *  Event emitted when exchange rate is set
     */
    get isV1(): boolean {
        return this._chain.getEventHash('Oracle.FeedValues') === '150be353c3897d92d2f59dd0cf42f8e94e7733485ffced2934e1fe7fabc7d63b'
    }

    /**
     *  Event emitted when exchange rate is set
     */
    get asV1(): [Uint8Array, [v1.OracleKey, bigint][]] {
        assert(this.isV1)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Event emitted when exchange rate is set
     */
    get isV4(): boolean {
        return this._chain.getEventHash('Oracle.FeedValues') === '482aee6c657d0b3c7f63bde1b0b37398fc9c0f8c86ae00d1a2b92472ba0e857b'
    }

    /**
     * Event emitted when exchange rate is set
     */
    get asV4(): {oracleId: Uint8Array, values: [v4.Key, bigint][]} {
        assert(this.isV4)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Event emitted when exchange rate is set
     */
    get isV6(): boolean {
        return this._chain.getEventHash('Oracle.FeedValues') === 'f16b568d293186bb4f58786837ea9fcb8f319058b4d8f2d493bf4608c02af411'
    }

    /**
     * Event emitted when exchange rate is set
     */
    get asV6(): {oracleId: Uint8Array, values: [v6.Key, bigint][]} {
        assert(this.isV6)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Event emitted when exchange rate is set
     */
    get isV15(): boolean {
        return this._chain.getEventHash('Oracle.FeedValues') === 'd9737bee3d7f81120cc278add05171ccee95498f161d512210a7510b4950f7d3'
    }

    /**
     * Event emitted when exchange rate is set
     */
    get asV15(): {oracleId: Uint8Array, values: [v15.Key, bigint][]} {
        assert(this.isV15)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Event emitted when exchange rate is set
     */
    get isV17(): boolean {
        return this._chain.getEventHash('Oracle.FeedValues') === 'a69282ccd8a5eae74ab42e55b767eebed71035da539edf78068263113d72072e'
    }

    /**
     * Event emitted when exchange rate is set
     */
    get asV17(): {oracleId: Uint8Array, values: [v17.Key, bigint][]} {
        assert(this.isV17)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Event emitted when exchange rate is set
     */
    get isV1020000(): boolean {
        return this._chain.getEventHash('Oracle.FeedValues') === '17b0897230c0b9428d2399400060f79777b074339f6fc47ee85a179d3bdf245d'
    }

    /**
     * Event emitted when exchange rate is set
     */
    get asV1020000(): {oracleId: Uint8Array, values: [v1020000.Key, bigint][]} {
        assert(this.isV1020000)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Event emitted when exchange rate is set
     */
    get isV1021000(): boolean {
        return this._chain.getEventHash('Oracle.FeedValues') === '4492de23da2e37ba83a1a5074b7856f7b4dc0dbf5352e61bc28824ee6e921ae0'
    }

    /**
     * Event emitted when exchange rate is set
     */
    get asV1021000(): {oracleId: Uint8Array, values: [v1021000.Key, bigint][]} {
        assert(this.isV1021000)
        return this._chain.decodeEvent(this.event)
    }
}

export class RedeemCancelRedeemEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Redeem.CancelRedeem')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1(): boolean {
        return this._chain.getEventHash('Redeem.CancelRedeem') === '1c737ba0c589912d83533472dae8556b4b399fcdd6dff32c516d4783afb2e709'
    }

    get asV1(): [Uint8Array, Uint8Array, Uint8Array, bigint, v1.RedeemRequestStatus] {
        assert(this.isV1)
        return this._chain.decodeEvent(this.event)
    }

    get isV3(): boolean {
        return this._chain.getEventHash('Redeem.CancelRedeem') === '573ff84888e6c6e2434a4b05bac34ec6f9aae9929e23acc6da1aa4fe42d59a7e'
    }

    get asV3(): [Uint8Array, Uint8Array, v3.VaultId, bigint, v3.RedeemRequestStatus] {
        assert(this.isV3)
        return this._chain.decodeEvent(this.event)
    }

    get isV4(): boolean {
        return this._chain.getEventHash('Redeem.CancelRedeem') === 'ff228821848b6261f9fd58719f6ae2add2e429b150385f2203137b8b46dc25c9'
    }

    get asV4(): {redeemId: Uint8Array, redeemer: Uint8Array, vaultId: v4.VaultId, slashedAmount: bigint, status: v4.RedeemRequestStatus} {
        assert(this.isV4)
        return this._chain.decodeEvent(this.event)
    }

    get isV6(): boolean {
        return this._chain.getEventHash('Redeem.CancelRedeem') === '65667d182147765266d9fde5bea213fc219a68bbfe9ee55aab26e99c43c2bd35'
    }

    get asV6(): {redeemId: Uint8Array, redeemer: Uint8Array, vaultId: v6.VaultId, slashedAmount: bigint, status: v6.RedeemRequestStatus} {
        assert(this.isV6)
        return this._chain.decodeEvent(this.event)
    }

    get isV15(): boolean {
        return this._chain.getEventHash('Redeem.CancelRedeem') === '2bcc8077005e6b218259975e52323959dc8afc6d8c7badbecbf2a61537bb5268'
    }

    get asV15(): {redeemId: Uint8Array, redeemer: Uint8Array, vaultId: v15.VaultId, slashedAmount: bigint, status: v15.RedeemRequestStatus} {
        assert(this.isV15)
        return this._chain.decodeEvent(this.event)
    }

    get isV17(): boolean {
        return this._chain.getEventHash('Redeem.CancelRedeem') === '046a69f6b3ee0b3f2ab566a61e763c659684c61891baeb681e8bbd95a6268e50'
    }

    get asV17(): {redeemId: Uint8Array, redeemer: Uint8Array, vaultId: v17.VaultId, slashedAmount: bigint, status: v17.RedeemRequestStatus} {
        assert(this.isV17)
        return this._chain.decodeEvent(this.event)
    }

    get isV1020000(): boolean {
        return this._chain.getEventHash('Redeem.CancelRedeem') === 'e588a55546b2f967753acf659e32c423adfbd99240f3f5fa6e76870f0bb16fe1'
    }

    get asV1020000(): {redeemId: Uint8Array, redeemer: Uint8Array, vaultId: v1020000.VaultId, slashedAmount: bigint, status: v1020000.RedeemRequestStatus} {
        assert(this.isV1020000)
        return this._chain.decodeEvent(this.event)
    }

    get isV1021000(): boolean {
        return this._chain.getEventHash('Redeem.CancelRedeem') === '50997fa631afb688abb9c84e40bd94f39283369a9def206875d1296f18132908'
    }

    get asV1021000(): {redeemId: Uint8Array, redeemer: Uint8Array, vaultId: v1021000.VaultId, slashedAmount: bigint, status: v1021000.RedeemRequestStatus} {
        assert(this.isV1021000)
        return this._chain.decodeEvent(this.event)
    }
}

export class RedeemExecuteRedeemEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Redeem.ExecuteRedeem')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1(): boolean {
        return this._chain.getEventHash('Redeem.ExecuteRedeem') === 'ddfb1e4049cf47af7a60ff62354633676032a50a91925f2082c4eb3bde2768b6'
    }

    get asV1(): [Uint8Array, Uint8Array, bigint, bigint, Uint8Array, bigint] {
        assert(this.isV1)
        return this._chain.decodeEvent(this.event)
    }

    get isV3(): boolean {
        return this._chain.getEventHash('Redeem.ExecuteRedeem') === 'd486dad84db93a7d3f91da2a18ae04af2545639363cda745a17ebed7036d2e9c'
    }

    get asV3(): [Uint8Array, Uint8Array, v3.VaultId, bigint, bigint, bigint] {
        assert(this.isV3)
        return this._chain.decodeEvent(this.event)
    }

    get isV4(): boolean {
        return this._chain.getEventHash('Redeem.ExecuteRedeem') === '71f10f3ec25532086f50343d63093a00e72db186ef2e33b65255616f082d200f'
    }

    get asV4(): {redeemId: Uint8Array, redeemer: Uint8Array, vaultId: v4.VaultId, amount: bigint, fee: bigint, transferFee: bigint} {
        assert(this.isV4)
        return this._chain.decodeEvent(this.event)
    }

    get isV6(): boolean {
        return this._chain.getEventHash('Redeem.ExecuteRedeem') === 'd866cd3743541e2d758c4af7f6b19a93f53432d1e291ab5f972f51278e09e9be'
    }

    get asV6(): {redeemId: Uint8Array, redeemer: Uint8Array, vaultId: v6.VaultId, amount: bigint, fee: bigint, transferFee: bigint} {
        assert(this.isV6)
        return this._chain.decodeEvent(this.event)
    }

    get isV15(): boolean {
        return this._chain.getEventHash('Redeem.ExecuteRedeem') === '1add2e320d4e7879c83a5b61c78afbb40f3b06b1529861420c662d5e8f47074f'
    }

    get asV15(): {redeemId: Uint8Array, redeemer: Uint8Array, vaultId: v15.VaultId, amount: bigint, fee: bigint, transferFee: bigint} {
        assert(this.isV15)
        return this._chain.decodeEvent(this.event)
    }

    get isV17(): boolean {
        return this._chain.getEventHash('Redeem.ExecuteRedeem') === 'd63793fdce1f0d01145e4515a95523737b88c284bd133a8238d7707855f20a21'
    }

    get asV17(): {redeemId: Uint8Array, redeemer: Uint8Array, vaultId: v17.VaultId, amount: bigint, fee: bigint, transferFee: bigint} {
        assert(this.isV17)
        return this._chain.decodeEvent(this.event)
    }

    get isV1020000(): boolean {
        return this._chain.getEventHash('Redeem.ExecuteRedeem') === '52d104143dd27fd30caca3096552668103193abf96c15c9ca745cbb177967bb1'
    }

    get asV1020000(): {redeemId: Uint8Array, redeemer: Uint8Array, vaultId: v1020000.VaultId, amount: bigint, fee: bigint, transferFee: bigint} {
        assert(this.isV1020000)
        return this._chain.decodeEvent(this.event)
    }

    get isV1021000(): boolean {
        return this._chain.getEventHash('Redeem.ExecuteRedeem') === '40f8d2284cd4d4115aed81f522e39b51bc2844785c71269b975923f80e3cb999'
    }

    get asV1021000(): {redeemId: Uint8Array, redeemer: Uint8Array, vaultId: v1021000.VaultId, amount: bigint, fee: bigint, transferFee: bigint} {
        assert(this.isV1021000)
        return this._chain.decodeEvent(this.event)
    }
}

export class RedeemRedeemPeriodChangeEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Redeem.RedeemPeriodChange')
        this._chain = ctx._chain
        this.event = event
    }

    get isV16(): boolean {
        return this._chain.getEventHash('Redeem.RedeemPeriodChange') === 'e4e1ffe21a95b5f4c933e4d40a2443e9cc2637c056d780de97e2e7ad5f6a7f59'
    }

    get asV16(): {period: number} {
        assert(this.isV16)
        return this._chain.decodeEvent(this.event)
    }
}

export class RedeemRequestRedeemEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Redeem.RequestRedeem')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1(): boolean {
        return this._chain.getEventHash('Redeem.RequestRedeem') === '81823d5f002d4abd37440214d62ca6d45cf6ac6c990c7ec75cdf943033cb1aa4'
    }

    get asV1(): [Uint8Array, Uint8Array, bigint, bigint, bigint, Uint8Array, v1.BtcAddress, bigint] {
        assert(this.isV1)
        return this._chain.decodeEvent(this.event)
    }

    get isV3(): boolean {
        return this._chain.getEventHash('Redeem.RequestRedeem') === '00f0390f090638413071af8a3513fa634f5bbd7998c02463b97c202d60cdebab'
    }

    get asV3(): [Uint8Array, Uint8Array, bigint, bigint, bigint, v3.VaultId, v3.Address, bigint] {
        assert(this.isV3)
        return this._chain.decodeEvent(this.event)
    }

    get isV4(): boolean {
        return this._chain.getEventHash('Redeem.RequestRedeem') === '423aeee4c7ec57cfdce2842172b18028dc0e5a2872fad702678fab4f0fa3f6f4'
    }

    get asV4(): {redeemId: Uint8Array, redeemer: Uint8Array, vaultId: v4.VaultId, amount: bigint, fee: bigint, premium: bigint, btcAddress: v4.Address, transferFee: bigint} {
        assert(this.isV4)
        return this._chain.decodeEvent(this.event)
    }

    get isV6(): boolean {
        return this._chain.getEventHash('Redeem.RequestRedeem') === 'e3bde9efd5b43fb6a668be1e1f03cf5597d32f17243cc0c8dc3caf80e9d481a7'
    }

    get asV6(): {redeemId: Uint8Array, redeemer: Uint8Array, vaultId: v6.VaultId, amount: bigint, fee: bigint, premium: bigint, btcAddress: v6.Address, transferFee: bigint} {
        assert(this.isV6)
        return this._chain.decodeEvent(this.event)
    }

    get isV15(): boolean {
        return this._chain.getEventHash('Redeem.RequestRedeem') === '4d144a1c040e0d84dc42a910a9062493a167635c8cc57caa9564f0944d4f1fd5'
    }

    get asV15(): {redeemId: Uint8Array, redeemer: Uint8Array, vaultId: v15.VaultId, amount: bigint, fee: bigint, premium: bigint, btcAddress: v15.Address, transferFee: bigint} {
        assert(this.isV15)
        return this._chain.decodeEvent(this.event)
    }

    get isV17(): boolean {
        return this._chain.getEventHash('Redeem.RequestRedeem') === '90a5e843b2f541203e4741dc0f7e19b922501aae7a1358ea8926a4ab6207281a'
    }

    get asV17(): {redeemId: Uint8Array, redeemer: Uint8Array, vaultId: v17.VaultId, amount: bigint, fee: bigint, premium: bigint, btcAddress: v17.Address, transferFee: bigint} {
        assert(this.isV17)
        return this._chain.decodeEvent(this.event)
    }

    get isV1020000(): boolean {
        return this._chain.getEventHash('Redeem.RequestRedeem') === 'b8fb34832c20f92a949ec91095756dec8bfba2d0bd2c4732fe3770cede05c39e'
    }

    get asV1020000(): {redeemId: Uint8Array, redeemer: Uint8Array, vaultId: v1020000.VaultId, amount: bigint, fee: bigint, premium: bigint, btcAddress: v1020000.Address, transferFee: bigint} {
        assert(this.isV1020000)
        return this._chain.decodeEvent(this.event)
    }

    get isV1021000(): boolean {
        return this._chain.getEventHash('Redeem.RequestRedeem') === 'f9fd197423a3ce2b1e73fd9f7c79c7144de5f9bb88d26991d2e3542c3c353d72'
    }

    get asV1021000(): {redeemId: Uint8Array, redeemer: Uint8Array, vaultId: v1021000.VaultId, amount: bigint, fee: bigint, premium: bigint, btcAddress: v1021000.Address, transferFee: bigint} {
        assert(this.isV1021000)
        return this._chain.decodeEvent(this.event)
    }
}

export class SecurityUpdateActiveBlockEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Security.UpdateActiveBlock')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1(): boolean {
        return this._chain.getEventHash('Security.UpdateActiveBlock') === '0a0f30b1ade5af5fade6413c605719d59be71340cf4884f65ee9858eb1c38f6c'
    }

    get asV1(): number {
        assert(this.isV1)
        return this._chain.decodeEvent(this.event)
    }

    get isV4(): boolean {
        return this._chain.getEventHash('Security.UpdateActiveBlock') === '7eefc4ef9a2f34cfee29738715aa72fe2a31ffd39b1d2a62f1cef547b70ed1fd'
    }

    get asV4(): {blockNumber: number} {
        assert(this.isV4)
        return this._chain.decodeEvent(this.event)
    }
}

export class TokensTransferEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'Tokens.Transfer')
        this._chain = ctx._chain
        this.event = event
    }

    /**
     *  Transfer succeeded. \[currency_id, from, to, value\]
     */
    get isV1(): boolean {
        return this._chain.getEventHash('Tokens.Transfer') === '687592af47ed25da7cb1782c7d3ab850f2643203e3a3d46a2f3f2413ed94da71'
    }

    /**
     *  Transfer succeeded. \[currency_id, from, to, value\]
     */
    get asV1(): [v1.CurrencyId, Uint8Array, Uint8Array, bigint] {
        assert(this.isV1)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Transfer succeeded. \[currency_id, from, to, value\]
     */
    get isV6(): boolean {
        return this._chain.getEventHash('Tokens.Transfer') === 'fdaae151bb8b36a8d8ad740d8c981614f3554e661a6028bab9b8ca624adaac32'
    }

    /**
     * Transfer succeeded. \[currency_id, from, to, value\]
     */
    get asV6(): [v6.CurrencyId, Uint8Array, Uint8Array, bigint] {
        assert(this.isV6)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Transfer succeeded.
     */
    get isV10(): boolean {
        return this._chain.getEventHash('Tokens.Transfer') === 'b10834d910d905da35363fe42f3bbd9db5dfbc13064a482a7c8c57bb3c9a8e68'
    }

    /**
     * Transfer succeeded.
     */
    get asV10(): {currencyId: v10.CurrencyId, from: Uint8Array, to: Uint8Array, amount: bigint} {
        assert(this.isV10)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Transfer succeeded.
     */
    get isV15(): boolean {
        return this._chain.getEventHash('Tokens.Transfer') === '41417e5ccc760096c9529f3ff9dcfe27e94b23a733432b671ed451e2ff362dcc'
    }

    /**
     * Transfer succeeded.
     */
    get asV15(): {currencyId: v15.CurrencyId, from: Uint8Array, to: Uint8Array, amount: bigint} {
        assert(this.isV15)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Transfer succeeded.
     */
    get isV17(): boolean {
        return this._chain.getEventHash('Tokens.Transfer') === '7e7dbd0d1749f3d1ce62a6cb731a143be6c8c24d291fdd7dc24892ff941ffe3b'
    }

    /**
     * Transfer succeeded.
     */
    get asV17(): {currencyId: v17.CurrencyId, from: Uint8Array, to: Uint8Array, amount: bigint} {
        assert(this.isV17)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Transfer succeeded.
     */
    get isV1020000(): boolean {
        return this._chain.getEventHash('Tokens.Transfer') === '45de1d47a24087e8694b4f1809c3782f0c29a2ccc42887024b90a3398bbe8063'
    }

    /**
     * Transfer succeeded.
     */
    get asV1020000(): {currencyId: v1020000.CurrencyId, from: Uint8Array, to: Uint8Array, amount: bigint} {
        assert(this.isV1020000)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * Transfer succeeded.
     */
    get isV1021000(): boolean {
        return this._chain.getEventHash('Tokens.Transfer') === '5fa37394cd49239132e12119aa3235e9388bd39b34d6eb233ef3bcb42ea1bc9e'
    }

    /**
     * Transfer succeeded.
     */
    get asV1021000(): {currencyId: v1021000.CurrencyId, from: Uint8Array, to: Uint8Array, amount: bigint} {
        assert(this.isV1021000)
        return this._chain.decodeEvent(this.event)
    }
}

export class VaultRegistryDecreaseLockedCollateralEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'VaultRegistry.DecreaseLockedCollateral')
        this._chain = ctx._chain
        this.event = event
    }

    get isV10(): boolean {
        return this._chain.getEventHash('VaultRegistry.DecreaseLockedCollateral') === 'be9cf79f2b95aaa0202d8d1315c938807e1b08b7c78db73bafafd265384acc68'
    }

    get asV10(): {currencyPair: v10.VaultCurrencyPair, delta: bigint, total: bigint} {
        assert(this.isV10)
        return this._chain.decodeEvent(this.event)
    }

    get isV15(): boolean {
        return this._chain.getEventHash('VaultRegistry.DecreaseLockedCollateral') === '013307983c6902ec09af3b8afd9dc1ae6163a72a56585cec1235ec83322aedbb'
    }

    get asV15(): {currencyPair: v15.VaultCurrencyPair, delta: bigint, total: bigint} {
        assert(this.isV15)
        return this._chain.decodeEvent(this.event)
    }

    get isV17(): boolean {
        return this._chain.getEventHash('VaultRegistry.DecreaseLockedCollateral') === '1b67d1d86e1332ee8bb03735b995c67676bbcedc0903eb4d04ca74c4d4a61280'
    }

    get asV17(): {currencyPair: v17.VaultCurrencyPair, delta: bigint, total: bigint} {
        assert(this.isV17)
        return this._chain.decodeEvent(this.event)
    }

    get isV1020000(): boolean {
        return this._chain.getEventHash('VaultRegistry.DecreaseLockedCollateral') === '059d867cf19d28c1711a39fcd65519b4910b3e6856410c8a1413bc21251a16c4'
    }

    get asV1020000(): {currencyPair: v1020000.VaultCurrencyPair, delta: bigint, total: bigint} {
        assert(this.isV1020000)
        return this._chain.decodeEvent(this.event)
    }

    get isV1021000(): boolean {
        return this._chain.getEventHash('VaultRegistry.DecreaseLockedCollateral') === '89961f80f5af907a2c96f81fb5378d76469632ed1024f33ed125a304b195df11'
    }

    get asV1021000(): {currencyPair: v1021000.VaultCurrencyPair, delta: bigint, total: bigint} {
        assert(this.isV1021000)
        return this._chain.decodeEvent(this.event)
    }
}

export class VaultRegistryIncreaseLockedCollateralEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'VaultRegistry.IncreaseLockedCollateral')
        this._chain = ctx._chain
        this.event = event
    }

    get isV10(): boolean {
        return this._chain.getEventHash('VaultRegistry.IncreaseLockedCollateral') === 'be9cf79f2b95aaa0202d8d1315c938807e1b08b7c78db73bafafd265384acc68'
    }

    get asV10(): {currencyPair: v10.VaultCurrencyPair, delta: bigint, total: bigint} {
        assert(this.isV10)
        return this._chain.decodeEvent(this.event)
    }

    get isV15(): boolean {
        return this._chain.getEventHash('VaultRegistry.IncreaseLockedCollateral') === '013307983c6902ec09af3b8afd9dc1ae6163a72a56585cec1235ec83322aedbb'
    }

    get asV15(): {currencyPair: v15.VaultCurrencyPair, delta: bigint, total: bigint} {
        assert(this.isV15)
        return this._chain.decodeEvent(this.event)
    }

    get isV17(): boolean {
        return this._chain.getEventHash('VaultRegistry.IncreaseLockedCollateral') === '1b67d1d86e1332ee8bb03735b995c67676bbcedc0903eb4d04ca74c4d4a61280'
    }

    get asV17(): {currencyPair: v17.VaultCurrencyPair, delta: bigint, total: bigint} {
        assert(this.isV17)
        return this._chain.decodeEvent(this.event)
    }

    get isV1020000(): boolean {
        return this._chain.getEventHash('VaultRegistry.IncreaseLockedCollateral') === '059d867cf19d28c1711a39fcd65519b4910b3e6856410c8a1413bc21251a16c4'
    }

    get asV1020000(): {currencyPair: v1020000.VaultCurrencyPair, delta: bigint, total: bigint} {
        assert(this.isV1020000)
        return this._chain.decodeEvent(this.event)
    }

    get isV1021000(): boolean {
        return this._chain.getEventHash('VaultRegistry.IncreaseLockedCollateral') === '89961f80f5af907a2c96f81fb5378d76469632ed1024f33ed125a304b195df11'
    }

    get asV1021000(): {currencyPair: v1021000.VaultCurrencyPair, delta: bigint, total: bigint} {
        assert(this.isV1021000)
        return this._chain.decodeEvent(this.event)
    }
}

export class VaultRegistryRegisterVaultEvent {
    private readonly _chain: Chain
    private readonly event: Event

    constructor(ctx: EventContext)
    constructor(ctx: ChainContext, event: Event)
    constructor(ctx: EventContext, event?: Event) {
        event = event || ctx.event
        assert(event.name === 'VaultRegistry.RegisterVault')
        this._chain = ctx._chain
        this.event = event
    }

    get isV1(): boolean {
        return this._chain.getEventHash('VaultRegistry.RegisterVault') === '23bebce4ca9ed37548947d07d4dc50e772f07401b9a416b6aa2f3e9cb5adcaf4'
    }

    get asV1(): [Uint8Array, bigint] {
        assert(this.isV1)
        return this._chain.decodeEvent(this.event)
    }

    /**
     * vault_id, collateral, currency_id
     */
    get isV3(): boolean {
        return this._chain.getEventHash('VaultRegistry.RegisterVault') === '4a277edde21dc22e91d2dc0f66237b50fa032b22bbe1217a53b1d3b6a542455f'
    }

    /**
     * vault_id, collateral, currency_id
     */
    get asV3(): [v3.VaultId, bigint] {
        assert(this.isV3)
        return this._chain.decodeEvent(this.event)
    }

    get isV4(): boolean {
        return this._chain.getEventHash('VaultRegistry.RegisterVault') === 'e7b0c0fa9c6583c77269fade548405e48dcd74c2d2936924cc4d69b586e89abf'
    }

    get asV4(): {vaultId: v4.VaultId, collateral: bigint} {
        assert(this.isV4)
        return this._chain.decodeEvent(this.event)
    }

    get isV6(): boolean {
        return this._chain.getEventHash('VaultRegistry.RegisterVault') === '5904f13017c5e67059776b0b8a1753f7ef6b3058be145bf32edc2074727f0f31'
    }

    get asV6(): {vaultId: v6.VaultId, collateral: bigint} {
        assert(this.isV6)
        return this._chain.decodeEvent(this.event)
    }

    get isV15(): boolean {
        return this._chain.getEventHash('VaultRegistry.RegisterVault') === '4cbc2ca3411358adf016c880b9989dfbc8726729eb8f2cc0de2e27a21b93ab8b'
    }

    get asV15(): {vaultId: v15.VaultId, collateral: bigint} {
        assert(this.isV15)
        return this._chain.decodeEvent(this.event)
    }

    get isV17(): boolean {
        return this._chain.getEventHash('VaultRegistry.RegisterVault') === 'f1a397e34fa2b35cf9f2efc2cd39d51e3a638ef819dd4554b3d4e5af26e5b4d1'
    }

    get asV17(): {vaultId: v17.VaultId, collateral: bigint} {
        assert(this.isV17)
        return this._chain.decodeEvent(this.event)
    }

    get isV1020000(): boolean {
        return this._chain.getEventHash('VaultRegistry.RegisterVault') === 'fa7c86fb04aaa5d94e80d2e2c3fc81d189532849207835713092ecb8d16f7b06'
    }

    get asV1020000(): {vaultId: v1020000.VaultId, collateral: bigint} {
        assert(this.isV1020000)
        return this._chain.decodeEvent(this.event)
    }

    get isV1021000(): boolean {
        return this._chain.getEventHash('VaultRegistry.RegisterVault') === '0bab47777d6aabc29173eea539fd81e8c4eff3f83a3f6d936030f620cad87d0a'
    }

    get asV1021000(): {vaultId: v1021000.VaultId, collateral: bigint} {
        assert(this.isV1021000)
        return this._chain.decodeEvent(this.event)
    }
}
