// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { NodePrimitivesCurrencyCurrencyId, OrmlTokensAccountData, OrmlTokensBalanceLock, OrmlTokensReserveData } from '@bifrost-finance/types/interfaces/primitives';
import type { AccountId32 } from '@bifrost-finance/types/interfaces/runtime';
import type { ApiTypes } from '@polkadot/api-base/types';
import type { Vec, u128 } from '@polkadot/types-codec';
import type { Observable } from '@polkadot/types/types';

declare module '@polkadot/api-base/types/storage' {
  export interface AugmentedQueries<ApiType extends ApiTypes> {
    tokens: {
      /**
       * The balance of a token type under an account.
       * 
       * NOTE: If the total is ever zero, decrease account ref account.
       * 
       * NOTE: This is only used in the case that this module is used to store
       * balances.
       **/
      accounts: AugmentedQuery<ApiType, (arg1: AccountId32 | string | Uint8Array, arg2: NodePrimitivesCurrencyCurrencyId | { Native: any } | { VToken: any } | { Token: any } | { Stable: any } | { VSToken: any } | { VSBond: any } | { LPToken: any } | { ForeignAsset: any } | { Token2: any } | { VToken2: any } | { VSToken2: any } | { VSBond2: any } | { StableLpToken: any } | string | Uint8Array) => Observable<OrmlTokensAccountData>, [AccountId32, NodePrimitivesCurrencyCurrencyId]> & QueryableStorageEntry<ApiType, [AccountId32, NodePrimitivesCurrencyCurrencyId]>;
      /**
       * Any liquidity locks of a token type under an account.
       * NOTE: Should only be accessed when setting, changing and freeing a lock.
       **/
      locks: AugmentedQuery<ApiType, (arg1: AccountId32 | string | Uint8Array, arg2: NodePrimitivesCurrencyCurrencyId | { Native: any } | { VToken: any } | { Token: any } | { Stable: any } | { VSToken: any } | { VSBond: any } | { LPToken: any } | { ForeignAsset: any } | { Token2: any } | { VToken2: any } | { VSToken2: any } | { VSBond2: any } | { StableLpToken: any } | string | Uint8Array) => Observable<Vec<OrmlTokensBalanceLock>>, [AccountId32, NodePrimitivesCurrencyCurrencyId]> & QueryableStorageEntry<ApiType, [AccountId32, NodePrimitivesCurrencyCurrencyId]>;
      /**
       * Named reserves on some account balances.
       **/
      reserves: AugmentedQuery<ApiType, (arg1: AccountId32 | string | Uint8Array, arg2: NodePrimitivesCurrencyCurrencyId | { Native: any } | { VToken: any } | { Token: any } | { Stable: any } | { VSToken: any } | { VSBond: any } | { LPToken: any } | { ForeignAsset: any } | { Token2: any } | { VToken2: any } | { VSToken2: any } | { VSBond2: any } | { StableLpToken: any } | string | Uint8Array) => Observable<Vec<OrmlTokensReserveData>>, [AccountId32, NodePrimitivesCurrencyCurrencyId]> & QueryableStorageEntry<ApiType, [AccountId32, NodePrimitivesCurrencyCurrencyId]>;
      /**
       * The total issuance of a token type.
       **/
      totalIssuance: AugmentedQuery<ApiType, (arg: NodePrimitivesCurrencyCurrencyId | { Native: any } | { VToken: any } | { Token: any } | { Stable: any } | { VSToken: any } | { VSBond: any } | { LPToken: any } | { ForeignAsset: any } | { Token2: any } | { VToken2: any } | { VSToken2: any } | { VSBond2: any } | { StableLpToken: any } | string | Uint8Array) => Observable<u128>, [NodePrimitivesCurrencyCurrencyId]> & QueryableStorageEntry<ApiType, [NodePrimitivesCurrencyCurrencyId]>;
      /**
       * Generic query
       **/
      [key: string]: QueryableStorageEntry<ApiType>;
    };
  } // AugmentedQueries
} // declare module
