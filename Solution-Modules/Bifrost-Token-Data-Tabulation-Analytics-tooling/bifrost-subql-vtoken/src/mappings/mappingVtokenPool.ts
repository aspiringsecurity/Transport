import { SubstrateBlock } from "@subql/types";
import { Balance, AccountData, AccountId } from "@polkadot/types/interfaces";
import { CurrencyId } from "@bifrost-finance/types/interfaces";
import { getDayStartUnix, get7DayStartUnix, tokenSplit } from '../common';
import { MintPriceDayData } from "../types/models/MintPriceDayData";
import { Apr } from "../types/models/Apr";
import { Revenue } from "../types/models/Revenue";
import { MktPriceDayData } from "../types/models/MktPriceDayData";

const tokens = ["ASG", "aUSD", "DOT", "vDOT", "KSM", "vKSM", "ETH", "vETH"]; // , "EOS", "vEOS", "IOST", "vIOST"
const vTokens = ["vDOT", "vKSM", "vETH"]; // "vEOS", "vIOST"
const unit = BigInt(1000000000000);
// const native_tokens = ["ASG", "aUSD", "DOT", "KSM", "ETH"];

export async function vtokenPoolBlock(block: SubstrateBlock): Promise<void> {
  if (block.block.header.number.toNumber() % 10 !== 0) { return }
  for (let i = 0; i < tokens.length; i++) {
    const currency_id = tokens[i];
    const [currency_id_token, currency_id_vtoken, token_type, native_currency_id] = tokenSplit(currency_id);
    let recordDailyMintPrice = await MintPriceDayData.get(currency_id + '@' + getDayStartUnix(block));
    if (recordDailyMintPrice === undefined) { // 如果此块所处当日还未记录mintprice（说明此块是当日第一个块），则记录一下
      const token_pool = ((await api.query.vtokenMint.mintPool((JSON.parse(native_currency_id)) as CurrencyId).catch(e => { console.log(e) })) as Balance).toBigInt();
      let recordMintPriceDayData = new MintPriceDayData(currency_id + '@' + getDayStartUnix(block));
      recordMintPriceDayData.pool = token_pool;
      recordMintPriceDayData.currencyId = currency_id;
      recordMintPriceDayData.time = block.timestamp;
      recordMintPriceDayData.blockHeight = block.block.header.number.toBigInt();
      if (token_type === 'token') {
        let vtoken = await MintPriceDayData.get(currency_id_vtoken + '@' + getDayStartUnix(block));
        if (vtoken === undefined || vtoken.pool === BigInt(0)) { recordMintPriceDayData.price = BigInt(0); }
        else { recordMintPriceDayData.price = recordMintPriceDayData.pool * unit / vtoken.pool }
      } else if (token_type === 'vToken') {
        let token = await MintPriceDayData.get(currency_id_token + '@' + getDayStartUnix(block));
        if (token === undefined || recordMintPriceDayData.pool === BigInt(0)) { recordMintPriceDayData.price = BigInt(0); }
        else { recordMintPriceDayData.price = token.pool * unit / recordMintPriceDayData.pool }
      }
      await recordMintPriceDayData.save().catch(e => { console.log(e) });
    } else if (recordDailyMintPrice.time.getTime() < block.timestamp.getTime()) {
      const token_pool = ((await api.query.vtokenMint.mintPool((JSON.parse(native_currency_id)) as CurrencyId).catch(e => { console.log(e) })) as Balance).toBigInt();
      const recordDailyMintPrice = await MintPriceDayData.get(currency_id + '@' + getDayStartUnix(block));
      recordDailyMintPrice.pool = token_pool;
      recordDailyMintPrice.currencyId = currency_id;
      recordDailyMintPrice.time = block.timestamp;
      recordDailyMintPrice.blockHeight = block.block.header.number.toBigInt();
      if (token_type === 'token') {
        let vtoken = await MintPriceDayData.get(currency_id_vtoken + '@' + getDayStartUnix(block));
        if (vtoken === undefined || vtoken.pool === BigInt(0)) { recordDailyMintPrice.price = BigInt(0); }
        else { recordDailyMintPrice.price = recordDailyMintPrice.pool * unit / vtoken.pool }
      } else if (token_type === 'vToken') {
        let token = await MintPriceDayData.get(currency_id_token + '@' + getDayStartUnix(block));
        if (token === undefined || recordDailyMintPrice.pool === BigInt(0)) { recordDailyMintPrice.price = BigInt(0); }
        else { recordDailyMintPrice.price = token.pool * unit / recordDailyMintPrice.pool }
      }
      await recordDailyMintPrice.save().catch(e => { console.log(e) });
    }
  }
}

