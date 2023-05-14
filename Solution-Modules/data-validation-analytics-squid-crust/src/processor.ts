import { lookupArchive } from "@subsquid/archive-registry";
import * as ss58 from "@subsquid/ss58";
import {
  BatchContext,
  BatchProcessorItem,
  SubstrateBatchProcessor,
  toHex,
} from "@subsquid/substrate-processor";
import { Store, TypeormDatabase } from "@subsquid/typeorm-store";
import { In } from "typeorm";
import {
  Account,
  WorkReport,
  JoinGroup,
  StorageOrder,
} from "./model/generated";
import {
  MarketFileSuccessEvent,
  SworkJoinGroupSuccessEvent,
  SworkWorksReportSuccessEvent,
} from "./types/events";

const processor = new SubstrateBatchProcessor()
  .setBatchSize(500)
  .setDataSource({
    archive: lookupArchive("crust", { release: "FireSquid" }),
  })
  .setBlockRange({ from: 583000 })
  .addEvent("Market.FileSuccess", {
    data: { event: { args: true , extrinsic: true, call: true} },
  } as const)
  .addEvent("Swork.JoinGroupSuccess", {
    data: { event: { args: true , extrinsic: true, call: true} },
  } as const)
  .addEvent("Swork.WorksReportSuccess");

type Item = BatchProcessorItem<typeof processor>;
type Ctx = BatchContext<Store, Item>;

processor.run(new TypeormDatabase(), async (ctx) => {
  const events = getEvents(ctx);

  let accounts = await ctx.store
    .findBy(Account, { id: In([...events.accountIds]) })
    .then((accounts) => {
      return new Map(accounts.map((a) => [a.id, a]));
    });

  for (const jg of events.joinGroups) {
    const member = getAccount(accounts, jg[1]);
    // necessary to add this field to the previously created model
    // because now we have the Account created.
    jg[0].member = member;
  }

  for (const mf of events.marketFiles) {
    const account = getAccount(accounts, mf[1]);
    // necessary to add this field to the previously created model
    // because now we have the Account created.
    mf[0].account = account;
  }

  for (const wr of events.workReports) {
    const account = getAccount(accounts, wr[1]);
    // necessary to add this field to the previously created model
    // because now we have the Account created.
    wr[0].account = account;
  }

  await ctx.store.save(Array.from(accounts.values()));
  await ctx.store.insert(events.joinGroups.map(el => el[0]));
  await ctx.store.insert(events.marketFiles.map(el => el[0]));
  await ctx.store.insert(events.workReports.map(el => el[0]));
});

function stringifyArray(list: any[]): any[] {
  let listStr: any[] = [];
  for (let vec of list) {
    for (let i = 0; i < vec.length; i++) {
      vec[i] = String(vec[i]);
    }
    listStr.push(vec);
  }
  return listStr;
}

type Tuple<T,K> = [T,K];
interface EventInfo {
  joinGroups: Tuple<JoinGroup, string>[];
  marketFiles: Tuple<StorageOrder, string>[];
  workReports: Tuple<WorkReport, string>[];
  accountIds: Set<string>;
}

function getEvents(ctx: Ctx): EventInfo {
  let events: EventInfo = {
    joinGroups: [],
    marketFiles: [],
    workReports: [],
    accountIds: new Set<string>(),
  };
  for (let block of ctx.blocks) {
    for (let item of block.items) {
      if (item.name === "Swork.JoinGroupSuccess") {
        const e = new SworkJoinGroupSuccessEvent(ctx, item.event);
        const memberId = ss58.codec("crust").encode(e.asV1[0]);
        events.joinGroups.push([new JoinGroup({
          id: item.event.id,
          owner: ss58.codec("crust").encode(e.asV1[1]),
          blockHash: block.header.hash,
          blockNum: block.header.height,
          createdAt: new Date(block.header.timestamp),
          extrinsicId: item.event.extrinsic?.id, 
        }), memberId]);
        
        // add encountered account ID to the Set of unique accountIDs
        events.accountIds.add(memberId);
      }
      if (item.name === "Market.FileSuccess") {
        const e = new MarketFileSuccessEvent(ctx, item.event);
        const accountId = ss58.codec("crust").encode(e.asV1[0]);
        events.marketFiles.push([new StorageOrder({
          id: item.event.id,
          fileCid: toHex(e.asV1[1]),
          blockHash: block.header.hash,
          blockNum: block.header.height,
          createdAt: new Date(block.header.timestamp),
          extrinsicId: item.event.extrinsic?.id,
        }), accountId]);

        // add encountered account ID to the Set of unique accountIDs
        events.accountIds.add(accountId)
      }
      if (item.name === "Swork.WorksReportSuccess") {
        const e = new SworkWorksReportSuccessEvent(ctx, item.event);
        const accountId = ss58.codec("crust").encode(e.asV1[0]);

        const addedExtr = item.event.call?.args.addedFiles;
        const deletedExtr = item.event.call?.args.deletedFiles;

        const addedFiles = stringifyArray(addedExtr);
        const deletedFiles = stringifyArray(deletedExtr);

        if (addedFiles.length > 0 || deletedFiles.length > 0) {
          events.workReports.push([new WorkReport({
            id: item.event.id,
            addedFiles: addedFiles,
            deletedFiles: deletedFiles,
            blockHash: block.header.hash,
            blockNum: block.header.height,
            createdAt: new Date(block.header.timestamp),
            extrinsicId: item.event.extrinsic?.id,
          }), accountId]);

          // add encountered account ID to the Set of unique accountIDs
          events.accountIds.add(accountId);
        }
      }
    }
  }
  return events;
}

function getAccount(m: Map<string, Account>, id: string): Account {
  let acc = m.get(id);
  if (acc == null) {
    acc = new Account();
    acc.id = id;
    m.set(id, acc);
  }
  return acc;
}
