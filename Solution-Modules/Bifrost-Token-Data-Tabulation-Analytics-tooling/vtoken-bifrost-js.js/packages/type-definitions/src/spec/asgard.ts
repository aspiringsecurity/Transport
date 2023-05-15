import type { OverrideVersionedType } from '@polkadot/types/types';

const TokenSymbol = {
  _enum: {
    ASG: 0,
    BNC: 1,
    KUSD: 2,
    DOT: 3,
    KSM: 4,
    ETH: 5,
    KAR: 6,
    ZLK: 7,
    PHA: 8,
    RMRK: 9,
    MOVR: 10,
    GLMR: 11
  }
};

const xcmV0 = {
  MultiAsset: 'MultiAssetV0',
  Xcm: 'XcmV0',
  XcmOrder: 'XcmOrderV0',
  MultiLocation: 'MultiLocationV0',
  XcmError: 'XcmErrorV0',
  Response: 'ResponseV0'
};

const xcmV1 = {
  MultiAsset: 'MultiAssetV1',
  Xcm: 'XcmV1',
  XcmOrder: 'XcmOrderV1',
  MultiLocation: 'MultiLocationV1',
  XcmError: 'XcmErrorV1',
  Response: 'ResponseV1'
};

const versioned: OverrideVersionedType[] = [
  {
    minmax: [0, 901],
    types: {
      TokenSymbol,
      ...xcmV0
    }
  },
  {
    minmax: [902, undefined],
    types: {
      ...xcmV1
    }
  }
];

export default versioned;