export async function aprBlock(block: SubstrateBlock): Promise<void> {
  if (block.block.header.number.toNumber() % 10 !== 0) { return }
  for (let i = 0; i < vTokens.length; i++) {
    const currency_id = vTokens[i];
    let aprResult = await Apr.get(currency_id);
    if (aprResult === undefined) {
      let recordApr = new Apr(currency_id);
      recordApr.apr = BigInt(0);
      recordApr.time = block.timestamp;
      recordApr.blockHeight = block.block.header.number.toBigInt();
      await recordApr.save().catch(e => { console.log(e) });
    } else if (aprResult.time.getTime() < block.timestamp.getTime()) {
      const recordDailyMintPrice = await MintPriceDayData.get(currency_id + '@' + get7DayStartUnix(block));
      if (recordDailyMintPrice === undefined || recordDailyMintPrice.price === BigInt(0)) {
        if (currency_id === "vETH") { aprResult.apr = BigInt(80000000000); }
        if (currency_id === "vDOT") { aprResult.apr = BigInt(139000000000); }
        if (currency_id === "vKSM") { aprResult.apr = BigInt(150000000000); }
      } else {
        const recordDailyMintPrice1 = await MintPriceDayData.get(currency_id + '@' + getDayStartUnix(block));
        aprResult.apr = (recordDailyMintPrice1.price - recordDailyMintPrice.price) * unit / BigInt(7) / recordDailyMintPrice.price * BigInt(365);
      }
      aprResult.time = block.timestamp;
      aprResult.blockHeight = block.block.header.number.toBigInt();
      await aprResult.save().catch(e => { console.log(e) });
    }
  }
}

export async function revenueBlock(block: SubstrateBlock): Promise<void> {
  if (block.block.header.number.toNumber() % 10 !== 0) { return }
  for (let i = 0; i < vTokens.length; i++) {
    const currency_id = vTokens[i];
    const [currency_id_token, currency_id_vtoken] = tokenSplit(currency_id);

    let revenueResult = await Revenue.get(currency_id);
    if (revenueResult === undefined) {
      let recordRevenue = new Revenue(currency_id);
      recordRevenue.revenue = BigInt(0);
      recordRevenue.time = block.timestamp;
      recordRevenue.blockHeight = block.block.header.number.toBigInt();
      await recordRevenue.save().catch(e => { console.log(e) });
    } else if (revenueResult.time.getTime() < block.timestamp.getTime()) {
      const tokenRecord = await MintPriceDayData.get(currency_id_token + '@' + getDayStartUnix(block));
      const vTokenRecord = await MintPriceDayData.get(currency_id_vtoken + '@' + getDayStartUnix(block));
      if (tokenRecord === undefined || vTokenRecord === undefined) { revenueResult.revenue = BigInt(0); }
      else {
        revenueResult.revenue = tokenRecord.pool - vTokenRecord.pool;
      }
      revenueResult.time = block.timestamp;
      revenueResult.blockHeight = block.block.header.number.toBigInt();
      await revenueResult.save().catch(e => { console.log(e) });
    }
  }
}

// export async function mktPriceBlock(block: SubstrateBlock): Promise<void> {
//   if (block.block.header.number.toNumber() % 10 !== 0) { return }
//   let zenlink_pairs = await api.rpc.zenlinkProtocol.getAllPairs().catch(e => { console.log(e) });
//   const pairs = JSON.parse(JSON.stringify(zenlink_pairs))
//   for (let i = 0; i < pairs.length; i++) {
//     const token0_index = pairs[i][0].asset_index;
//     const token1_index = pairs[i][1].asset_index;
//     const token0 = tokens[token0_index];
//     const token1 = tokens[token1_index];
//     let assets_to_pair = await api.query.zenlinkProtocol.getPairByAssetId(pairs[i]).catch(e => { console.log(e) });
//     if (JSON.stringify(assets_to_pair) === 'null') { continue }
//     else {
//       const address = JSON.parse(JSON.stringify(assets_to_pair)).account;
//       const token0_pool = await api.query.assets.accounts([address, { "Token": token0 }]).catch(e => { console.log(e) });
//       const token1_pool = await api.query.assets.accounts([address, { "Token": token1 }]).catch(e => { console.log(e) });
//       // console.log(token0_pool);
//       // console.log(token1_pool);
//       let recordMktPrice = new MktPriceDayData(token1 + '-' + token0 + '@' + getDayStartUnix(block));
//       if (BigInt(JSON.parse(JSON.stringify(token1_pool)).free) === BigInt(0)) { recordMktPrice.price = BigInt(0) }
//       else {
//         recordMktPrice.price = BigInt(JSON.parse(JSON.stringify(token0_pool)).free) * unit / BigInt(JSON.parse(JSON.stringify(token1_pool)).free);
//       }
//       recordMktPrice.currencyId = token1;
//       recordMktPrice.baseCurrencyId = token0;
//       recordMktPrice.time = block.timestamp;
//       recordMktPrice.blockHeight = block.block.header.number.toBigInt();
//       await recordMktPrice.save().catch(e => { console.log(e) });
//     }
//   }
// }