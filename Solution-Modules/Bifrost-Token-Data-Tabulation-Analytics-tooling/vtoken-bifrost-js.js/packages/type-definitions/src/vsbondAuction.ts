export default {
  rpc: {},
  types: {
    OrderInfo: {
      owner: 'AccountIdOf',
      vsbond: 'CurrencyId',
      amount: 'BalanceOf',
      remain: 'BalanceOf',
      total_price: 'BalanceOf',
      order_id: 'OrderId',
      order_type: 'OrderType',
      remain_price: 'BalanceOf'
    },
    OrderId: 'u64',
    OrderType: {
      _enum: {
        Sell: 0,
        Buy: 1
      }
    }
  }
};
