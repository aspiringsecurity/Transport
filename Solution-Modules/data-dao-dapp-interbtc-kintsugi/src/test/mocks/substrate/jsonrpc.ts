const mockJsonRpc = {
  babe: {
    epochAuthorship: {
      description:
        'Returns data about which slots (primary or secondary) can be claimed in the current epoch with the keys in the keystore',
      params: [],
      type: 'HashMap<AuthorityId, EpochAuthorship>',
      isSubscription: false,
      jsonrpc: 'babe_epochAuthorship',
      method: 'epochAuthorship',
      section: 'babe'
    }
  },
  beefy: {
    getFinalizedHead: {
      description: 'Returns hash of the latest BEEFY finalized block as seen by this client.',
      params: [],
      type: 'H256',
      isSubscription: false,
      jsonrpc: 'beefy_getFinalizedHead',
      method: 'getFinalizedHead',
      section: 'beefy'
    },
    subscribeJustifications: {
      description: 'Returns the block most recently finalized by BEEFY, alongside side its justification.',
      params: [],
      pubsub: ['justifications', 'subscribeJustifications', 'unsubscribeJustifications'],
      type: 'BeefySignedCommitment',
      isSubscription: true,
      jsonrpc: 'beefy_subscribeJustifications',
      method: 'subscribeJustifications',
      section: 'beefy'
    }
  },
  contracts: {
    call: {
      description: 'Executes a call to a contract',
      params: [
        {
          name: 'callRequest',
          type: 'ContractCallRequest'
        },
        {
          isHistoric: true,
          isOptional: true,
          name: 'at',
          type: 'BlockHash'
        }
      ],
      type: 'ContractExecResult',
      isSubscription: false,
      jsonrpc: 'contracts_call',
      method: 'call',
      section: 'contracts'
    },
    getStorage: {
      description: 'Returns the value under a specified storage key in a contract',
      params: [
        {
          name: 'address',
          type: 'AccountId'
        },
        {
          name: 'key',
          type: 'H256'
        },
        {
          isHistoric: true,
          isOptional: true,
          name: 'at',
          type: 'BlockHash'
        }
      ],
      type: 'Option<Bytes>',
      isSubscription: false,
      jsonrpc: 'contracts_getStorage',
      method: 'getStorage',
      section: 'contracts'
    },
    instantiate: {
      description: 'Instantiate a new contract',
      params: [
        {
          name: 'request',
          type: 'InstantiateRequest'
        },
        {
          isHistoric: true,
          isOptional: true,
          name: 'at',
          type: 'BlockHash'
        }
      ],
      type: 'ContractInstantiateResult',
      isSubscription: false,
      jsonrpc: 'contracts_instantiate',
      method: 'instantiate',
      section: 'contracts'
    },
    rentProjection: {
      description: 'Returns the projected time a given contract will be able to sustain paying its rent',
      params: [
        {
          name: 'address',
          type: 'AccountId'
        },
        {
          isHistoric: true,
          isOptional: true,
          name: 'at',
          type: 'BlockHash'
        }
      ],
      type: 'Option<BlockNumber>',
      isSubscription: false,
      jsonrpc: 'contracts_rentProjection',
      method: 'rentProjection',
      section: 'contracts'
    },
    uploadCode: {
      description: 'Upload new code without instantiating a contract from it',
      endpoint: 'contracts_upload_code',
      params: [
        {
          name: 'uploadRequest',
          type: 'CodeUploadRequest'
        },
        {
          isHistoric: true,
          isOptional: true,
          name: 'at',
          type: 'BlockHash'
        }
      ],
      type: 'CodeUploadResult',
      isSubscription: false,
      jsonrpc: 'contracts_uploadCode',
      method: 'uploadCode',
      section: 'contracts'
    }
  },
  dev: {
    getBlockStats: {
      description: 'Reexecute the specified `block_hash` and gather statistics while doing so',
      params: [
        {
          isHistoric: true,
          name: 'at',
          type: 'Hash'
        }
      ],
      type: 'Option<BlockStats>',
      isSubscription: false,
      jsonrpc: 'dev_getBlockStats',
      method: 'getBlockStats',
      section: 'dev'
    }
  },
  engine: {
    createBlock: {
      description: 'Instructs the manual-seal authorship task to create a new block',
      params: [
        {
          name: 'createEmpty',
          type: 'bool'
        },
        {
          name: 'finalize',
          type: 'bool'
        },
        {
          isOptional: true,
          name: 'parentHash',
          type: 'BlockHash'
        }
      ],
      type: 'CreatedBlock',
      isSubscription: false,
      jsonrpc: 'engine_createBlock',
      method: 'createBlock',
      section: 'engine'
    },
    finalizeBlock: {
      description: 'Instructs the manual-seal authorship task to finalize a block',
      params: [
        {
          name: 'hash',
          type: 'BlockHash'
        },
        {
          isOptional: true,
          name: 'justification',
          type: 'Justification'
        }
      ],
      type: 'bool',
      isSubscription: false,
      jsonrpc: 'engine_finalizeBlock',
      method: 'finalizeBlock',
      section: 'engine'
    }
  },
  grandpa: {
    proveFinality: {
      description:
        'Prove finality for the given block number, returning the Justification for the last block in the set.',
      params: [
        {
          name: 'blockNumber',
          type: 'BlockNumber'
        }
      ],
      type: 'Option<EncodedFinalityProofs>',
      isSubscription: false,
      jsonrpc: 'grandpa_proveFinality',
      method: 'proveFinality',
      section: 'grandpa'
    },
    roundState: {
      description: 'Returns the state of the current best round state as well as the ongoing background rounds',
      params: [],
      type: 'ReportedRoundStates',
      isSubscription: false,
      jsonrpc: 'grandpa_roundState',
      method: 'roundState',
      section: 'grandpa'
    },
    subscribeJustifications: {
      description: 'Subscribes to grandpa justifications',
      params: [],
      pubsub: ['justifications', 'subscribeJustifications', 'unsubscribeJustifications'],
      type: 'JustificationNotification',
      isSubscription: true,
      jsonrpc: 'grandpa_subscribeJustifications',
      method: 'subscribeJustifications',
      section: 'grandpa'
    }
  },
  mmr: {
    generateBatchProof: {
      description: 'Generate MMR proof for the given leaf indices.',
      params: [
        {
          name: 'leafIndices',
          type: 'Vec<u64>'
        },
        {
          isHistoric: true,
          isOptional: true,
          name: 'at',
          type: 'BlockHash'
        }
      ],
      type: 'MmrLeafProof',
      isSubscription: false,
      jsonrpc: 'mmr_generateBatchProof',
      method: 'generateBatchProof',
      section: 'mmr'
    },
    generateProof: {
      description: 'Generate MMR proof for given leaf index.',
      params: [
        {
          name: 'leafIndex',
          type: 'u64'
        },
        {
          isHistoric: true,
          isOptional: true,
          name: 'at',
          type: 'BlockHash'
        }
      ],
      type: 'MmrLeafBatchProof',
      isSubscription: false,
      jsonrpc: 'mmr_generateProof',
      method: 'generateProof',
      section: 'mmr'
    }
  },
  syncstate: {
    genSyncSpec: {
      description: 'Returns the json-serialized chainspec running the node, with a sync state.',
      endpoint: 'sync_state_genSyncSpec',
      params: [
        {
          name: 'raw',
          type: 'bool'
        }
      ],
      type: 'Json',
      isSubscription: false,
      jsonrpc: 'syncstate_genSyncSpec',
      method: 'genSyncSpec',
      section: 'syncstate'
    }
  },
  system: {
    accountNextIndex: {
      alias: ['account_nextIndex'],
      description: 'Retrieves the next accountIndex as available on the node',
      params: [
        {
          name: 'accountId',
          type: 'AccountId'
        }
      ],
      type: 'Index',
      isSubscription: false,
      jsonrpc: 'system_accountNextIndex',
      method: 'accountNextIndex',
      section: 'system'
    },
    addLogFilter: {
      description: 'Adds the supplied directives to the current log filter',
      params: [
        {
          name: 'directives',
          type: 'Text'
        }
      ],
      type: 'Null',
      isSubscription: false,
      jsonrpc: 'system_addLogFilter',
      method: 'addLogFilter',
      section: 'system'
    },
    addReservedPeer: {
      description: 'Adds a reserved peer',
      params: [
        {
          name: 'peer',
          type: 'Text'
        }
      ],
      type: 'Text',
      isSubscription: false,
      jsonrpc: 'system_addReservedPeer',
      method: 'addReservedPeer',
      section: 'system'
    },
    chain: {
      description: 'Retrieves the chain',
      params: [],
      type: 'Text',
      isSubscription: false,
      jsonrpc: 'system_chain',
      method: 'chain',
      section: 'system'
    },
    chainType: {
      description: 'Retrieves the chain type',
      params: [],
      type: 'ChainType',
      isSubscription: false,
      jsonrpc: 'system_chainType',
      method: 'chainType',
      section: 'system'
    },
    dryRun: {
      alias: ['system_dryRunAt'],
      description: 'Dry run an extrinsic at a given block',
      params: [
        {
          name: 'extrinsic',
          type: 'Bytes'
        },
        {
          isHistoric: true,
          isOptional: true,
          name: 'at',
          type: 'BlockHash'
        }
      ],
      type: 'ApplyExtrinsicResult',
      isSubscription: false,
      jsonrpc: 'system_dryRun',
      method: 'dryRun',
      section: 'system'
    },
    health: {
      description: 'Return health status of the node',
      noErrorLog: true,
      params: [],
      type: 'Health',
      isSubscription: false,
      jsonrpc: 'system_health',
      method: 'health',
      section: 'system'
    },
    localListenAddresses: {
      description:
        'The addresses include a trailing /p2p/ with the local PeerId, and are thus suitable to be passed to addReservedPeer or as a bootnode address for example',
      params: [],
      type: 'Vec<Text>',
      isSubscription: false,
      jsonrpc: 'system_localListenAddresses',
      method: 'localListenAddresses',
      section: 'system'
    },
    localPeerId: {
      description: 'Returns the base58-encoded PeerId of the node',
      params: [],
      type: 'Text',
      isSubscription: false,
      jsonrpc: 'system_localPeerId',
      method: 'localPeerId',
      section: 'system'
    },
    name: {
      description: 'Retrieves the node name',
      params: [],
      type: 'Text',
      isSubscription: false,
      jsonrpc: 'system_name',
      method: 'name',
      section: 'system'
    },
    networkState: {
      alias: ['system_unstable_networkState'],
      description: 'Returns current state of the network',
      params: [],
      type: 'NetworkState',
      isSubscription: false,
      jsonrpc: 'system_networkState',
      method: 'networkState',
      section: 'system'
    },
    nodeRoles: {
      description: 'Returns the roles the node is running as',
      params: [],
      type: 'Vec<NodeRole>',
      isSubscription: false,
      jsonrpc: 'system_nodeRoles',
      method: 'nodeRoles',
      section: 'system'
    },
    peers: {
      description: 'Returns the currently connected peers',
      params: [],
      type: 'Vec<PeerInfo>',
      isSubscription: false,
      jsonrpc: 'system_peers',
      method: 'peers',
      section: 'system'
    },
    properties: {
      description: 'Get a custom set of properties as a JSON object, defined in the chain spec',
      params: [],
      type: 'ChainProperties',
      isSubscription: false,
      jsonrpc: 'system_properties',
      method: 'properties',
      section: 'system'
    },
    removeReservedPeer: {
      description: 'Remove a reserved peer',
      params: [
        {
          name: 'peerId',
          type: 'Text'
        }
      ],
      type: 'Text',
      isSubscription: false,
      jsonrpc: 'system_removeReservedPeer',
      method: 'removeReservedPeer',
      section: 'system'
    },
    reservedPeers: {
      description: 'Returns the list of reserved peers',
      params: [],
      type: 'Vec<Text>',
      isSubscription: false,
      jsonrpc: 'system_reservedPeers',
      method: 'reservedPeers',
      section: 'system'
    },
    resetLogFilter: {
      description: 'Resets the log filter to Substrate defaults',
      params: [],
      type: 'Null',
      isSubscription: false,
      jsonrpc: 'system_resetLogFilter',
      method: 'resetLogFilter',
      section: 'system'
    },
    syncState: {
      description: 'Returns the state of the syncing of the node',
      params: [],
      type: 'SyncState',
      isSubscription: false,
      jsonrpc: 'system_syncState',
      method: 'syncState',
      section: 'system'
    },
    version: {
      description: 'Retrieves the version of the node',
      params: [],
      type: 'Text',
      isSubscription: false,
      jsonrpc: 'system_version',
      method: 'version',
      section: 'system'
    }
  },
  net: {
    listening: {
      aliasSection: 'net',
      description: 'Returns true if client is actively listening for network connections. Otherwise false.',
      params: [],
      type: 'bool',
      isSubscription: false,
      jsonrpc: 'net_listening',
      method: 'listening',
      section: 'net'
    },
    peerCount: {
      aliasSection: 'net',
      description: 'Returns number of peers connected to node.',
      params: [],
      type: 'Text',
      isSubscription: false,
      jsonrpc: 'net_peerCount',
      method: 'peerCount',
      section: 'net'
    },
    version: {
      aliasSection: 'net',
      description: 'Returns protocol version.',
      params: [],
      type: 'Text',
      isSubscription: false,
      jsonrpc: 'net_version',
      method: 'version',
      section: 'net'
    }
  },
  web3: {
    clientVersion: {
      aliasSection: 'web3',
      description: 'Returns current client version.',
      params: [],
      type: 'Text',
      isSubscription: false,
      jsonrpc: 'web3_clientVersion',
      method: 'clientVersion',
      section: 'web3'
    },
    sha3: {
      aliasSection: 'web3',
      description: 'Returns sha3 of the given data',
      params: [
        {
          name: 'data',
          type: 'Bytes'
        }
      ],
      type: 'H256',
      isSubscription: false,
      jsonrpc: 'web3_sha3',
      method: 'sha3',
      section: 'web3'
    }
  },
  eth: {
    accounts: {
      description: 'Returns accounts list.',
      params: [],
      type: 'Vec<H160>',
      isSubscription: false,
      jsonrpc: 'eth_accounts',
      method: 'accounts',
      section: 'eth'
    },
    blockNumber: {
      description: 'Returns the blockNumber',
      params: [],
      type: 'U256',
      isSubscription: false,
      jsonrpc: 'eth_blockNumber',
      method: 'blockNumber',
      section: 'eth'
    },
    call: {
      description: 'Call contract, returning the output data.',
      params: [
        {
          name: 'request',
          type: 'EthCallRequest'
        },
        {
          isHistoric: true,
          isOptional: true,
          name: 'number',
          type: 'BlockNumber'
        }
      ],
      type: 'Bytes',
      isSubscription: false,
      jsonrpc: 'eth_call',
      method: 'call',
      section: 'eth'
    },
    chainId: {
      description:
        'Returns the chain ID used for transaction signing at the current best block. None is returned if not available.',
      params: [],
      type: 'U64',
      isSubscription: false,
      jsonrpc: 'eth_chainId',
      method: 'chainId',
      section: 'eth'
    },
    coinbase: {
      description: 'Returns block author.',
      params: [],
      type: 'H160',
      isSubscription: false,
      jsonrpc: 'eth_coinbase',
      method: 'coinbase',
      section: 'eth'
    },
    estimateGas: {
      description: 'Estimate gas needed for execution of given contract.',
      params: [
        {
          name: 'request',
          type: 'EthCallRequest'
        },
        {
          isHistoric: true,
          isOptional: true,
          name: 'number',
          type: 'BlockNumber'
        }
      ],
      type: 'U256',
      isSubscription: false,
      jsonrpc: 'eth_estimateGas',
      method: 'estimateGas',
      section: 'eth'
    },
    feeHistory: {
      description: 'Returns fee history for given block count & reward percentiles',
      params: [
        {
          name: 'blockCount',
          type: 'U256'
        },
        {
          name: 'newestBlock',
          type: 'BlockNumber'
        },
        {
          name: 'rewardPercentiles',
          type: 'Option<Vec<f64>>'
        }
      ],
      type: 'EthFeeHistory',
      isSubscription: false,
      jsonrpc: 'eth_feeHistory',
      method: 'feeHistory',
      section: 'eth'
    },
    gasPrice: {
      description: 'Returns current gas price.',
      params: [],
      type: 'U256',
      isSubscription: false,
      jsonrpc: 'eth_gasPrice',
      method: 'gasPrice',
      section: 'eth'
    },
    getBalance: {
      description: 'Returns balance of the given account.',
      params: [
        {
          name: 'address',
          type: 'H160'
        },
        {
          isHistoric: true,
          isOptional: true,
          name: 'number',
          type: 'BlockNumber'
        }
      ],
      type: 'U256',
      isSubscription: false,
      jsonrpc: 'eth_getBalance',
      method: 'getBalance',
      section: 'eth'
    },
    getBlockByHash: {
      description: 'Returns block with given hash.',
      params: [
        {
          name: 'hash',
          type: 'H256'
        },
        {
          name: 'full',
          type: 'bool'
        }
      ],
      type: 'Option<EthRichBlock>',
      isSubscription: false,
      jsonrpc: 'eth_getBlockByHash',
      method: 'getBlockByHash',
      section: 'eth'
    },
    getBlockByNumber: {
      description: 'Returns block with given number.',
      params: [
        {
          name: 'block',
          type: 'BlockNumber'
        },
        {
          name: 'full',
          type: 'bool'
        }
      ],
      type: 'Option<EthRichBlock>',
      isSubscription: false,
      jsonrpc: 'eth_getBlockByNumber',
      method: 'getBlockByNumber',
      section: 'eth'
    },
    getBlockTransactionCountByHash: {
      description: 'Returns the number of transactions in a block with given hash.',
      params: [
        {
          name: 'hash',
          type: 'H256'
        }
      ],
      type: 'U256',
      isSubscription: false,
      jsonrpc: 'eth_getBlockTransactionCountByHash',
      method: 'getBlockTransactionCountByHash',
      section: 'eth'
    },
    getBlockTransactionCountByNumber: {
      description: 'Returns the number of transactions in a block with given block number.',
      params: [
        {
          name: 'block',
          type: 'BlockNumber'
        }
      ],
      type: 'U256',
      isSubscription: false,
      jsonrpc: 'eth_getBlockTransactionCountByNumber',
      method: 'getBlockTransactionCountByNumber',
      section: 'eth'
    },
    getCode: {
      description: 'Returns the code at given address at given time (block number).',
      params: [
        {
          name: 'address',
          type: 'H160'
        },
        {
          isHistoric: true,
          isOptional: true,
          name: 'number',
          type: 'BlockNumber'
        }
      ],
      type: 'Bytes',
      isSubscription: false,
      jsonrpc: 'eth_getCode',
      method: 'getCode',
      section: 'eth'
    },
    getFilterChanges: {
      description: 'Returns filter changes since last poll.',
      params: [
        {
          name: 'index',
          type: 'U256'
        }
      ],
      type: 'EthFilterChanges',
      isSubscription: false,
      jsonrpc: 'eth_getFilterChanges',
      method: 'getFilterChanges',
      section: 'eth'
    },
    getFilterLogs: {
      description: "Returns all logs matching given filter (in a range 'from' - 'to').",
      params: [
        {
          name: 'index',
          type: 'U256'
        }
      ],
      type: 'Vec<EthLog>',
      isSubscription: false,
      jsonrpc: 'eth_getFilterLogs',
      method: 'getFilterLogs',
      section: 'eth'
    },
    getLogs: {
      description: 'Returns logs matching given filter object.',
      params: [
        {
          name: 'filter',
          type: 'EthFilter'
        }
      ],
      type: 'Vec<EthLog>',
      isSubscription: false,
      jsonrpc: 'eth_getLogs',
      method: 'getLogs',
      section: 'eth'
    },
    getProof: {
      description: 'Returns proof for account and storage.',
      params: [
        {
          name: 'address',
          type: 'H160'
        },
        {
          name: 'storageKeys',
          type: 'Vec<H256>'
        },
        {
          name: 'number',
          type: 'BlockNumber'
        }
      ],
      type: 'EthAccount',
      isSubscription: false,
      jsonrpc: 'eth_getProof',
      method: 'getProof',
      section: 'eth'
    },
    getStorageAt: {
      description: 'Returns content of the storage at given address.',
      params: [
        {
          name: 'address',
          type: 'H160'
        },
        {
          name: 'index',
          type: 'U256'
        },
        {
          isHistoric: true,
          isOptional: true,
          name: 'number',
          type: 'BlockNumber'
        }
      ],
      type: 'H256',
      isSubscription: false,
      jsonrpc: 'eth_getStorageAt',
      method: 'getStorageAt',
      section: 'eth'
    },
    getTransactionByBlockHashAndIndex: {
      description: 'Returns transaction at given block hash and index.',
      params: [
        {
          name: 'hash',
          type: 'H256'
        },
        {
          name: 'index',
          type: 'U256'
        }
      ],
      type: 'EthTransaction',
      isSubscription: false,
      jsonrpc: 'eth_getTransactionByBlockHashAndIndex',
      method: 'getTransactionByBlockHashAndIndex',
      section: 'eth'
    },
    getTransactionByBlockNumberAndIndex: {
      description: 'Returns transaction by given block number and index.',
      params: [
        {
          name: 'number',
          type: 'BlockNumber'
        },
        {
          name: 'index',
          type: 'U256'
        }
      ],
      type: 'EthTransaction',
      isSubscription: false,
      jsonrpc: 'eth_getTransactionByBlockNumberAndIndex',
      method: 'getTransactionByBlockNumberAndIndex',
      section: 'eth'
    },
    getTransactionByHash: {
      description: 'Get transaction by its hash.',
      params: [
        {
          name: 'hash',
          type: 'H256'
        }
      ],
      type: 'EthTransaction',
      isSubscription: false,
      jsonrpc: 'eth_getTransactionByHash',
      method: 'getTransactionByHash',
      section: 'eth'
    },
    getTransactionCount: {
      description: 'Returns the number of transactions sent from given address at given time (block number).',
      params: [
        {
          name: 'hash',
          type: 'H256'
        },
        {
          isHistoric: true,
          isOptional: true,
          name: 'number',
          type: 'BlockNumber'
        }
      ],
      type: 'U256',
      isSubscription: false,
      jsonrpc: 'eth_getTransactionCount',
      method: 'getTransactionCount',
      section: 'eth'
    },
    getTransactionReceipt: {
      description: 'Returns transaction receipt by transaction hash.',
      params: [
        {
          name: 'hash',
          type: 'H256'
        }
      ],
      type: 'EthReceipt',
      isSubscription: false,
      jsonrpc: 'eth_getTransactionReceipt',
      method: 'getTransactionReceipt',
      section: 'eth'
    },
    getUncleByBlockHashAndIndex: {
      description: 'Returns an uncles at given block and index.',
      params: [
        {
          name: 'hash',
          type: 'H256'
        },
        {
          name: 'index',
          type: 'U256'
        }
      ],
      type: 'EthRichBlock',
      isSubscription: false,
      jsonrpc: 'eth_getUncleByBlockHashAndIndex',
      method: 'getUncleByBlockHashAndIndex',
      section: 'eth'
    },
    getUncleByBlockNumberAndIndex: {
      description: 'Returns an uncles at given block and index.',
      params: [
        {
          name: 'number',
          type: 'BlockNumber'
        },
        {
          name: 'index',
          type: 'U256'
        }
      ],
      type: 'EthRichBlock',
      isSubscription: false,
      jsonrpc: 'eth_getUncleByBlockNumberAndIndex',
      method: 'getUncleByBlockNumberAndIndex',
      section: 'eth'
    },
    getUncleCountByBlockHash: {
      description: 'Returns the number of uncles in a block with given hash.',
      params: [
        {
          name: 'hash',
          type: 'H256'
        }
      ],
      type: 'U256',
      isSubscription: false,
      jsonrpc: 'eth_getUncleCountByBlockHash',
      method: 'getUncleCountByBlockHash',
      section: 'eth'
    },
    getUncleCountByBlockNumber: {
      description: 'Returns the number of uncles in a block with given block number.',
      params: [
        {
          name: 'number',
          type: 'BlockNumber'
        }
      ],
      type: 'U256',
      isSubscription: false,
      jsonrpc: 'eth_getUncleCountByBlockNumber',
      method: 'getUncleCountByBlockNumber',
      section: 'eth'
    },
    getWork: {
      description: 'Returns the hash of the current block, the seedHash, and the boundary condition to be met.',
      params: [],
      type: 'EthWork',
      isSubscription: false,
      jsonrpc: 'eth_getWork',
      method: 'getWork',
      section: 'eth'
    },
    hashrate: {
      description: 'Returns the number of hashes per second that the node is mining with.',
      params: [],
      type: 'U256',
      isSubscription: false,
      jsonrpc: 'eth_hashrate',
      method: 'hashrate',
      section: 'eth'
    },
    maxPriorityFeePerGas: {
      description: 'Returns max priority fee per gas',
      params: [],
      type: 'U256',
      isSubscription: false,
      jsonrpc: 'eth_maxPriorityFeePerGas',
      method: 'maxPriorityFeePerGas',
      section: 'eth'
    },
    mining: {
      description: 'Returns true if client is actively mining new blocks.',
      params: [],
      type: 'bool',
      isSubscription: false,
      jsonrpc: 'eth_mining',
      method: 'mining',
      section: 'eth'
    },
    newBlockFilter: {
      description: 'Returns id of new block filter.',
      params: [],
      type: 'U256',
      isSubscription: false,
      jsonrpc: 'eth_newBlockFilter',
      method: 'newBlockFilter',
      section: 'eth'
    },
    newFilter: {
      description: 'Returns id of new filter.',
      params: [
        {
          name: 'filter',
          type: 'EthFilter'
        }
      ],
      type: 'U256',
      isSubscription: false,
      jsonrpc: 'eth_newFilter',
      method: 'newFilter',
      section: 'eth'
    },
    newPendingTransactionFilter: {
      description: 'Returns id of new block filter.',
      params: [],
      type: 'U256',
      isSubscription: false,
      jsonrpc: 'eth_newPendingTransactionFilter',
      method: 'newPendingTransactionFilter',
      section: 'eth'
    },
    protocolVersion: {
      description: 'Returns protocol version encoded as a string (quotes are necessary).',
      params: [],
      type: 'u64',
      isSubscription: false,
      jsonrpc: 'eth_protocolVersion',
      method: 'protocolVersion',
      section: 'eth'
    },
    sendRawTransaction: {
      description: 'Sends signed transaction, returning its hash.',
      params: [
        {
          name: 'bytes',
          type: 'Bytes'
        }
      ],
      type: 'H256',
      isSubscription: false,
      jsonrpc: 'eth_sendRawTransaction',
      method: 'sendRawTransaction',
      section: 'eth'
    },
    sendTransaction: {
      description: 'Sends transaction; will block waiting for signer to return the transaction hash',
      params: [
        {
          name: 'tx',
          type: 'EthTransactionRequest'
        }
      ],
      type: 'H256',
      isSubscription: false,
      jsonrpc: 'eth_sendTransaction',
      method: 'sendTransaction',
      section: 'eth'
    },
    submitHashrate: {
      description: 'Used for submitting mining hashrate.',
      params: [
        {
          name: 'index',
          type: 'U256'
        },
        {
          name: 'hash',
          type: 'H256'
        }
      ],
      type: 'bool',
      isSubscription: false,
      jsonrpc: 'eth_submitHashrate',
      method: 'submitHashrate',
      section: 'eth'
    },
    submitWork: {
      description: 'Used for submitting a proof-of-work solution.',
      params: [
        {
          name: 'nonce',
          type: 'H64'
        },
        {
          name: 'headerHash',
          type: 'H256'
        },
        {
          name: 'mixDigest',
          type: 'H256'
        }
      ],
      type: 'bool',
      isSubscription: false,
      jsonrpc: 'eth_submitWork',
      method: 'submitWork',
      section: 'eth'
    },
    subscribe: {
      description: 'Subscribe to Eth subscription.',
      params: [
        {
          name: 'kind',
          type: 'EthSubKind'
        },
        {
          isOptional: true,
          name: 'params',
          type: 'EthSubParams'
        }
      ],
      pubsub: ['subscription', 'subscribe', 'unsubscribe'],
      type: 'Null',
      isSubscription: true,
      jsonrpc: 'eth_subscribe',
      method: 'subscribe',
      section: 'eth'
    },
    syncing: {
      description: 'Returns an object with data about the sync status or false.',
      params: [],
      type: 'EthSyncStatus',
      isSubscription: false,
      jsonrpc: 'eth_syncing',
      method: 'syncing',
      section: 'eth'
    },
    uninstallFilter: {
      description: 'Uninstalls filter.',
      params: [
        {
          name: 'index',
          type: 'U256'
        }
      ],
      type: 'bool',
      isSubscription: false,
      jsonrpc: 'eth_uninstallFilter',
      method: 'uninstallFilter',
      section: 'eth'
    }
  },
  rpc: {
    methods: {
      description: 'Retrieves the list of RPC methods that are exposed by the node',
      params: [],
      type: 'RpcMethods',
      isSubscription: false,
      jsonrpc: 'rpc_methods',
      method: 'methods',
      section: 'rpc'
    }
  },
  author: {
    hasKey: {
      description: 'Returns true if the keystore has private keys for the given public key and key type.',
      params: [
        {
          name: 'publicKey',
          type: 'Bytes'
        },
        {
          name: 'keyType',
          type: 'Text'
        }
      ],
      type: 'bool',
      isSubscription: false,
      jsonrpc: 'author_hasKey',
      method: 'hasKey',
      section: 'author'
    },
    hasSessionKeys: {
      description: 'Returns true if the keystore has private keys for the given session public keys.',
      params: [
        {
          name: 'sessionKeys',
          type: 'Bytes'
        }
      ],
      type: 'bool',
      isSubscription: false,
      jsonrpc: 'author_hasSessionKeys',
      method: 'hasSessionKeys',
      section: 'author'
    },
    insertKey: {
      description: 'Insert a key into the keystore.',
      params: [
        {
          name: 'keyType',
          type: 'Text'
        },
        {
          name: 'suri',
          type: 'Text'
        },
        {
          name: 'publicKey',
          type: 'Bytes'
        }
      ],
      type: 'Bytes',
      isSubscription: false,
      jsonrpc: 'author_insertKey',
      method: 'insertKey',
      section: 'author'
    },
    pendingExtrinsics: {
      description: 'Returns all pending extrinsics, potentially grouped by sender',
      params: [],
      type: 'Vec<Extrinsic>',
      isSubscription: false,
      jsonrpc: 'author_pendingExtrinsics',
      method: 'pendingExtrinsics',
      section: 'author'
    },
    removeExtrinsic: {
      description: 'Remove given extrinsic from the pool and temporarily ban it to prevent reimporting',
      params: [
        {
          name: 'bytesOrHash',
          type: 'Vec<ExtrinsicOrHash>'
        }
      ],
      type: 'Vec<Hash>',
      isSubscription: false,
      jsonrpc: 'author_removeExtrinsic',
      method: 'removeExtrinsic',
      section: 'author'
    },
    rotateKeys: {
      description: 'Generate new session keys and returns the corresponding public keys',
      params: [],
      type: 'Bytes',
      isSubscription: false,
      jsonrpc: 'author_rotateKeys',
      method: 'rotateKeys',
      section: 'author'
    },
    submitAndWatchExtrinsic: {
      description: 'Submit and subscribe to watch an extrinsic until unsubscribed',
      isSigned: true,
      params: [
        {
          name: 'extrinsic',
          type: 'Extrinsic'
        }
      ],
      pubsub: ['extrinsicUpdate', 'submitAndWatchExtrinsic', 'unwatchExtrinsic'],
      type: 'ExtrinsicStatus',
      isSubscription: true,
      jsonrpc: 'author_submitAndWatchExtrinsic',
      method: 'submitAndWatchExtrinsic',
      section: 'author'
    },
    submitExtrinsic: {
      description: 'Submit a fully formatted extrinsic for block inclusion',
      isSigned: true,
      params: [
        {
          name: 'extrinsic',
          type: 'Extrinsic'
        }
      ],
      type: 'Hash',
      isSubscription: false,
      jsonrpc: 'author_submitExtrinsic',
      method: 'submitExtrinsic',
      section: 'author'
    }
  },
  chain: {
    getBlock: {
      description: 'Get header and body of a relay chain block',
      params: [
        {
          isHistoric: true,
          isOptional: true,
          name: 'hash',
          type: 'BlockHash'
        }
      ],
      type: 'SignedBlock',
      isSubscription: false,
      jsonrpc: 'chain_getBlock',
      method: 'getBlock',
      section: 'chain'
    },
    getBlockHash: {
      description: 'Get the block hash for a specific block',
      params: [
        {
          isOptional: true,
          name: 'blockNumber',
          type: 'BlockNumber'
        }
      ],
      type: 'BlockHash',
      isSubscription: false,
      jsonrpc: 'chain_getBlockHash',
      method: 'getBlockHash',
      section: 'chain'
    },
    getFinalizedHead: {
      alias: ['chain_getFinalisedHead'],
      description: 'Get hash of the last finalized block in the canon chain',
      params: [],
      type: 'BlockHash',
      isSubscription: false,
      jsonrpc: 'chain_getFinalizedHead',
      method: 'getFinalizedHead',
      section: 'chain'
    },
    getHeader: {
      alias: ['chain_getHead'],
      description: 'Retrieves the header for a specific block',
      params: [
        {
          isHistoric: true,
          isOptional: true,
          name: 'hash',
          type: 'BlockHash'
        }
      ],
      type: 'Header',
      isSubscription: false,
      jsonrpc: 'chain_getHeader',
      method: 'getHeader',
      section: 'chain'
    },
    subscribeAllHeads: {
      description: 'Retrieves the newest header via subscription',
      params: [],
      pubsub: ['allHead', 'subscribeAllHeads', 'unsubscribeAllHeads'],
      type: 'Header',
      isSubscription: true,
      jsonrpc: 'chain_subscribeAllHeads',
      method: 'subscribeAllHeads',
      section: 'chain'
    },
    subscribeFinalizedHeads: {
      alias: ['chain_subscribeFinalisedHeads', 'chain_unsubscribeFinalisedHeads'],
      description: 'Retrieves the best finalized header via subscription',
      params: [],
      pubsub: ['finalizedHead', 'subscribeFinalizedHeads', 'unsubscribeFinalizedHeads'],
      type: 'Header',
      isSubscription: true,
      jsonrpc: 'chain_subscribeFinalizedHeads',
      method: 'subscribeFinalizedHeads',
      section: 'chain'
    },
    subscribeNewHeads: {
      alias: ['chain_unsubscribeNewHeads', 'subscribe_newHead', 'unsubscribe_newHead'],
      description: 'Retrieves the best header via subscription',
      params: [],
      pubsub: ['newHead', 'subscribeNewHead', 'unsubscribeNewHead'],
      type: 'Header',
      isSubscription: true,
      jsonrpc: 'chain_subscribeNewHeads',
      method: 'subscribeNewHeads',
      section: 'chain'
    }
  },
  childstate: {
    getKeys: {
      description: 'Returns the keys with prefix from a child storage, leave empty to get all the keys',
      params: [
        {
          name: 'childKey',
          type: 'PrefixedStorageKey'
        },
        {
          name: 'prefix',
          type: 'StorageKey'
        },
        {
          isHistoric: true,
          isOptional: true,
          name: 'at',
          type: 'Hash'
        }
      ],
      type: 'Vec<StorageKey>',
      isSubscription: false,
      jsonrpc: 'childstate_getKeys',
      method: 'getKeys',
      section: 'childstate'
    },
    getKeysPaged: {
      alias: ['childstate_getKeysPagedAt'],
      description: 'Returns the keys with prefix from a child storage with pagination support',
      params: [
        {
          name: 'childKey',
          type: 'PrefixedStorageKey'
        },
        {
          name: 'prefix',
          type: 'StorageKey'
        },
        {
          name: 'count',
          type: 'u32'
        },
        {
          isOptional: true,
          name: 'startKey',
          type: 'StorageKey'
        },
        {
          isHistoric: true,
          isOptional: true,
          name: 'at',
          type: 'Hash'
        }
      ],
      type: 'Vec<StorageKey>',
      isSubscription: false,
      jsonrpc: 'childstate_getKeysPaged',
      method: 'getKeysPaged',
      section: 'childstate'
    },
    getStorage: {
      description: 'Returns a child storage entry at a specific block state',
      params: [
        {
          name: 'childKey',
          type: 'PrefixedStorageKey'
        },
        {
          name: 'key',
          type: 'StorageKey'
        },
        {
          isHistoric: true,
          isOptional: true,
          name: 'at',
          type: 'Hash'
        }
      ],
      type: 'Option<StorageData>',
      isSubscription: false,
      jsonrpc: 'childstate_getStorage',
      method: 'getStorage',
      section: 'childstate'
    },
    getStorageEntries: {
      description: 'Returns child storage entries for multiple keys at a specific block state',
      params: [
        {
          name: 'childKey',
          type: 'PrefixedStorageKey'
        },
        {
          name: 'keys',
          type: 'Vec<StorageKey>'
        },
        {
          isHistoric: true,
          isOptional: true,
          name: 'at',
          type: 'Hash'
        }
      ],
      type: 'Vec<Option<StorageData>>',
      isSubscription: false,
      jsonrpc: 'childstate_getStorageEntries',
      method: 'getStorageEntries',
      section: 'childstate'
    },
    getStorageHash: {
      description: 'Returns the hash of a child storage entry at a block state',
      params: [
        {
          name: 'childKey',
          type: 'PrefixedStorageKey'
        },
        {
          name: 'key',
          type: 'StorageKey'
        },
        {
          isHistoric: true,
          isOptional: true,
          name: 'at',
          type: 'Hash'
        }
      ],
      type: 'Option<Hash>',
      isSubscription: false,
      jsonrpc: 'childstate_getStorageHash',
      method: 'getStorageHash',
      section: 'childstate'
    },
    getStorageSize: {
      description: 'Returns the size of a child storage entry at a block state',
      params: [
        {
          name: 'childKey',
          type: 'PrefixedStorageKey'
        },
        {
          name: 'key',
          type: 'StorageKey'
        },
        {
          isHistoric: true,
          isOptional: true,
          name: 'at',
          type: 'Hash'
        }
      ],
      type: 'Option<u64>',
      isSubscription: false,
      jsonrpc: 'childstate_getStorageSize',
      method: 'getStorageSize',
      section: 'childstate'
    }
  },
  offchain: {
    localStorageGet: {
      description: 'Get offchain local storage under given key and prefix',
      params: [
        {
          name: 'kind',
          type: 'StorageKind'
        },
        {
          name: 'key',
          type: 'Bytes'
        }
      ],
      type: 'Option<Bytes>',
      isSubscription: false,
      jsonrpc: 'offchain_localStorageGet',
      method: 'localStorageGet',
      section: 'offchain'
    },
    localStorageSet: {
      description: 'Set offchain local storage under given key and prefix',
      params: [
        {
          name: 'kind',
          type: 'StorageKind'
        },
        {
          name: 'key',
          type: 'Bytes'
        },
        {
          name: 'value',
          type: 'Bytes'
        }
      ],
      type: 'Null',
      isSubscription: false,
      jsonrpc: 'offchain_localStorageSet',
      method: 'localStorageSet',
      section: 'offchain'
    }
  },
  payment: {
    queryFeeDetails: {
      description: 'Query the detailed fee of a given encoded extrinsic',
      params: [
        {
          name: 'extrinsic',
          type: 'Bytes'
        },
        {
          isHistoric: true,
          isOptional: true,
          name: 'at',
          type: 'BlockHash'
        }
      ],
      type: 'FeeDetails',
      isSubscription: false,
      jsonrpc: 'payment_queryFeeDetails',
      method: 'queryFeeDetails',
      section: 'payment'
    },
    queryInfo: {
      description: 'Retrieves the fee information for an encoded extrinsic',
      params: [
        {
          name: 'extrinsic',
          type: 'Bytes'
        },
        {
          isHistoric: true,
          isOptional: true,
          name: 'at',
          type: 'BlockHash'
        }
      ],
      type: 'RuntimeDispatchInfo',
      isSubscription: false,
      jsonrpc: 'payment_queryInfo',
      method: 'queryInfo',
      section: 'payment'
    }
  },
  state: {
    call: {
      alias: ['state_callAt'],
      description: 'Perform a call to a builtin on the chain',
      params: [
        {
          name: 'method',
          type: 'Text'
        },
        {
          name: 'data',
          type: 'Bytes'
        },
        {
          isHistoric: true,
          isOptional: true,
          name: 'at',
          type: 'BlockHash'
        }
      ],
      type: 'Bytes',
      isSubscription: false,
      jsonrpc: 'state_call',
      method: 'call',
      section: 'state'
    },
    getChildKeys: {
      description: 'Retrieves the keys with prefix of a specific child storage',
      params: [
        {
          name: 'childStorageKey',
          type: 'StorageKey'
        },
        {
          name: 'childDefinition',
          type: 'StorageKey'
        },
        {
          name: 'childType',
          type: 'u32'
        },
        {
          name: 'key',
          type: 'StorageKey'
        },
        {
          isHistoric: true,
          isOptional: true,
          name: 'at',
          type: 'BlockHash'
        }
      ],
      type: 'Vec<StorageKey>',
      isSubscription: false,
      jsonrpc: 'state_getChildKeys',
      method: 'getChildKeys',
      section: 'state'
    },
    getChildReadProof: {
      description: 'Returns proof of storage for child key entries at a specific block state.',
      params: [
        {
          name: 'childStorageKey',
          type: 'PrefixedStorageKey'
        },
        {
          name: 'keys',
          type: 'Vec<StorageKey>'
        },
        {
          isHistoric: true,
          isOptional: true,
          name: 'at',
          type: 'BlockHash'
        }
      ],
      type: 'ReadProof',
      isSubscription: false,
      jsonrpc: 'state_getChildReadProof',
      method: 'getChildReadProof',
      section: 'state'
    },
    getChildStorage: {
      description: 'Retrieves the child storage for a key',
      params: [
        {
          name: 'childStorageKey',
          type: 'StorageKey'
        },
        {
          name: 'childDefinition',
          type: 'StorageKey'
        },
        {
          name: 'childType',
          type: 'u32'
        },
        {
          name: 'key',
          type: 'StorageKey'
        },
        {
          isHistoric: true,
          isOptional: true,
          name: 'at',
          type: 'BlockHash'
        }
      ],
      type: 'StorageData',
      isSubscription: false,
      jsonrpc: 'state_getChildStorage',
      method: 'getChildStorage',
      section: 'state'
    },
    getChildStorageHash: {
      description: 'Retrieves the child storage hash',
      params: [
        {
          name: 'childStorageKey',
          type: 'StorageKey'
        },
        {
          name: 'childDefinition',
          type: 'StorageKey'
        },
        {
          name: 'childType',
          type: 'u32'
        },
        {
          name: 'key',
          type: 'StorageKey'
        },
        {
          isHistoric: true,
          isOptional: true,
          name: 'at',
          type: 'BlockHash'
        }
      ],
      type: 'Hash',
      isSubscription: false,
      jsonrpc: 'state_getChildStorageHash',
      method: 'getChildStorageHash',
      section: 'state'
    },
    getChildStorageSize: {
      description: 'Retrieves the child storage size',
      params: [
        {
          name: 'childStorageKey',
          type: 'StorageKey'
        },
        {
          name: 'childDefinition',
          type: 'StorageKey'
        },
        {
          name: 'childType',
          type: 'u32'
        },
        {
          name: 'key',
          type: 'StorageKey'
        },
        {
          isHistoric: true,
          isOptional: true,
          name: 'at',
          type: 'BlockHash'
        }
      ],
      type: 'u64',
      isSubscription: false,
      jsonrpc: 'state_getChildStorageSize',
      method: 'getChildStorageSize',
      section: 'state'
    },
    getKeys: {
      description: 'Retrieves the keys with a certain prefix',
      params: [
        {
          name: 'key',
          type: 'StorageKey'
        },
        {
          isHistoric: true,
          isOptional: true,
          name: 'at',
          type: 'BlockHash'
        }
      ],
      type: 'Vec<StorageKey>',
      isSubscription: false,
      jsonrpc: 'state_getKeys',
      method: 'getKeys',
      section: 'state'
    },
    getKeysPaged: {
      alias: ['state_getKeysPagedAt'],
      description: 'Returns the keys with prefix with pagination support.',
      params: [
        {
          name: 'key',
          type: 'StorageKey'
        },
        {
          name: 'count',
          type: 'u32'
        },
        {
          isOptional: true,
          name: 'startKey',
          type: 'StorageKey'
        },
        {
          isHistoric: true,
          isOptional: true,
          name: 'at',
          type: 'BlockHash'
        }
      ],
      type: 'Vec<StorageKey>',
      isSubscription: false,
      jsonrpc: 'state_getKeysPaged',
      method: 'getKeysPaged',
      section: 'state'
    },
    getMetadata: {
      description: 'Returns the runtime metadata',
      params: [
        {
          isHistoric: true,
          isOptional: true,
          name: 'at',
          type: 'BlockHash'
        }
      ],
      type: 'Metadata',
      isSubscription: false,
      jsonrpc: 'state_getMetadata',
      method: 'getMetadata',
      section: 'state'
    },
    getPairs: {
      description: 'Returns the keys with prefix, leave empty to get all the keys (deprecated: Use getKeysPaged)',
      params: [
        {
          name: 'prefix',
          type: 'StorageKey'
        },
        {
          isHistoric: true,
          isOptional: true,
          name: 'at',
          type: 'BlockHash'
        }
      ],
      type: 'Vec<KeyValue>',
      isSubscription: false,
      jsonrpc: 'state_getPairs',
      method: 'getPairs',
      section: 'state'
    },
    getReadProof: {
      description: 'Returns proof of storage entries at a specific block state',
      params: [
        {
          name: 'keys',
          type: 'Vec<StorageKey>'
        },
        {
          isHistoric: true,
          isOptional: true,
          name: 'at',
          type: 'BlockHash'
        }
      ],
      type: 'ReadProof',
      isSubscription: false,
      jsonrpc: 'state_getReadProof',
      method: 'getReadProof',
      section: 'state'
    },
    getRuntimeVersion: {
      alias: ['chain_getRuntimeVersion'],
      description: 'Get the runtime version',
      params: [
        {
          isHistoric: true,
          isOptional: true,
          name: 'at',
          type: 'BlockHash'
        }
      ],
      type: 'RuntimeVersion',
      isSubscription: false,
      jsonrpc: 'state_getRuntimeVersion',
      method: 'getRuntimeVersion',
      section: 'state'
    },
    getStorage: {
      alias: ['state_getStorageAt'],
      description: 'Retrieves the storage for a key',
      params: [
        {
          name: 'key',
          type: 'StorageKey'
        },
        {
          isHistoric: true,
          isOptional: true,
          name: 'at',
          type: 'BlockHash'
        }
      ],
      type: 'StorageData',
      isSubscription: false,
      jsonrpc: 'state_getStorage',
      method: 'getStorage',
      section: 'state'
    },
    getStorageHash: {
      alias: ['state_getStorageHashAt'],
      description: 'Retrieves the storage hash',
      params: [
        {
          name: 'key',
          type: 'StorageKey'
        },
        {
          isHistoric: true,
          isOptional: true,
          name: 'at',
          type: 'BlockHash'
        }
      ],
      type: 'Hash',
      isSubscription: false,
      jsonrpc: 'state_getStorageHash',
      method: 'getStorageHash',
      section: 'state'
    },
    getStorageSize: {
      alias: ['state_getStorageSizeAt'],
      description: 'Retrieves the storage size',
      params: [
        {
          name: 'key',
          type: 'StorageKey'
        },
        {
          isHistoric: true,
          isOptional: true,
          name: 'at',
          type: 'BlockHash'
        }
      ],
      type: 'u64',
      isSubscription: false,
      jsonrpc: 'state_getStorageSize',
      method: 'getStorageSize',
      section: 'state'
    },
    queryStorage: {
      description: 'Query historical storage entries (by key) starting from a start block',
      params: [
        {
          name: 'keys',
          type: 'Vec<StorageKey>'
        },
        {
          name: 'fromBlock',
          type: 'Hash'
        },
        {
          isOptional: true,
          name: 'toBlock',
          type: 'BlockHash'
        }
      ],
      type: 'Vec<StorageChangeSet>',
      isSubscription: false,
      jsonrpc: 'state_queryStorage',
      method: 'queryStorage',
      section: 'state'
    },
    queryStorageAt: {
      description: 'Query storage entries (by key) starting at block hash given as the second parameter',
      params: [
        {
          name: 'keys',
          type: 'Vec<StorageKey>'
        },
        {
          isHistoric: true,
          isOptional: true,
          name: 'at',
          type: 'BlockHash'
        }
      ],
      type: 'Vec<StorageChangeSet>',
      isSubscription: false,
      jsonrpc: 'state_queryStorageAt',
      method: 'queryStorageAt',
      section: 'state'
    },
    subscribeRuntimeVersion: {
      alias: ['chain_subscribeRuntimeVersion', 'chain_unsubscribeRuntimeVersion'],
      description: 'Retrieves the runtime version via subscription',
      params: [],
      pubsub: ['runtimeVersion', 'subscribeRuntimeVersion', 'unsubscribeRuntimeVersion'],
      type: 'RuntimeVersion',
      isSubscription: true,
      jsonrpc: 'state_subscribeRuntimeVersion',
      method: 'subscribeRuntimeVersion',
      section: 'state'
    },
    subscribeStorage: {
      description: 'Subscribes to storage changes for the provided keys',
      params: [
        {
          isOptional: true,
          name: 'keys',
          type: 'Vec<StorageKey>'
        }
      ],
      pubsub: ['storage', 'subscribeStorage', 'unsubscribeStorage'],
      type: 'StorageChangeSet',
      isSubscription: true,
      jsonrpc: 'state_subscribeStorage',
      method: 'subscribeStorage',
      section: 'state'
    },
    traceBlock: {
      description: 'Provides a way to trace the re-execution of a single block',
      params: [
        {
          name: 'block',
          type: 'Hash'
        },
        {
          name: 'targets',
          type: 'Option<Text>'
        },
        {
          name: 'storageKeys',
          type: 'Option<Text>'
        },
        {
          name: 'methods',
          type: 'Option<Text>'
        }
      ],
      type: 'TraceBlockResponse',
      isSubscription: false,
      jsonrpc: 'state_traceBlock',
      method: 'traceBlock',
      section: 'state'
    },
    trieMigrationStatus: {
      description: 'Check current migration state',
      params: [
        {
          isHistoric: true,
          isOptional: true,
          name: 'at',
          type: 'BlockHash'
        }
      ],
      type: 'MigrationStatusResult',
      isSubscription: false,
      jsonrpc: 'state_trieMigrationStatus',
      method: 'trieMigrationStatus',
      section: 'state'
    }
  }
};

export default mockJsonRpc;
