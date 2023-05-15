export default {
  rpc: {},
  types: {
    BiddingOrderId: 'u64',
    EraId: 'u32',
    BiddingOrderUnit: {
      bidder_id: 'AccountId',
      token_id: 'AssetId',
      block_num: 'BlockNumber',
      votes: 'Balance',
      annual_roi: 'Permill',
      validator: 'AccountId'
    },
    BiddingOrderUnitOf: 'BiddingOrderUnit'
  }
};
