export default {
  rpc: {},
  types: {
    TokenSymbol: {
      _enum: {
        ASG: 0,
        BNC: 1,
        KUSD: 2,
        DOT: 3,
        KSM: 4,
        ETH: 5,
        KAR: 6,
        ZLK: 7,
        PHA: 8,
        RMRK: 9,
        MOVR: 10,
        GLMR: 11
      }
    },
    CurrencyId: {
      _enum: {
        Native: 'TokenSymbol',
        VToken: 'TokenSymbol',
        Token: 'TokenSymbol',
        Stable: 'TokenSymbol',
        VSToken: 'TokenSymbol',
        VSBond: '(TokenSymbol, ParaId, LeasePeriod, LeasePeriod)',
        LPToken: '(TokenSymbol, u8, TokenSymbol, u8)',
        ForeignAsset:'u32',
        Token2:'u8',
        VToken2:'u8',
        VSToken2:'u8',
        VSBond2:'u8',
        StableLpToken:'u32'
      }
    },
    CurrencyIdOf: 'CurrencyId',
    TAssetBalance: 'Balance',
    AmountOf: 'Balance',
    StorageVersion: 'Releases',
    ShareWeight: 'Balance',
    Currency: 'CurrencyIdOf',
    Amount: 'AmountOf',
    NodePrimitivesCurrencyCurrencyId: 'CurrencyId',
    OrmlTokensBalanceLock: 'BalanceLock',
    OrmlTokensAccountData: 'OrmlAccountData',
    OrmlTokensReserveData:'(Currency, u8, Amount, u128)',
    TransferOriginType: {
      _enum: {
        FromSelf: 0,
        FromRelayChain: 1,
        FromSiblingParaChain: 2
      }
    },
    TimeUnit: {
      Era:'u32',
      SlashingSpan:'u32',
      Round:'u32',
      Kblock:'u32'
    },
    MinimumsMaximums: {
      delegator_bonded_minimum:'Balance',
      bond_extra_minimum:'Balance',
      unbond_minimum:'Balance',
      rebond_minimum:'Balance',
      unbond_record_maximum:'u32',
      validators_back_maximum:'u32',
      delegator_active_staking_maximum:'Balance',
      validators_reward_maximum:'u32',
      delegation_amount_minimum:'Balance',
      delegators_maximum:'u16',
      validators_maximum:'u16'
    }
  }
};
