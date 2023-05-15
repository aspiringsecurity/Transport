export default {
  rpc: {},
  types: {
    IostAction: { contract: 'Vec<u8>', action_name: 'Vec<u8>', data: 'Vec<u8>' },
    IostMultiSigTx: {
      chain_id: 'i32',
      raw_tx: 'Vec<u8>',
      multi_sig: 'MultiSig',
      action: 'IostAction',
      from: 'AccountId',
      asset_id: 'AssetId'
    },
    Processing: { tx_id: 'Vec<u8>', multi_sig_tx: 'IostMultiSigTx' },
    IostTxOut: {
      _enum: {
        Initial: 'IostMultiSigTx',
        Generated: 'IostMultiSigTx',
        Signed: 'IostMultiSigTx',
        Processing: 'Processing',
        Success: 'Vec<u8>',
        Fail: 'Failed'
      }
    }
  }
};
