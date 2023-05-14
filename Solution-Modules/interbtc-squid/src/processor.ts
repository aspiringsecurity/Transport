import {
    BatchContext,
    BatchProcessorCallItem,
    BatchProcessorEventItem,
    BatchProcessorItem,
    SubstrateBatchProcessor,
    SubstrateBlock,
} from "@subsquid/substrate-processor";
import {
    CallItem as _CallItem,
    EventItem as _EventItem,
} from "@subsquid/substrate-processor/lib/interfaces/dataSelection";
import { Store, TypeormDatabase } from "@subsquid/typeorm-store";
import assert from "assert";
import {
    cancelIssue,
    cancelRedeem,
    decreaseLockedCollateral,
    dexGeneralAssetSwap,
    dexGeneralLiquidityAdded,
    dexGeneralLiquidityRemoved,
    dexStableCurrencyExchange,
    dexStableNewAdminFee,
    dexStableNewSwapFee,
    dexStableLiquidityAdded,
    dexStableLiquidityRemoved,
    executeIssue,
    executeRedeem,
    feedValues,
    findAndUpdateExpiredRequests,
    increaseLockedCollateral,
    issuePeriodChange,
    redeemPeriodChange,
    registerVault,
    requestIssue,
    requestRedeem,
    setStorage,
    storeMainChainHeader,
    updateActiveBlock,
    updateVaultActivity,
} from "./mappings";
import { deposit, withdraw } from "./mappings/event/escrow";
import { tokensTransfer } from "./mappings/event/transfer";
import * as heights from "./mappings/utils/heights";
import EntityBuffer from "./mappings/utils/entityBuffer";
import { eventArgsData, cacheForeignAsset } from "./mappings/_utils";
import { BitcoinNetwork, createInterBtcApi, InterBtcApi } from "@interlay/interbtc-api";
import { 
    newMarket, 
    updatedMarket, 
    activatedMarket, 
    borrow, 
    depositCollateral,
    depositForLending,
    distributeBorrowerReward,
    distributeSupplierReward,
    repay,
    withdrawCollateral,
    withdrawDeposit,
    accrueInterest, 
    liquidateLoan
} from "./mappings/event/loans";

const archive = process.env.ARCHIVE_ENDPOINT;
assert(!!archive);
const chain = process.env.CHAIN_ENDPOINT;
assert(!!chain);

const processFrom = Number(process.env.PROCESS_FROM) || 0;

const eventArgsData: eventArgsData = {
    data: {
        event: { args: true },
    },
};

// initialise a cache with all the foreign assets
cacheForeignAsset();

const processor = new SubstrateBatchProcessor()
    .setDataSource({ archive, chain })
    .setTypesBundle("indexer/typesBundle.json")
    .setBlockRange({ from: processFrom })
    .addEvent("BTCRelay.StoreMainChainHeader", eventArgsData)
    .addEvent("DexGeneral.AssetSwap", eventArgsData)
    .addEvent("DexGeneral.LiquidityAdded", eventArgsData)
    .addEvent("DexGeneral.LiquidityRemoved", eventArgsData)
    .addEvent("DexStable.AddLiquidity", eventArgsData)
    .addEvent("DexStable.CurrencyExchange", eventArgsData)
    .addEvent("DexStable.RemoveLiquidity", eventArgsData)
    .addEvent("Escrow.Deposit", eventArgsData)
    .addEvent("Escrow.Withdraw", eventArgsData)
    .addEvent("Issue.CancelIssue", eventArgsData)
    .addEvent("Issue.ExecuteIssue", eventArgsData)
    .addEvent("Issue.RequestIssue", eventArgsData)
    .addEvent("Issue.IssuePeriodChange", eventArgsData)
    .addEvent("Oracle.FeedValues", eventArgsData)
    .addEvent("Redeem.CancelRedeem", eventArgsData)
    .addEvent("Redeem.ExecuteRedeem", eventArgsData)
    .addEvent("Redeem.RequestRedeem", eventArgsData)
    .addEvent("Redeem.RedeemPeriodChange", eventArgsData)
    .addEvent("Security.UpdateActiveBlock", eventArgsData)
    .addEvent("Tokens.Transfer", eventArgsData)
    .addEvent("Loans.WithdrawCollateral", eventArgsData)
    .addEvent("Loans.DepositCollateral", eventArgsData)
    .addEvent("Loans.DistributedSupplierReward", eventArgsData)
    .addEvent("Loans.Redeemed", eventArgsData)
    .addEvent("Loans.Deposited", eventArgsData)
    .addEvent("Loans.DistributedBorrowerReward", eventArgsData)
    .addEvent("Loans.RepaidBorrow", eventArgsData)
    .addEvent("Loans.Borrowed", eventArgsData)
    .addEvent("Loans.ActivatedMarket", eventArgsData)
    .addEvent("Loans.NewMarket", eventArgsData)
    .addEvent("Loans.UpdatedMarket", eventArgsData)
    .addEvent("Loans.InterestAccrued", eventArgsData)
    .addEvent("Loans.LiquidatedBorrow", eventArgsData)
    .addEvent("VaultRegistry.RegisterVault", eventArgsData)
    .addEvent("VaultRegistry.IncreaseLockedCollateral", eventArgsData)
    .addEvent("VaultRegistry.DecreaseLockedCollateral", eventArgsData)
    .addCall("System.set_storage", {
        data: {
            call: true,
            extrinsic: {
                signature: true,
                call: true,
            },
        },
    })
    .addCall("BTCRelay.store_block_header", {
        data: {
            extrinsic: {
                signature: true,
                call: true,
            },
        },
    });

