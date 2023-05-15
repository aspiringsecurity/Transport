// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Balance, BlockNumber } from '@bifrost-finance/types/interfaces/runtime';
import type { Struct, u32 } from '@polkadot/types-codec';

/** @name BifrostVestingInfo */
export interface BifrostVestingInfo extends Struct {
  readonly locked: Balance;
  readonly per_block: Balance;
  readonly starting_block: BlockNumber;
}

/** @name MaxLocksOf */
export interface MaxLocksOf extends u32 {}

export type PHANTOM_VESTING = 'vesting';
