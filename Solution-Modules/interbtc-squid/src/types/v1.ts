import type {Result, Option} from './support'

export type BtcAddress = BtcAddress_P2PKH | BtcAddress_P2SH | BtcAddress_P2WPKHv0 | BtcAddress_P2WSHv0

export interface BtcAddress_P2PKH {
    __kind: 'P2PKH'
    value: Uint8Array
}

export interface BtcAddress_P2SH {
    __kind: 'P2SH'
    value: Uint8Array
}

export interface BtcAddress_P2WPKHv0 {
    __kind: 'P2WPKHv0'
    value: Uint8Array
}

export interface BtcAddress_P2WSHv0 {
    __kind: 'P2WSHv0'
    value: Uint8Array
}

export type OracleKey = OracleKey_ExchangeRate | OracleKey_FeeEstimation

export interface OracleKey_ExchangeRate {
    __kind: 'ExchangeRate'
    value: CurrencyId
}

export interface OracleKey_FeeEstimation {
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

export type CurrencyId = CurrencyId_DOT | CurrencyId_INTERBTC | CurrencyId_INTR | CurrencyId_KSM | CurrencyId_KBTC | CurrencyId_KINT

export interface CurrencyId_DOT {
    __kind: 'DOT'
}

export interface CurrencyId_INTERBTC {
    __kind: 'INTERBTC'
}

export interface CurrencyId_INTR {
    __kind: 'INTR'
}

export interface CurrencyId_KSM {
    __kind: 'KSM'
}

export interface CurrencyId_KBTC {
    __kind: 'KBTC'
}

export interface CurrencyId_KINT {
    __kind: 'KINT'
}
