// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Bytes, Enum, Struct, i32 } from '@polkadot/types';
import type { Failed, MultiSig } from '@bifrost-finance/types/interfaces/bridgeEos';
import type { AccountId, AssetId } from '@polkadot/types/interfaces/runtime';

/** @name IostAction */
export interface IostAction extends Struct {
  readonly contract: Bytes;
  readonly action_name: Bytes;
  readonly data: Bytes;
}

/** @name IostMultiSigTx */
export interface IostMultiSigTx extends Struct {
  readonly chain_id: i32;
  readonly raw_tx: Bytes;
  readonly multi_sig: MultiSig;
  readonly action: IostAction;
  readonly from: AccountId;
  readonly asset_id: AssetId;
}

/** @name IostTxOut */
export interface IostTxOut extends Enum {
  readonly isInitial: boolean;
  readonly asInitial: IostMultiSigTx;
  readonly isGenerated: boolean;
  readonly asGenerated: IostMultiSigTx;
  readonly isSigned: boolean;
  readonly asSigned: IostMultiSigTx;
  readonly isProcessing: boolean;
  readonly asProcessing: Processing;
  readonly isSuccess: boolean;
  readonly asSuccess: Bytes;
  readonly isFail: boolean;
  readonly asFail: Failed;
}

/** @name Processing */
export interface Processing extends Struct {
  readonly tx_id: Bytes;
  readonly multi_sig_tx: IostMultiSigTx;
}

export type PHANTOM_BRIDGEIOST = 'bridgeIost';
