import { SubstrateBlock, SubstrateEvent } from "@subql/types";
import { BlockNumber, Balance, MessageId } from "@polkadot/types/interfaces";
import { Compact } from '@polkadot/types';
import type { ParaId } from '@polkadot/types/interfaces/parachains';
import type { AccountIdOf, BalanceOf } from '@polkadot/types/interfaces/runtime';
import { CurrencyId, TokenSymbol } from "@bifrost-finance/types/interfaces";
import { TotalTransfer } from '../types/models';

const NativeToken = JSON.stringify({ "native": "BNC" });

export async function handleBalancesTransfer(event: SubstrateEvent): Promise<void> {
  const blockNumber = event.block.block.header.number.toNumber();

  const { event: { section, method, data: [from, to, balance] } } = event;
  const record = new TotalTransfer(blockNumber.toString() + '-' + event.idx.toString());
  record.block_height = blockNumber;
  record.event_id = event.idx;
  record.extrinsic_id = event.extrinsic ? event.extrinsic.idx : null;
  record.block_timestamp = event.block.timestamp;
  record.section = section.toString();
  record.method = method.toString();
  record.from = from.toString();
  record.to = to.toString();
  record.currency = NativeToken;
  record.balance = (balance as Balance).toBigInt();
  await record.save();
}

export async function handleBalancesEndowed(event: SubstrateEvent): Promise<void> {
  const blockNumber = event.block.block.header.number.toNumber();

  const { event: { section, method, data: [to, balance] } } = event;
  const record = new TotalTransfer(blockNumber.toString() + '-' + event.idx.toString());
  record.block_height = blockNumber;
  record.event_id = event.idx;
  record.extrinsic_id = event.extrinsic ? event.extrinsic.idx : null;
  record.block_timestamp = event.block.timestamp;
  record.section = section.toString();
  record.method = method.toString();
  record.to = to.toString();
  record.currency = NativeToken;
  record.balance = (balance as Balance).toBigInt();
  await record.save();
}

export async function handleBalancesDustLost(event: SubstrateEvent): Promise<void> {
  const blockNumber = event.block.block.header.number.toNumber();

  const { event: { section, method, data: [from, balance] } } = event;
  const record = new TotalTransfer(blockNumber.toString() + '-' + event.idx.toString());
  record.block_height = blockNumber;
  record.event_id = event.idx;
  record.extrinsic_id = event.extrinsic ? event.extrinsic.idx : null;
  record.block_timestamp = event.block.timestamp;
  record.section = section.toString();
  record.method = method.toString();
  record.from = from.toString();
  record.currency = NativeToken;
  record.balance = (balance as Balance).toBigInt();
  await record.save();
}

export async function handleBalancesReserved(event: SubstrateEvent): Promise<void> {
  const blockNumber = event.block.block.header.number.toNumber();

  const { event: { section, method, data: [from, balance] } } = event;
  const record = new TotalTransfer(blockNumber.toString() + '-' + event.idx.toString());
  record.block_height = blockNumber;
  record.event_id = event.idx;
  record.extrinsic_id = event.extrinsic ? event.extrinsic.idx : null;
  record.block_timestamp = event.block.timestamp;
  record.section = section.toString();
  record.method = method.toString();
  record.from = from.toString();
  record.currency = NativeToken;
  record.balance = (balance as Balance).toBigInt();
  await record.save();
}

export async function handleBalancesUnreserved(event: SubstrateEvent): Promise<void> {
  const blockNumber = event.block.block.header.number.toNumber();

  const { event: { section, method, data: [to, balance] } } = event;
  const record = new TotalTransfer(blockNumber.toString() + '-' + event.idx.toString());
  record.block_height = blockNumber;
  record.event_id = event.idx;
  record.extrinsic_id = event.extrinsic ? event.extrinsic.idx : null;
  record.block_timestamp = event.block.timestamp;
  record.section = section.toString();
  record.method = method.toString();
  record.to = to.toString();
  record.currency = NativeToken;
  record.balance = (balance as Balance).toBigInt();
  await record.save();
}

export async function handleBalancesBalanceSet(event: SubstrateEvent): Promise<void> {
  const blockNumber = event.block.block.header.number.toNumber();

  const { event: { section, method, data: [to, free, reserved] } } = event;
  const record = new TotalTransfer(blockNumber.toString() + '-' + event.idx.toString());
  record.block_height = blockNumber;
  record.event_id = event.idx;
  record.extrinsic_id = event.extrinsic ? event.extrinsic.idx : null;
  record.block_timestamp = event.block.timestamp;
  record.section = section.toString();
  record.method = method.toString();
  record.to = to.toString();
  record.currency = NativeToken;
  record.balance = (free as Balance).toBigInt();
  await record.save();
}

export async function handleBalancesReserveRepatriated(event: SubstrateEvent): Promise<void> {
  const blockNumber = event.block.block.header.number.toNumber();

  const { event: { section, method, data: [from, to, balance, status] } } = event;
  // if (status.toString() === 'free') { }
  const record = new TotalTransfer(blockNumber.toString() + '-' + event.idx.toString());
  record.block_height = blockNumber;
  record.event_id = event.idx;
  record.extrinsic_id = event.extrinsic ? event.extrinsic.idx : null;
  record.block_timestamp = event.block.timestamp;
  record.section = section.toString();
  record.method = method.toString();
  record.from = from.toString();
  record.to = to.toString();
  record.currency = NativeToken;
  record.balance = (balance as Balance).toBigInt();
  await record.save();
}

export async function handleBalancesDeposit(event: SubstrateEvent): Promise<void> {
  const blockNumber = event.block.block.header.number.toNumber();

  const { event: { section, method, data: [account, balance] } } = event;
  const record = new TotalTransfer(blockNumber.toString() + '-' + event.idx.toString());
  record.block_height = blockNumber;
  record.event_id = event.idx;
  record.extrinsic_id = event.extrinsic ? event.extrinsic.idx : null;
  record.block_timestamp = event.block.timestamp;
  record.section = section.toString();
  record.method = method.toString();
  record.to = account.toString();
  record.currency = NativeToken;
  record.balance = (balance as Balance).toBigInt();
  await record.save();
}