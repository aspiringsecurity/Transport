// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { CurrencyId } from '@bifrost-finance/types/interfaces/primitives';
import type { Balance } from '@bifrost-finance/types/interfaces/runtime';
import type { Struct } from '@polkadot/types-codec';

/** @name BancorPool */
export interface BancorPool extends Struct {
  readonly currency_id: CurrencyId;
  readonly token_pool: Balance;
  readonly vstoken_pool: Balance;
  readonly token_ceiling: Balance;
  readonly token_base_supply: Balance;
  readonly vstoken_base_supply: Balance;
}

export type PHANTOM_BANCOR = 'bancor';
