import type {Result, Option} from './support'

export type CurrencyId = CurrencyId_Token

export interface CurrencyId_Token {
    __kind: 'Token'
    value: TokenSymbol
}

export interface VaultCurrencyPair {
    collateral: CurrencyId
    wrapped: CurrencyId
}

export type TokenSymbol = TokenSymbol_DOT | TokenSymbol_INTERBTC | TokenSymbol_INTR | TokenSymbol_KSM | TokenSymbol_KBTC | TokenSymbol_KINT

export interface TokenSymbol_DOT {
    __kind: 'DOT'
}

export interface TokenSymbol_INTERBTC {
    __kind: 'INTERBTC'
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
