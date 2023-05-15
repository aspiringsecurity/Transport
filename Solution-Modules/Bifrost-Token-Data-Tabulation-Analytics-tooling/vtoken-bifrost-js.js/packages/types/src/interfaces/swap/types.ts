// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Struct, bool, u128, u32 } from '@polkadot/types';
import type { AccountId, AssetId, Balance } from '@polkadot/types/interfaces/runtime';

/** @name PoolCreateTokenDetails */
export interface PoolCreateTokenDetails extends Struct {
  readonly token_id: AssetId;
  readonly token_balance: Balance;
  readonly token_weight: PoolWeight;
}

/** @name PoolDetails */
export interface PoolDetails extends Struct {
  readonly owner: AccountId;
  readonly swap_fee_rate: SwapFee;
  readonly active: bool;
}

/** @name PoolId */
export interface PoolId extends u32 {}

/** @name PoolToken */
export interface PoolToken extends u128 {}

/** @name PoolWeight */
export interface PoolWeight extends Balance {}

/** @name SwapFee */
export interface SwapFee extends u128 {}

export type PHANTOM_SWAP = 'swap';