export type Item = BatchProcessorItem<typeof processor>;
export type EventItem = Exclude<
    BatchProcessorEventItem<typeof processor>,
    _EventItem<"*", false>
>;
export type CallItem = Exclude<
    BatchProcessorCallItem<typeof processor>,
    _CallItem<"*", false>
>;
export type Ctx = BatchContext<Store, Item>;

let interBtcApi: InterBtcApi | undefined = undefined;

export const getInterBtcApi = async () => {
    if (interBtcApi === undefined) {
        const PARACHAIN_ENDPOINT = process.env.CHAIN_ENDPOINT;
        const BITCOIN_NETWORK = process.env.BITCOIN_NETWORK as BitcoinNetwork;
    
        interBtcApi = await createInterBtcApi(PARACHAIN_ENDPOINT!, BITCOIN_NETWORK!); 
    }
    return interBtcApi;
}
processor.run(new TypeormDatabase({ stateSchema: "interbtc" }), async (ctx) => {
    type MappingsList = Array<{
        filter: { name: string };
        mapping: (
            ctx: Ctx,
            block: SubstrateBlock,
            item: EventItem,
            entityBuffer: EntityBuffer
        ) => Promise<void>;
        totalTime: number;
    }>;

    const entityBuffer = new EntityBuffer();

    // helper function to loop through the events only once,
    // apply each of a list of mappings and batch save the resulting data
    const processConcurrently = async (mappings: MappingsList) => {
        const processingStartTime = Date.now();
        for (const block of ctx.blocks) {
            for (const item of block.items) {
                if (item.kind === "event") {
                    for (const mapping of mappings) {
                        if (
                            mapping.filter.name === item.name &&
                            item.name !== "*"
                        ) {
                            const execStartTime = Date.now();
                            await mapping.mapping(
                                ctx,
                                block.header,
                                item,
                                entityBuffer
                            );
                            mapping.totalTime += Date.now() - execStartTime;
                        }
                    }
                }

                if (
                    item.kind === "call" &&
                    item.name === "System.set_storage"
                ) {
                    await setStorage(ctx, block.header, item);
                }
            }
        }

        for (const mapping of mappings) {
            ctx.log.trace(
                `For mapping ${mapping.filter.name}, processing time of batch is ${mapping.totalTime}`
            );
            mapping.totalTime = 0;
        }

        const dbStartTime = Date.now();
        await entityBuffer.flush(ctx.store);
        ctx.log.debug(
            `Processing time for batch: ${
                dbStartTime - processingStartTime
            }ms; db time: ${Date.now() - dbStartTime}`
        );
    };

    // pre-stage
    // first we process all active block heights to immediately populate the
    // in-memory cache which eliminates a huge amount of redundant database lookups
    // 1. security
    await processConcurrently([
        {
            filter: { name: "Security.UpdateActiveBlock" },
            mapping: updateActiveBlock,
            totalTime: 0,
        },
    ]);

    // first stage
    // - transfers
    // - oracle events
    // - vault registrations and collateral changes
    // - btcrelay events
    //TODO    // 6. vault activity probe
    // - issue period
    // - redeem period
    // - escrow
    await processConcurrently([
        {
            filter: { name: "Tokens.Transfer" },
            mapping: tokensTransfer,
            totalTime: 0,
        },
        {
            filter: { name: "Oracle.FeedValues" },
            mapping: feedValues,
            totalTime: 0,
        },
        {
            filter: { name: "VaultRegistry.RegisterVault" },
            mapping: registerVault,
            totalTime: 0,
        },
        {
            filter: { name: "VaultRegistry.IncreaseLockedCollateral" },
            mapping: increaseLockedCollateral,
            totalTime: 0,
        },
        {
            filter: { name: "VaultRegistry.DecreaseLockedCollateral" },
            mapping: decreaseLockedCollateral,
            totalTime: 0,
        },
        {
            filter: { name: "BTCRelay.StoreMainChainHeader" },
            mapping: storeMainChainHeader,
            totalTime: 0,
        },
        {
            filter: { name: "Issue.IssuePeriodChange" },
            mapping: issuePeriodChange,
            totalTime: 0,
        },
        {
            filter: { name: "Redeem.RedeemPeriodChange" },
            mapping: redeemPeriodChange,
            totalTime: 0,
        },
        {
            filter: { name: "Escrow.Deposit" },
            mapping: deposit,
            totalTime: 0,
        },
        {
            filter: { name: "Escrow.Withdraw" },
            mapping: withdraw,
            totalTime: 0,
        },
        {
            filter: { name: "DexStable.NewAdminFee" },
            mapping: dexStableNewAdminFee,
            totalTime: 0
        },
        {
            filter: { name: "DexStable.NewSwapFee" },
            mapping: dexStableNewSwapFee,
            totalTime: 0
        },
        {
            filter: { name: "DexGeneral.AssetSwap" },
            mapping: dexGeneralAssetSwap,
            totalTime: 0
        },
        {
            filter: { name: "DexStable.CurrencyExchange" },
            mapping: dexStableCurrencyExchange,
            totalTime: 0
        },
        {
            filter: { name: "DexGeneral.LiquidityAdded" },
            mapping: dexGeneralLiquidityAdded,
            totalTime: 0
        },
        {
            filter: { name: "DexGeneral.LiquidityRemoved" },
            mapping: dexGeneralLiquidityRemoved,
            totalTime: 0
        },
        {
            filter: { name: "DexStable.AddLiquidity" },
            mapping: dexStableLiquidityAdded,
            totalTime: 0
        },
        {
            filter: { name: "DexStable.RemoveLiquidity" },
            mapping: dexStableLiquidityRemoved,
            totalTime: 0
        }
    ]);

    // second stage
    // after the above are saved, we process:
    // - issue requests - depends on vault registrations
    // - redeem requests - depends on vault registrations
    await processConcurrently([
        {
            filter: { name: "Issue.RequestIssue" },
            mapping: requestIssue,
            totalTime: 0,
        },
        {
            filter: { name: "Redeem.RequestRedeem" },
            mapping: requestRedeem,
            totalTime: 0,
        },
    ]);

    // third stage
    // - issue cancellations - depends on issue requests
    // - issue executions - depends on issue requests
    // - redeem cancellation - depends on redeem requests
    // - redeem execution - depends on redeem requests
    // Executions also update the respective cumulative volumes (TVL).
    await processConcurrently([
        {
            filter: { name: "Issue.CancelIssue" },
            mapping: cancelIssue,
            totalTime: 0,
        },
        {
            filter: { name: "Issue.ExecuteIssue" },
            mapping: executeIssue,
            totalTime: 0,
        },
        {
            filter: { name: "Redeem.CancelRedeem" },
            mapping: cancelRedeem,
            totalTime: 0,
        },
        {
            filter: { name: "Redeem.ExecuteRedeem" },
            mapping: executeRedeem,
            totalTime: 0,
        },
    ]);

    // add Loan Market processing
    await processConcurrently([
        {
            filter: { name: "Loans.NewMarket" },
            mapping: newMarket,
            totalTime: 0,
        },
    ]);

    // add LoanMarket updates and Loan processing
    await processConcurrently([
        {
            filter: { name: "Loans.ActivatedMarket" },
            mapping: activatedMarket,
            totalTime: 0,
        },
        {
            filter: { name: "Loans.UpdatedMarket" },
            mapping: updatedMarket,
            totalTime: 0,
        },
        {
            filter: { name: "Loans.Borrowed" },
            mapping: borrow,
            totalTime: 0,
        },
        {
            filter: { name: "Loans.DepositCollateral" },
            mapping: depositCollateral,
            totalTime: 0,
        },
        {
            filter: { name: "Loans.Deposited" },
            mapping: depositForLending,
            totalTime: 0,
        },
        {
            filter: { name: "Loans.DistributedBorrowerReward" },
            mapping: distributeBorrowerReward,
            totalTime: 0,
        },
        {
            filter: { name: "Loans.DistributedSupplierReward" },
            mapping: distributeSupplierReward,
            totalTime: 0,
        },
        {
            filter: { name: "Loans.RepaidBorrow" },
            mapping: repay,
            totalTime: 0,
        },
        {
            filter: { name: "Loans.Redeemed" },
            mapping: withdrawDeposit,
            totalTime: 0,
        },
        {
            filter: { name: "Loans.WithdrawCollateral" },
            mapping: withdrawCollateral,
            totalTime: 0,
        },
        {
            filter: { name: "Loans.LiquidatedBorrow" },
            mapping: liquidateLoan,
            totalTime: 0,
        },
        {
            filter: { name: "Loans.InterestAccrued" },
            mapping: accrueInterest,
            totalTime: 0,
        },
    ]);

    // finally, check request expiration, once all events have been processed
    await findAndUpdateExpiredRequests(ctx);

    heights.clearCache();
});
