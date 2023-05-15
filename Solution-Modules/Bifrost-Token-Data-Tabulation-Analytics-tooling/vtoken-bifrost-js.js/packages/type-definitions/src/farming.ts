export default {
  rpc: {
    getFarmingRewards: {
      description: 'Get farming rewards',
      params: [
        {
          name: 'who',
          type: 'AccountId'
        },
        {
          name: 'pid',
          type: 'PoolId'
        },
        {
          name: 'at',
          type: 'Hash',
          isOptional: true
        }
      ],
      type: 'Vec<(CurrencyId, Balance)>'
    },
    getGaugeRewards: {
      description: 'Get gauge rewards',
      params: [
        {
          name: 'who',
          type: 'AccountId'
        },
        {
          name: 'pid',
          type: 'PoolId'
        },
        {
          name: 'at',
          type: 'Hash',
          isOptional: true
        }
      ],
      type: 'Vec<(CurrencyId, Balance)>'
    }
  },
  types: {}
};
