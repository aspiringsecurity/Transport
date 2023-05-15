import { SubstrateBlock, SubstrateEvent } from "@subql/types";
import { BlockNumber } from "@polkadot/types/interfaces";
import { Compact } from '@polkadot/types';
import { VsbondInfo } from "../types/models/VsbondInfo";

export async function vsbond(block: SubstrateBlock): Promise<void> {
  const blockNumber = (block.block.header.number as Compact<BlockNumber>).toBigInt();

  const vsbondEvents = block.events.filter(e => e.event.section === 'vsBondAuction') as SubstrateEvent[];
  for (let vsbondEvent of vsbondEvents) {
    const { event: { data, section, method } } = vsbondEvent;
    const record = new VsbondInfo(blockNumber.toString() + '-' + vsbondEvent.idx.toString());
    record.block_height = blockNumber;
    record.block_timestamp = block.timestamp;
    record.method = method.toString();
    record.data = data.toString();
    await record.save();
  }
  return;
}