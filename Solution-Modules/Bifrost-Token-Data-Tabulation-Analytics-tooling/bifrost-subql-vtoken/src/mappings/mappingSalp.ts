import { SubstrateBlock, SubstrateEvent } from "@subql/types";
import { BlockNumber, Balance, MessageId } from "@polkadot/types/interfaces";
import { Compact } from '@polkadot/types';
import type { ParaId } from '@polkadot/types/interfaces/parachains';
import type { AccountIdOf, BalanceOf } from '@polkadot/types/interfaces/runtime';
import { SalpInfo } from '../types/models/SalpInfo';
import { SalpContributed } from '../types/models/SalpContributed';
// import { SalpContributeFailed } from '../types/models/SalpContributeFailed';
// import { SalpWithdrew } from '../types/models/SalpWithdrew';
// import { SalpWithdrawFailed } from '../types/models/SalpWithdrawFailed';
// import { SalpRedeemed } from '../types/models/SalpRedeemed';
// import { SalpRedeemFailed } from '../types/models/SalpRedeemFailed';
import { SalpContribution } from '../types/models/SalpContribution';
import { SalpRefunded } from '../types/models/SalpRefunded';

export async function salp(block: SubstrateBlock): Promise<void> {
  const blockNumber = (block.block.header.number as Compact<BlockNumber>).toBigInt();

  const salpEvents = block.events.filter(e => e.event.section === 'salp') as SubstrateEvent[];
  for (let salpEvent of salpEvents) {
    let accountIdOf, paraId, balanceOf = null;
    const { event: { data, section, method } } = salpEvent;
    if (method === 'Created' || method === 'Dissolved') { paraId = (data[0] as ParaId).toString() }
    else if (method === 'Redeeming' || method === 'Redeemed' || method === 'RedeemFailed') {
      accountIdOf = data[0].toString();
      balanceOf = (data[1] as BalanceOf).toBigInt()
    }
    // else {
    //   accountIdOf = data[0].toString();
    //   paraId = (data[1] as ParaId).toString();
    //   balanceOf = (data[2] as BalanceOf).toBigInt()
    // }
    const record = new SalpInfo(blockNumber.toString() + '-' + salpEvent.idx.toString());
    record.blockHeight = blockNumber;
    record.method = method.toString();
    record.data = data.toString();
    record.accountIdOf = accountIdOf;
    record.paraId = paraId;
    record.balanceOf = balanceOf;
    await record.save();
  }

  // const salpContributeds = block.events.filter(e => e.event.section === 'salp' && e.event.method === 'Contributed') as SubstrateEvent[];
  // for (let salpContributed of salpContributeds) {
  //   const { event: { data: [accountIdOf, paraId, balanceOf], section, method } } = salpContributed;
  //   const record = new SalpContributed(blockNumber.toString() + '-' + salpContributed.idx.toString());
  //   record.blockHeight = blockNumber;
  //   record.accountIdOf = (accountIdOf as AccountIdOf).toString();
  //   record.paraId = (paraId as ParaId).toString();
  //   record.balanceOf = (balanceOf as BalanceOf).toBigInt();
  //   await record.save();
  // }

  // const salpContributeFaileds = block.events.filter(e => e.event.section === 'salp' && e.event.method === 'ContributeFailed') as SubstrateEvent[];
  // for (let salpContributeFailed of salpContributeFaileds) {
  //   const { event: { data: [accountIdOf, paraId, balanceOf], section, method } } = salpContributeFailed;
  //   const record = new SalpContributeFailed(blockNumber.toString() + '-' + salpContributeFailed.idx.toString());
  //   record.blockHeight = blockNumber;
  //   record.accountIdOf = (accountIdOf as AccountIdOf).toString();
  //   record.paraId = (paraId as ParaId).toString();
  //   record.balanceOf = (balanceOf as BalanceOf).toBigInt();
  //   await record.save();
  // }

  // const salpWithdrews = block.events.filter(e => e.event.section === 'salp' && e.event.method === 'Withdrew') as SubstrateEvent[];
  // for (let salpWithdrew of salpWithdrews) {
  //   const { event: { data: [accountIdOf, paraId, balanceOf], section, method } } = salpWithdrew;
  //   const record = new SalpWithdrew(blockNumber.toString() + '-' + salpWithdrew.idx.toString());
  //   record.blockHeight = blockNumber;
  //   record.accountIdOf = (accountIdOf as AccountIdOf).toString();
  //   record.paraId = (paraId as ParaId).toString();
  //   record.balanceOf = (balanceOf as BalanceOf).toBigInt();
  //   await record.save();
  // }

  // const salpRedeemeds = block.events.filter(e => e.event.section === 'salp' && e.event.method === 'Redeemed') as SubstrateEvent[];
  // for (let salpRedeemed of salpRedeemeds) {
  //   const { event: { data: [accountIdOf, paraId, balanceOf], section, method } } = salpRedeemed;
  //   const record = new SalpRedeemed(blockNumber.toString() + '-' + salpRedeemed.idx.toString());
  //   record.blockHeight = block.block.header.number.toBigInt();
  //   record.accountIdOf = (accountIdOf as AccountIdOf).toString();
  //   record.balanceOf = (balanceOf as BalanceOf).toBigInt();
  //   await record.save();
  // }

  // const salpRedeemFaileds = block.events.filter(e => e.event.section === 'salp' && e.event.method === 'RedeemFailed') as SubstrateEvent[];
  // for (let salpRedeemFailed of salpRedeemFaileds) {
  //   const { event: { data: [accountIdOf, paraId, balanceOf], section, method } } = salpRedeemFailed;
  //   const record = new SalpRedeemFailed(blockNumber.toString() + '-' + salpRedeemFailed.idx.toString());
  //   record.blockHeight = block.block.header.number.toBigInt();
  //   record.accountIdOf = (accountIdOf as AccountIdOf).toString();
  //   record.balanceOf = (balanceOf as BalanceOf).toBigInt();
  //   await record.save();
  // }

  // const salpWithdrawFaileds = block.events.filter(e => e.event.section === 'salp' && e.event.method === 'WithdrawFailed') as SubstrateEvent[];
  // for (let salpWithdrawFailed of salpWithdrawFaileds) {
  //   const { event: { data: [accountIdOf, paraId, balanceOf], section, method } } = salpWithdrawFailed;
  //   const record = new SalpWithdrawFailed(blockNumber.toString() + '-' + salpWithdrawFailed.idx.toString());
  //   record.blockHeight = block.block.header.number.toBigInt();
  //   record.accountIdOf = (accountIdOf as AccountIdOf).toString();
  //   record.balanceOf = BigInt(1);
  //   await record.save();
  // }

  return;
}

