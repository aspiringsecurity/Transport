// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Bytes, Enum, Option, Struct, U8aFixed, Vec, u16, u32, u64, u8 } from '@polkadot/types';
import type { ITuple } from '@polkadot/types/types';
import type { AccountId, AssetId } from '@polkadot/types/interfaces/runtime';

/** @name AccountName */
export interface AccountName extends u64 {}

/** @name Action */
export interface Action extends Struct {
  readonly account: AccountName;
  readonly name: ActionName;
  readonly authorization: Vec<PermissionLevel>;
  readonly data: Bytes;
}

/** @name ActionName */
export interface ActionName extends u64 {}

/** @name ActionReceipt */
export interface ActionReceipt extends Struct {
  readonly receiver: AccountName;
  readonly act_digest: Checksum256;
  readonly global_sequence: u64;
  readonly recv_sequence: u64;
  readonly auth_sequence: FlatMap;
  readonly code_sequence: UnsignedInt;
  readonly abi_sequence: UnsignedInt;
}

/** @name BlockchainType */
export interface BlockchainType extends Enum {
  readonly isBifrost: boolean;
  readonly isEos: boolean;
  readonly isIost: boolean;
}

/** @name BlockHeader */
export interface BlockHeader extends Struct {
  readonly timestamp: BlockTimestamp;
  readonly producer: AccountName;
  readonly confirmed: u16;
  readonly previous: Checksum256;
  readonly transaction_mroot: Checksum256;
  readonly action_mroot: Checksum256;
  readonly schedule_version: u32;
  readonly new_producers: Option<ProducerSchedule>;
  readonly header_extensions: Vec<Extension>;
}

/** @name BlockSigningAuthority */
export interface BlockSigningAuthority extends ITuple<[UnsignedInt, BlockSigningAuthorityV0]> {}

/** @name BlockSigningAuthorityV0 */
export interface BlockSigningAuthorityV0 extends Struct {
  readonly threshold: u32;
  readonly keyWeights: Vec<KeyWeight>;
}

/** @name BlockTimestamp */
export interface BlockTimestamp extends u32 {}

/** @name BridgeAssetSymbol */
export interface BridgeAssetSymbol extends Struct {
  readonly blockchain: BlockchainType;
  readonly symbol: Bytes;
  readonly precision: Precision;
}

/** @name bridgeEosSignature */
export interface bridgeEosSignature extends Struct {
  readonly type_: UnsignedInt;
  readonly data: U8aFixed;
}

/** @name Checksum256 */
export interface Checksum256 extends U8aFixed {}

/** @name Checksum256Array */
export interface Checksum256Array extends Vec<Checksum256> {}

/** @name Extension */
export interface Extension extends ITuple<[u16, Bytes]> {}

/** @name Failed */
export interface Failed extends Struct {
  readonly tx_id: Bytes;
  readonly reason: Bytes;
}

/** @name FlatMap */
export interface FlatMap extends Struct {
  readonly map: Vec<ITuple<[ActionName, u64]>>;
}

/** @name IncrementalMerkle */
export interface IncrementalMerkle extends Struct {
  readonly _node_count: u64;
  readonly _active_nodes: Checksum256Array;
}

/** @name KeyWeight */
export interface KeyWeight extends Struct {
  readonly key: PublicKey;
  readonly weight: u16;
}

/** @name MultiSig */
export interface MultiSig extends Struct {
  readonly signatures: Vec<TxSig>;
  readonly threshold: u8;
}

/** @name MultiSigTx */
export interface MultiSigTx extends Struct {
  readonly chain_id: Bytes;
  readonly raw_tx: Bytes;
  readonly multi_sig: MultiSig;
  readonly action: Action;
  readonly from: AccountId;
  readonly asset_id: AssetId;
}

/** @name PermissionLevel */
export interface PermissionLevel extends Struct {
  readonly actor: AccountName;
  readonly permission: PermissionName;
}

/** @name PermissionName */
export interface PermissionName extends u64 {}

/** @name Precision */
export interface Precision extends u32 {}

/** @name ProducerAuthority */
export interface ProducerAuthority extends Struct {
  readonly producer_name: ActionName;
  readonly authority: BlockSigningAuthority;
}

/** @name ProducerAuthoritySchedule */
export interface ProducerAuthoritySchedule extends Struct {
  readonly version: u32;
  readonly producers: Vec<ProducerAuthority>;
}

/** @name ProducerKey */
export interface ProducerKey extends Struct {
  readonly producer_name: AccountName;
  readonly block_signing_key: PublicKey;
}

/** @name ProducerSchedule */
export interface ProducerSchedule extends Struct {
  readonly version: u32;
  readonly producers: Vec<ProducerKey>;
}

/** @name PublicKey */
export interface PublicKey extends Struct {
  readonly type_: UnsignedInt;
  readonly data: U8aFixed;
}

/** @name Sent */
export interface Sent extends Struct {
  readonly tx_id: Bytes;
  readonly from: AccountId;
  readonly asset_id: AssetId;
}

/** @name SignedBlockHeader */
export interface SignedBlockHeader extends Struct {
  readonly block_header: BlockHeader;
  readonly producer_signature: bridgeEosSignature;
}

/** @name Succeeded */
export interface Succeeded extends Struct {
  readonly tx_id: Bytes;
}

/** @name TransactionStatus */
export interface TransactionStatus extends Enum {
  readonly isInitialized: boolean;
  readonly isCreated: boolean;
  readonly isSignComplete: boolean;
  readonly isSent: boolean;
  readonly isSucceeded: boolean;
  readonly isFailed: boolean;
}

/** @name TxOut */
export interface TxOut extends Enum {
  readonly isInitialized: boolean;
  readonly asInitialized: MultiSigTx;
  readonly isCreated: boolean;
  readonly asCreated: MultiSigTx;
  readonly isSignComplete: boolean;
  readonly asSignComplete: MultiSigTx;
  readonly isSent: boolean;
  readonly asSent: Sent;
  readonly isSucceeded: boolean;
  readonly asSucceeded: Succeeded;
  readonly isFailed: boolean;
  readonly asFailed: Failed;
}

/** @name TxSig */
export interface TxSig extends Struct {
  readonly signature: Bytes;
  readonly author: AccountId;
}

/** @name UnsignedInt */
export interface UnsignedInt extends u32 {}

/** @name VersionId */
export interface VersionId extends u32 {}

export type PHANTOM_BRIDGEEOS = 'bridgeEos';
