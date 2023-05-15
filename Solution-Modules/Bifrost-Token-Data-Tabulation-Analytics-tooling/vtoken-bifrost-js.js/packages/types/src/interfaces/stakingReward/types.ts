// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { AccountId, Balance } from '@bifrost-finance/types/interfaces/runtime';
import type { Struct } from '@polkadot/types-codec';

/** @name RewardRecord */
export interface RewardRecord extends Struct {
  readonly account_id: AccountId;
  readonly record_amount: Balance;
}

export type PHANTOM_STAKINGREWARD = 'stakingReward';
