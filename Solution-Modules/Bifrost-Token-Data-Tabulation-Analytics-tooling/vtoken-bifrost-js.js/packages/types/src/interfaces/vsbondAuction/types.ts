// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { CurrencyId } from '@bifrost-finance/types/interfaces/primitives';
import type { AccountIdOf, BalanceOf } from '@bifrost-finance/types/interfaces/runtime';
import type { Enum, Struct, u64 } from '@polkadot/types-codec';

/** @name OrderId */
export interface OrderId extends u64 {}

/** @name OrderInfo */
export interface OrderInfo extends Struct {
  readonly owner: AccountIdOf;
  readonly vsbond: CurrencyId;
  readonly amount: BalanceOf;
  readonly remain: BalanceOf;
  readonly total_price: BalanceOf;
  readonly order_id: OrderId;
  readonly order_type: OrderType;
  readonly remain_price: BalanceOf;
}

/** @name OrderType */
export interface OrderType extends Enum {
  readonly isSell: boolean;
  readonly isBuy: boolean;
  readonly type: 'Sell' | 'Buy';
}

export type PHANTOM_VSBONDAUCTION = 'vsbondAuction';
