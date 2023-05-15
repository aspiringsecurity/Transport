// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { CurrencyId } from '@bifrost-finance/types/interfaces/primitives';
import type { AccountId, Balance, BlockNumber, FixedU128 } from '@bifrost-finance/types/interfaces/runtime';
import type { BTreeMap, Enum, Option, Struct, Vec, u32 } from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';

/** @name DepositData */
export interface DepositData extends Struct {
  readonly deposit: Balance;
  readonly gain_avgs: BTreeMap<CurrencyId, FixedU128>;
  readonly update_b: BlockNumber;
  readonly pending_unlocks: Vec<ITuple<[BlockNumber, Balance]>>;
}

/** @name PoolId */
export interface PoolId extends u32 {}

/** @name PoolInfo */
export interface PoolInfo extends Struct {
  readonly pool_id: PoolId;
  readonly keeper: AccountId;
  readonly investor: Option<AccountId>;
  readonly trading_pair: ITuple<[CurrencyId, CurrencyId]>;
  readonly duration: BlockNumber;
  readonly type: PoolType;
  readonly min_deposit_to_start: Balance;
  readonly after_block_to_start: BlockNumber;
  readonly deposit: Balance;
  readonly rewards: BTreeMap<CurrencyId, RewardData>;
  readonly update_b: BlockNumber;
  readonly state: PoolState;
  readonly block_startup: Option<BlockNumber>;
  readonly redeem_limit_time: BlockNumber;
  readonly unlock_limit_nums: u32;
  readonly pending_unlock_nums: u32;
}

/** @name PoolState */
export interface PoolState extends Enum {
  readonly isUnCharged: boolean;
  readonly isCharged: boolean;
  readonly isOngoing: boolean;
  readonly isRetired: boolean;
  readonly isDead: boolean;
  readonly type: 'UnCharged' | 'Charged' | 'Ongoing' | 'Retired' | 'Dead';
}

/** @name PoolType */
export interface PoolType extends Enum {
  readonly isMining: boolean;
  readonly isFarming: boolean;
  readonly isEbFarming: boolean;
  readonly type: 'Mining' | 'Farming' | 'EbFarming';
}

/** @name RewardData */
export interface RewardData extends Struct {
  readonly total: Balance;
  readonly per_block: Balance;
  readonly claimed: Balance;
  readonly gain_avg: FixedU128;
}

export type PHANTOM_LIQUIDITYMINING = 'liquidityMining';
