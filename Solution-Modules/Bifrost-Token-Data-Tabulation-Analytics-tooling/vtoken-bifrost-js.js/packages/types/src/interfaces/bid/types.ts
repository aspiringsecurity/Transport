// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Struct, u32, u64 } from '@polkadot/types';
import type { AccountId, AssetId, Balance, BlockNumber, Permill } from '@polkadot/types/interfaces/runtime';

/** @name BiddingOrderId */
export interface BiddingOrderId extends u64 {}

/** @name BiddingOrderUnit */
export interface BiddingOrderUnit extends Struct {
  readonly bidder_id: AccountId;
  readonly token_id: AssetId;
  readonly block_num: BlockNumber;
  readonly votes: Balance;
  readonly annual_roi: Permill;
  readonly validator: AccountId;
}

/** @name BiddingOrderUnitOf */
export interface BiddingOrderUnitOf extends BiddingOrderUnit {}

/** @name EraId */
export interface EraId extends u32 {}

/** @name RewardRecord */
export interface RewardRecord extends Struct {
  readonly account_id: AccountId;
  readonly record_amount: Balance;
}

export type PHANTOM_BID = 'bid';
