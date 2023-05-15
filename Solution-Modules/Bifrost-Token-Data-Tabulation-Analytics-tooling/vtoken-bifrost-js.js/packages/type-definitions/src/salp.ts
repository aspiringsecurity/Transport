export default {
  rpc: {
    getContribution: {
      description: 'salp getContribution',
      params: [
        {
          name: 'index',
          type: 'ParaId'
        },
        {
          name: 'who',
          type: 'AccountIdOf'
        }
      ],
      type: '(Balance, ContributionStatus)'
    },
    getLiteContribution: {
      description: 'salp getLiteContribution',
      params: [
        {
          name: 'index',
          type: 'ParaId'
        },
        {
          name: 'who',
          type: 'AccountIdOf'
        }
      ],
      type: '(Balance, ContributionStatus)'
    }
  },
  types: {
    TrieIndex: 'u32',
    FundInfo: {
      raised: 'Balance',
      cap: 'Balance',
      first_slot: 'LeasePeriod',
      last_slot: 'LeasePeriod',
      trie_index: 'TrieIndex',
      status: 'FundStatus'
    },
    RedeemStatus: 'BalanceOf',
    FundStatus: {
      _enum: {
        Ongoing: 0,
        Retired: 1,
        Success: 2,
        Failed: 3,
        RefundWithdrew: 4,
        RedeemWithdrew: 5,
        End: 6
      }
    },
    ContributionStatus: {
      _enum: ['Idle', 'Refunded', 'Redeemed', 'Unlocked', 'MigratedIdle', 'Contributing']
    },
    CrowdloanContributeCall: {
      _enum: {
        CrowdloanContribute: 'ContributeCall'
      }
    },
    ContributeCall: {
      _enum: {
        Contribute: 'Contribution'
      }
    },
    Contribution: {
      index: 'ParaId',
      value: 'BalanceOf',
      signature: 'Option<MultiSignature>'
    },
    Withdraw: {
      who: 'AccountIdOf',
      index: 'ParaId'
    },
    WithdrawCall: {
      _enum: {
        Withdraw: 'Withdraw'
      }
    },
    ParachainTransactProxyType: {
      _enum: {
        Primary: 0,
        Derived: 1
      }
    },
    ParachainDerivedProxyAccountType: {
      _enum: {
        Salp: 0,
        Staking: 1
      }
    },
    Keys: 'SessionKeys1',
    ParachainTransactType: {
      _enum: {
        Xcm: 0,
        Proxy: 1
      }
    },
    RpcContributionStatus: {
      _enum: {
        Idle: 0,
        Contributing: 1,
        Refunded: 2,
        Unlocked: 3,
        Redeemed: 4
      }
    }
  }
};
