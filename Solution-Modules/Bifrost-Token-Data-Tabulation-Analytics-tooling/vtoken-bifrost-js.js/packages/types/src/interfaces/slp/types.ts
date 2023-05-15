// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { TimeUnit } from '@bifrost-finance/types/interfaces/primitives';
import type { AccountId, Balance } from '@bifrost-finance/types/interfaces/runtime';
import type { Struct, Vec } from '@polkadot/types-codec';
import type { MultiLocationV1 } from '@polkadot/types/interfaces/xcm';

/** @name FilecoinLedger */
export interface FilecoinLedger extends Struct {
  readonly account: MultiLocationV1;
  readonly initial_pledge: Balance;
}

/** @name FilecoinOwnerByMinerEntry */
export interface FilecoinOwnerByMinerEntry extends Struct {
  readonly currency_id: AccountId;
  readonly miner_id: MultiLocationV1;
  readonly owner_id: MultiLocationV1;
}

/** @name ledger */
export interface ledger extends Struct {
  readonly Substrate: SubstrateLedger;
}

/** @name SubstrateLedger */
export interface SubstrateLedger extends Struct {
  readonly account: AccountId;
  readonly total: Balance;
  readonly active: Balance;
  readonly unlocking: Vec<UnlockChunk>;
}

/** @name UnlockChunk */
export interface UnlockChunk extends Struct {
  readonly value: Balance;
  readonly unlock_time: TimeUnit;
}

export type PHANTOM_SLP = 'slp';
