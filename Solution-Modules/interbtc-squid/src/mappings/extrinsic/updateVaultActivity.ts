import {encodeAddress} from "@polkadot/util-crypto";
import {SubstrateBlock} from "@subsquid/substrate-processor";
import {Vault} from "../../model";
import {CallItem, Ctx} from "../../processor";
import {address} from "../encoding";
import {blockToHeight} from "../utils/heights";

// TODO
// if we still need this - then refactor to use the new batchprocessor call processing

export async function updateVaultActivity(
    ctx: Ctx,
    block: SubstrateBlock,
    item: CallItem
): Promise<void> {
    // const rawSigner = ctx.extrinsic.signature?.address;
    // if (rawSigner === undefined) {
    //     ctx.log.info(
    //         `Received unsigned ${ctx.extrinsic.call.name} extrinsic; weird`
    //     );
    // }
    // // @polkadot/util-crypto can actually handle hex strings
    // // maybe @subsquid/ss58 can be removed entirely
    // const signer = encodeAddress(rawSigner, address.interlay.prefix);
    // const vault = await ctx.store.get(Vault, {
    //     where: { accountId: signer },
    // });
    // if (vault === undefined) {
    //     ctx.log.warn(
    //         `Extrinsic ${ctx.extrinsic.call.name} called by non-vault registered account ${signer}`
    //     );
    //     return;
    // }
    // vault.lastActivity = await blockToHeight(
    //     ctx,
    //     ctx.block.height,
    //     ctx.extrinsic.call.name
    // );
    // await ctx.store.save(vault);
}
