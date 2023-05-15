export default {
  rpc: {
    getFeeTokenAndAmount: {
      description: 'Get charging token type and amount in terms of flexible transaction fee.',
      params: [
        {
          name: 'who',
          type: 'AccountId'
        },
        {
          name: 'extrinsic',
          type: 'Bytes'
        },
        {
          name: 'at',
          type: 'BlockHash',
          isHistoric: true,
          isOptional: true
        }
      ],
      type: '(CurrencyId, U256)'
    }
  },
  types: {
    PalletBalanceOf: 'Balance',
    ExtraFeeName: {
      _enum: ['SalpContribute', 'NoExtraFee']
    }
  }
};
