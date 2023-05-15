// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { NodePrimitivesCurrencyCurrencyId } from '@bifrost-finance/types/interfaces/primitives';
import type { ApiTypes } from '@polkadot/api-base/types';
import type { u32 } from '@polkadot/types-codec';
import type { Codec } from '@polkadot/types-codec/types';

declare module '@polkadot/api-base/types/consts' {
  export interface AugmentedConsts<ApiType extends ApiTypes> {
    currencies: {
      getNativeCurrencyId: NodePrimitivesCurrencyCurrencyId & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
    tokens: {
      maxLocks: u32 & AugmentedConst<ApiType>;
      /**
       * The maximum number of named reserves that can exist on an account.
       **/
      maxReserves: u32 & AugmentedConst<ApiType>;
      /**
       * Generic const
       **/
      [key: string]: Codec;
    };
  } // AugmentedConsts
} // declare module
