export default {
  rpc: {},
  types: {
    MaxLocksOf: 'u32',
    BifrostVestingInfo: {
      locked: 'Balance',
      per_block: 'Balance',
      starting_block: 'BlockNumber'
    }
  }
};
