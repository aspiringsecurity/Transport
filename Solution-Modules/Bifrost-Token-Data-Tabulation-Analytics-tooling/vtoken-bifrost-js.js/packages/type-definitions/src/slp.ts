export default {
  rpc: {},
  types: {
    ledger: {
      Substrate: 'SubstrateLedger'
    },
    SubstrateLedger: {
      account: 'AccountId',
      total: 'Balance',
      active: 'Balance',
      unlocking: 'Vec<UnlockChunk>'
    },
    UnlockChunk: {
      value: 'Balance',
      unlock_time: 'TimeUnit'
    },
    FilecoinLedger: {
      account:'MultiLocationV1',
      initial_pledge:'Balance'
    },
    FilecoinOwnerByMinerEntry: {
      currency_id:'AccountId',
      miner_id:'MultiLocationV1',
      owner_id:'MultiLocationV1'
    }
  }
};
