// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Balance } from '@bifrost-finance/types/interfaces/runtime';
import type { Enum } from '@polkadot/types-codec';

/** @name ExtraFeeName */
export interface ExtraFeeName extends Enum {
  readonly isSalpContribute: boolean;
  readonly isNoExtraFee: boolean;
  readonly type: 'SalpContribute' | 'NoExtraFee';
}

/** @name PalletBalanceOf */
export interface PalletBalanceOf extends Balance {}

export type PHANTOM_FLEXIBLEFEE = 'flexibleFee';
