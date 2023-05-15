export default {
  rpc: {},
  types: {
    VersionId: 'u32',
    PermissionName: 'u64',
    PermissionLevel: { actor: 'AccountName', permission: 'PermissionName' },
    Action: {
      account: 'AccountName',
      name: 'ActionName',
      authorization: 'Vec<PermissionLevel>',
      data: 'Vec<u8>'
    },
    AccountName: 'u64',
    Checksum256: '([u8;32])',
    ActionName: 'u64',
    FlatMap: { map: 'Vec<(ActionName, u64)>' },
    UnsignedInt: 'u32',
    ActionReceipt: {
      receiver: 'AccountName',
      act_digest: 'Checksum256',
      global_sequence: 'u64',
      recv_sequence: 'u64',
      auth_sequence: 'FlatMap<AccountName, u64>',
      code_sequence: 'UnsignedInt',
      abi_sequence: 'UnsignedInt'
    },
    BlockchainType: { _enum: ['BIFROST', 'EOS', 'IOST'] },
    Precision: 'u32',
    BridgeAssetSymbol: {
      blockchain: 'BlockchainType',
      symbol: 'Vec<u8>',
      precision: 'Precision'
    },
    PublicKey: { type_: 'UnsignedInt', data: '[u8;33]' },
    ProducerKey: { producer_name: 'AccountName', block_signing_key: 'PublicKey' },
    ProducerSchedule: { version: 'u32', producers: 'Vec<ProducerKey>' },
    bridgeEosSignature: { type_: 'UnsignedInt', data: '[u8;65]' }, // Signature => bridgeEosSignature
    BlockTimestamp: '(u32)',
    Extension: '(u16, Vec<u8>)',
    BlockHeader: {
      timestamp: 'BlockTimestamp',
      producer: 'AccountName',
      confirmed: 'u16',
      previous: 'Checksum256',
      transaction_mroot: 'Checksum256',
      action_mroot: 'Checksum256',
      schedule_version: 'u32',
      new_producers: 'Option<ProducerSchedule>',
      header_extensions: 'Vec<Extension>'
    },
    SignedBlockHeader: { block_header: 'BlockHeader', producer_signature: 'bridgeEosSignature' }, // Signature => bridgeEosSignature
    Checksum256Array: 'Vec<Checksum256>',
    IncrementalMerkle: { _node_count: 'u64', _active_nodes: 'Checksum256Array' },
    TxSig: { signature: 'Vec<u8>', author: 'AccountId' },
    MultiSig: { signatures: 'Vec<TxSig>', threshold: 'u8' },
    MultiSigTx: {
      chain_id: 'Vec<u8>',
      raw_tx: 'Vec<u8>',
      multi_sig: 'MultiSig',
      action: 'Action',
      from: 'AccountId',
      asset_id: 'AssetId'
    },
    Sent: { tx_id: 'Vec<u8>', from: 'AccountId', asset_id: 'AssetId' },
    Succeeded: { tx_id: 'Vec<u8>' },
    Failed: { tx_id: 'Vec<u8>', reason: 'Vec<u8>' },
    TxOut: {
      _enum: {
        Initialized: 'MultiSigTx',
        Created: 'MultiSigTx',
        SignComplete: 'MultiSigTx',
        Sent: 'Sent',
        Succeeded: 'Succeeded',
        Failed: 'Failed'
      }
    },
    TransactionStatus: {
      _enum: ['Initialized', 'Created', 'SignComplete', 'Sent', 'Succeeded', 'Failed']
    },
    ProducerAuthoritySchedule: { version: 'u32', producers: 'Vec<ProducerAuthority>' },
    ProducerAuthority: { producer_name: 'ActionName', authority: 'BlockSigningAuthority' },
    BlockSigningAuthority: '(UnsignedInt, BlockSigningAuthorityV0)',
    BlockSigningAuthorityV0: { threshold: 'u32', keyWeights: 'Vec<KeyWeight>' }, // keys  => keyWeights
    KeyWeight: { key: 'PublicKey', weight: 'u16' }
  }
};