export async function salpContribution(block: SubstrateBlock): Promise<void> {
  const blockNumber = (block.block.header.number as Compact<BlockNumber>).toNumber();

  const salpEvents = block.events.filter(e => e.event.section === 'salp') as SubstrateEvent[];
  for (let salpEvent of salpEvents) {
    let accountIdOf, paraId, balanceOf, message_id = null;
    const { event: { data, section, method } } = salpEvent;
    if (method === 'Contributing' || method === 'Contributed' || method === 'ContributeFailed') {
      accountIdOf = data[0].toString();
      paraId = (data[1] as ParaId).toNumber();
      balanceOf = (data[2] as BalanceOf).toBigInt();
      message_id = (data[3] as MessageId).toString();
      const record = new SalpContribution(blockNumber.toString() + '-' + salpEvent.idx.toString());
      record.block_height = blockNumber;
      record.block_timestamp = block.timestamp;
      record.method = method.toString();
      record.account = accountIdOf;
      record.para_id = paraId;
      record.balance = balanceOf;
      record.message_id = message_id;
      await record.save();
    }
  }
}

export async function handleSalpContributed(event: SubstrateEvent): Promise<void> {
  const blockNumber = event.block.block.header.number.toNumber();

  const { event: { data: [account, para_id, balance, message_id] } } = event;
  const record = new SalpContributed(blockNumber.toString() + '-' + event.idx.toString());
  record.block_height = blockNumber;
  record.event_id = event.idx;
  record.extrinsic_id = event.extrinsic.idx;
  record.block_timestamp = event.block.timestamp;
  record.account = account.toString();
  record.para_id = (para_id as ParaId).toNumber();
  record.balance = (balance as Balance).toBigInt();
  record.message_id = (message_id as MessageId).toString();
  await record.save();
}

export async function handleSalpRefunded(event: SubstrateEvent): Promise<void> {
  const blockNumber = event.block.block.header.number.toNumber();

  const { event: { data: [account, para_id, balance] } } = event;
  const record = new SalpRefunded(blockNumber.toString() + '-' + event.idx.toString());
  record.block_height = blockNumber;
  record.event_id = event.idx;
  record.extrinsic_id = event.extrinsic.idx;
  record.block_timestamp = event.block.timestamp;
  record.account = account.toString();
  record.para_id = (para_id as ParaId).toNumber();
  record.balance = (balance as Balance).toBigInt();
  await record.save();
}