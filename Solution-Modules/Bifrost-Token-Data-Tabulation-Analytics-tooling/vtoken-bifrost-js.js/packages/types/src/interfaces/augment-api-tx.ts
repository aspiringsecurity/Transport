// Auto-generated via `yarn polkadot-types-from-chain`, do not edit
/* eslint-disable */

import type { NodePrimitivesCurrencyCurrencyId } from '@bifrost-finance/types/interfaces/primitives';
import type { MultiAddress } from '@bifrost-finance/types/interfaces/runtime';
import type { ApiTypes } from '@polkadot/api-base/types';
import type { Compact, bool, i128, u128 } from '@polkadot/types-codec';
import type { AnyNumber } from '@polkadot/types-codec/types';

declare module '@polkadot/api-base/types/submittable' {
  export interface AugmentedSubmittables<ApiType extends ApiTypes> {
    currencies: {
      /**
       * Transfer some balance to another account under `currency_id`.
       * 
       * The dispatch origin for this call must be `Signed` by the
       * transactor.
       **/
      transfer: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, currencyId: NodePrimitivesCurrencyCurrencyId | { Native: any } | { VToken: any } | { Token: any } | { Stable: any } | { VSToken: any } | { VSBond: any } | { LPToken: any } | { ForeignAsset: any } | { Token2: any } | { VToken2: any } | { VSToken2: any } | { VSBond2: any } | { StableLpToken: any } | string | Uint8Array, amount: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, NodePrimitivesCurrencyCurrencyId, Compact<u128>]>;
      /**
       * Transfer some native currency to another account.
       * 
       * The dispatch origin for this call must be `Signed` by the
       * transactor.
       **/
      transferNativeCurrency: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, amount: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, Compact<u128>]>;
      /**
       * update amount of account `who` under `currency_id`.
       * 
       * The dispatch origin of this call must be _Root_.
       **/
      updateBalance: AugmentedSubmittable<(who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, currencyId: NodePrimitivesCurrencyCurrencyId | { Native: any } | { VToken: any } | { Token: any } | { Stable: any } | { VSToken: any } | { VSBond: any } | { LPToken: any } | { ForeignAsset: any } | { Token2: any } | { VToken2: any } | { VSToken2: any } | { VSBond2: any } | { StableLpToken: any } | string | Uint8Array, amount: i128 | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, NodePrimitivesCurrencyCurrencyId, i128]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
    tokens: {
      /**
       * Exactly as `transfer`, except the origin must be root and the source
       * account may be specified.
       * 
       * The dispatch origin for this call must be _Root_.
       * 
       * - `source`: The sender of the transfer.
       * - `dest`: The recipient of the transfer.
       * - `currency_id`: currency type.
       * - `amount`: free balance amount to tranfer.
       **/
      forceTransfer: AugmentedSubmittable<(source: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, currencyId: NodePrimitivesCurrencyCurrencyId | { Native: any } | { VToken: any } | { Token: any } | { Stable: any } | { VSToken: any } | { VSBond: any } | { LPToken: any } | { ForeignAsset: any } | { Token2: any } | { VToken2: any } | { VSToken2: any } | { VSBond2: any } | { StableLpToken: any } | string | Uint8Array, amount: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, MultiAddress, NodePrimitivesCurrencyCurrencyId, Compact<u128>]>;
      /**
       * Set the balances of a given account.
       * 
       * This will alter `FreeBalance` and `ReservedBalance` in storage. it
       * will also decrease the total issuance of the system
       * (`TotalIssuance`). If the new free or reserved balance is below the
       * existential deposit, it will reap the `AccountInfo`.
       * 
       * The dispatch origin for this call is `root`.
       **/
      setBalance: AugmentedSubmittable<(who: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, currencyId: NodePrimitivesCurrencyCurrencyId | { Native: any } | { VToken: any } | { Token: any } | { Stable: any } | { VSToken: any } | { VSBond: any } | { LPToken: any } | { ForeignAsset: any } | { Token2: any } | { VToken2: any } | { VSToken2: any } | { VSBond2: any } | { StableLpToken: any } | string | Uint8Array, newFree: Compact<u128> | AnyNumber | Uint8Array, newReserved: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, NodePrimitivesCurrencyCurrencyId, Compact<u128>, Compact<u128>]>;
      /**
       * Transfer some liquid free balance to another account.
       * 
       * `transfer` will set the `FreeBalance` of the sender and receiver.
       * It will decrease the total issuance of the system by the
       * `TransferFee`. If the sender's account is below the existential
       * deposit as a result of the transfer, the account will be reaped.
       * 
       * The dispatch origin for this call must be `Signed` by the
       * transactor.
       * 
       * - `dest`: The recipient of the transfer.
       * - `currency_id`: currency type.
       * - `amount`: free balance amount to tranfer.
       **/
      transfer: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, currencyId: NodePrimitivesCurrencyCurrencyId | { Native: any } | { VToken: any } | { Token: any } | { Stable: any } | { VSToken: any } | { VSBond: any } | { LPToken: any } | { ForeignAsset: any } | { Token2: any } | { VToken2: any } | { VSToken2: any } | { VSBond2: any } | { StableLpToken: any } | string | Uint8Array, amount: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, NodePrimitivesCurrencyCurrencyId, Compact<u128>]>;
      /**
       * Transfer all remaining balance to the given account.
       * 
       * NOTE: This function only attempts to transfer _transferable_
       * balances. This means that any locked, reserved, or existential
       * deposits (when `keep_alive` is `true`), will not be transferred by
       * this function. To ensure that this function results in a killed
       * account, you might need to prepare the account by removing any
       * reference counters, storage deposits, etc...
       * 
       * The dispatch origin for this call must be `Signed` by the
       * transactor.
       * 
       * - `dest`: The recipient of the transfer.
       * - `currency_id`: currency type.
       * - `keep_alive`: A boolean to determine if the `transfer_all`
       * operation should send all of the funds the account has, causing
       * the sender account to be killed (false), or transfer everything
       * except at least the existential deposit, which will guarantee to
       * keep the sender account alive (true).
       **/
      transferAll: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, currencyId: NodePrimitivesCurrencyCurrencyId | { Native: any } | { VToken: any } | { Token: any } | { Stable: any } | { VSToken: any } | { VSBond: any } | { LPToken: any } | { ForeignAsset: any } | { Token2: any } | { VToken2: any } | { VSToken2: any } | { VSBond2: any } | { StableLpToken: any } | string | Uint8Array, keepAlive: bool | boolean | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, NodePrimitivesCurrencyCurrencyId, bool]>;
      /**
       * Same as the [`transfer`] call, but with a check that the transfer
       * will not kill the origin account.
       * 
       * 99% of the time you want [`transfer`] instead.
       * 
       * The dispatch origin for this call must be `Signed` by the
       * transactor.
       * 
       * - `dest`: The recipient of the transfer.
       * - `currency_id`: currency type.
       * - `amount`: free balance amount to tranfer.
       **/
      transferKeepAlive: AugmentedSubmittable<(dest: MultiAddress | { Id: any } | { Index: any } | { Raw: any } | { Address32: any } | { Address20: any } | string | Uint8Array, currencyId: NodePrimitivesCurrencyCurrencyId | { Native: any } | { VToken: any } | { Token: any } | { Stable: any } | { VSToken: any } | { VSBond: any } | { LPToken: any } | { ForeignAsset: any } | { Token2: any } | { VToken2: any } | { VSToken2: any } | { VSBond2: any } | { StableLpToken: any } | string | Uint8Array, amount: Compact<u128> | AnyNumber | Uint8Array) => SubmittableExtrinsic<ApiType>, [MultiAddress, NodePrimitivesCurrencyCurrencyId, Compact<u128>]>;
      /**
       * Generic tx
       **/
      [key: string]: SubmittableExtrinsicFunction<ApiType>;
    };
  } // AugmentedSubmittables
} // declare module
