import type {Result, Option} from './support'

export type CurrencyId = CurrencyId_Token | CurrencyId_ForeignAsset | CurrencyId_LendToken | CurrencyId_LpToken | CurrencyId_StableLpToken

export interface CurrencyId_Token {
    __kind: 'Token'
    value: TokenSymbol
}

export interface CurrencyId_ForeignAsset {
    __kind: 'ForeignAsset'
    value: number
}

export interface CurrencyId_LendToken {
    __kind: 'LendToken'
    value: number
}

export interface CurrencyId_LpToken {
    __kind: 'LpToken'
    value: [LpToken, LpToken]
}

export interface CurrencyId_StableLpToken {
    __kind: 'StableLpToken'
    value: number
}

export interface VaultId {
    accountId: Uint8Array
    currencies: VaultCurrencyPair
}

export type Address = Address_P2PKH | Address_P2SH | Address_P2WPKHv0 | Address_P2WSHv0

export interface Address_P2PKH {
    __kind: 'P2PKH'
    value: Uint8Array
}

export interface Address_P2SH {
    __kind: 'P2SH'
    value: Uint8Array
}

export interface Address_P2WPKHv0 {
    __kind: 'P2WPKHv0'
    value: Uint8Array
}

export interface Address_P2WSHv0 {
    __kind: 'P2WSHv0'
    value: Uint8Array
}

export interface Market {
    collateralFactor: number
    liquidationThreshold: number
    reserveFactor: number
    closeFactor: number
    liquidateIncentive: bigint
    liquidateIncentiveReservedFactor: number
    rateModel: InterestRateModel
    state: MarketState
    supplyCap: bigint
    borrowCap: bigint
    lendTokenId: CurrencyId
}

export type Key = Key_ExchangeRate | Key_FeeEstimation

export interface Key_ExchangeRate {
    __kind: 'ExchangeRate'
    value: CurrencyId
}

export interface Key_FeeEstimation {
    __kind: 'FeeEstimation'
}

export type RedeemRequestStatus = RedeemRequestStatus_Pending | RedeemRequestStatus_Completed | RedeemRequestStatus_Reimbursed | RedeemRequestStatus_Retried

export interface RedeemRequestStatus_Pending {
    __kind: 'Pending'
}

export interface RedeemRequestStatus_Completed {
    __kind: 'Completed'
}

export interface RedeemRequestStatus_Reimbursed {
    __kind: 'Reimbursed'
    value: boolean
}

export interface RedeemRequestStatus_Retried {
    __kind: 'Retried'
}

export interface VaultCurrencyPair {
    collateral: CurrencyId
    wrapped: CurrencyId
}

export type PairStatus = PairStatus_Trading | PairStatus_Bootstrap | PairStatus_Disable

export interface PairStatus_Trading {
    __kind: 'Trading'
    value: PairMetadata
}

export interface PairStatus_Bootstrap {
    __kind: 'Bootstrap'
    value: BootstrapParameter
}

export interface PairStatus_Disable {
    __kind: 'Disable'
}

export type Pool = Pool_Base | Pool_Meta

export interface Pool_Base {
    __kind: 'Base'
    value: BasePool
}

export interface Pool_Meta {
    __kind: 'Meta'
    value: MetaPool
}

export type TokenSymbol = TokenSymbol_DOT | TokenSymbol_IBTC | TokenSymbol_INTR | TokenSymbol_KSM | TokenSymbol_KBTC | TokenSymbol_KINT

export interface TokenSymbol_DOT {
    __kind: 'DOT'
}

export interface TokenSymbol_IBTC {
    __kind: 'IBTC'
}

export interface TokenSymbol_INTR {
    __kind: 'INTR'
}

export interface TokenSymbol_KSM {
    __kind: 'KSM'
}

export interface TokenSymbol_KBTC {
    __kind: 'KBTC'
}

export interface TokenSymbol_KINT {
    __kind: 'KINT'
}

export type LpToken = LpToken_Token | LpToken_ForeignAsset | LpToken_StableLpToken

export interface LpToken_Token {
    __kind: 'Token'
    value: TokenSymbol
}

export interface LpToken_ForeignAsset {
    __kind: 'ForeignAsset'
    value: number
}

export interface LpToken_StableLpToken {
    __kind: 'StableLpToken'
    value: number
}

export type InterestRateModel = InterestRateModel_Jump | InterestRateModel_Curve

export interface InterestRateModel_Jump {
    __kind: 'Jump'
    value: JumpModel
}

export interface InterestRateModel_Curve {
    __kind: 'Curve'
    value: CurveModel
}

export type MarketState = MarketState_Active | MarketState_Pending | MarketState_Supervision

export interface MarketState_Active {
    __kind: 'Active'
}

export interface MarketState_Pending {
    __kind: 'Pending'
}

export interface MarketState_Supervision {
    __kind: 'Supervision'
}

export interface PairMetadata {
    pairAccount: Uint8Array
    totalSupply: bigint
    feeRate: bigint
}

export interface BootstrapParameter {
    targetSupply: [bigint, bigint]
    capacitySupply: [bigint, bigint]
    accumulatedSupply: [bigint, bigint]
    endBlockNumber: number
    pairAccount: Uint8Array
}

export interface BasePool {
    currencyIds: CurrencyId[]
    lpCurrencyId: CurrencyId
    tokenMultipliers: bigint[]
    balances: bigint[]
    fee: bigint
    adminFee: bigint
    initialA: bigint
    futureA: bigint
    initialATime: bigint
    futureATime: bigint
    account: Uint8Array
    adminFeeReceiver: Uint8Array
    lpCurrencySymbol: Uint8Array
    lpCurrencyDecimal: number
}

export interface MetaPool {
    basePoolId: number
    baseVirtualPrice: bigint
    baseCacheLastUpdated: bigint
    baseCurrencies: CurrencyId[]
    info: BasePool
}

export interface JumpModel {
    baseRate: bigint
    jumpRate: bigint
    fullRate: bigint
    jumpUtilization: number
}

export interface CurveModel {
    baseRate: bigint
}
