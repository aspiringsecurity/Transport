export default {
  rpc: {},
  types: {
    PoolId: 'u32',
    SwapFee: 'u128',
    PoolDetails: { owner: 'AccountId', swap_fee_rate: 'SwapFee', active: 'bool' },
    PoolWeight: 'Balance',
    PoolToken: 'u128',
    PoolCreateTokenDetails: {
      token_id: 'AssetId',
      token_balance: 'Balance',
      token_weight: 'PoolWeight'
    }
  }
};
