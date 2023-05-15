export default {
  rpc: {
    getAllAssets: {
      description: 'zenlinkProtocol getAllAssets',
      params: [
        {
          name: 'at',
          type: 'Hash',
          isOptional: true
        }
      ],
      type: 'Vec<ZenlinkAssetId>'
    },
    getBalance: {
      description: 'zenlinkProtocol getBalance',
      params: [
        {
          name: 'asset_id',
          type: 'ZenlinkAssetId'
        },
        {
          name: 'account',
          type: 'AccountId'
        },
        {
          name: 'at',
          type: 'Hash',
          isOptional: true
        }
      ],
      type: 'String'
    },
    getSovereignsInfo: {
      description: 'Get the ownership of a certain currency for each parachain.',
      params: [
        {
          name: 'asset_id',
          type: 'ZenlinkAssetId'
        },
        {
          name: 'at',
          type: 'BlockHash',
          isHistoric: true,
          isOptional: true
        }
      ],
      type: '(u32, AccountId, String)'
    },
    getPairByAssetId: {
      description: 'Get the detailed information of a particular exchange pair.',
      params: [
        {
          name: 'asset_0',
          type: 'ZenlinkAssetId'
        },
        {
          name: 'asset_1',
          type: 'ZenlinkAssetId'
        },
        {
          name: 'at',
          type: 'BlockHash',
          isHistoric: true,
          isOptional: true
        }
      ],
      type: 'PairInfo'
    },
    getAmountInPrice: {
      description: 'Get the output token amount for an exact input token amount.',
      params: [
        {
          name: 'supply',
          type: 'ZenlinkAssetBalance'
        },
        {
          name: 'path',
          type: 'Vec<ZenlinkAssetId>'
        },
        {
          name: 'at',
          type: 'BlockHash',
          isHistoric: true,
          isOptional: true
        }
      ],
      type: 'u128'
    },
    getAmountOutPrice: {
      description: 'Get the input token amount for an exact output token amount.',
      params: [
        {
          name: 'supply',
          type: 'ZenlinkAssetBalance'
        },
        {
          name: 'path',
          type: 'Vec<ZenlinkAssetId>'
        },
        {
          name: 'at',
          type: 'BlockHash',
          isHistoric: true,
          isOptional: true
        }
      ],
      type: 'u128'
    },
    getEstimateLptoken: {
      description:
        'Get the estimated number of LP token acquired given the desired and minimum amount for both in-token and out-token.',
      params: [
        {
          name: 'asset_0',
          type: 'ZenlinkAssetId'
        },
        {
          name: 'asset_1',
          type: 'ZenlinkAssetId'
        },
        {
          name: 'amount_0_desired',
          type: 'ZenlinkAssetBalance'
        },
        {
          name: 'amount_1_desired',
          type: 'ZenlinkAssetBalance'
        },
        {
          name: 'amount_0_min',
          type: 'ZenlinkAssetBalance'
        },
        {
          name: 'amount_1_min',
          type: 'ZenlinkAssetBalance'
        },
        {
          name: 'at',
          type: 'BlockHash',
          isHistoric: true,
          isOptional: true
        }
      ],
      type: 'u128'
    }
  },
  types: {
    ZenlinkAssetId: {
      chain_id: 'u32',
      asset_type: 'u8',
      asset_index: 'u64'
    },
    ZenlinkAssetBalance: 'u128',
    PairInfo: {
      asset0: 'ZenlinkAssetId',
      asset1: 'ZenlinkAssetId',
      account: 'AccountId',
      totalLiquidity: 'ZenlinkAssetBalance',
      holdingLiquidity: 'ZenlinkAssetBalance',
      reserve0: 'ZenlinkAssetBalance',
      reserve1: 'ZenlinkAssetBalance',
      lpAssetId: 'ZenlinkAssetId'
    },
    PairMetadata: {
      pair_account: 'AccountId',
      target_supply: 'ZenlinkAssetBalance'
    },
    BootstrapParamter: {
      min_contribution: '(ZenlinkAssetBalance, ZenlinkAssetBalance)',
      target_supply: '(ZenlinkAssetBalance, ZenlinkAssetBalance)',
      accumulated_supply: '(ZenlinkAssetBalance, ZenlinkAssetBalance)',
      end_block_number: 'BlockNumber',
      pair_account: 'AccountId'
    },
    PairStatus: {
      _enum: {
        Trading: 'PairMetadata',
        Bootstrap: 'BootstrapParamter',
        Disable: null
      }
    }
  }
};
