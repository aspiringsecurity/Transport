import assert from 'assert'
import {Chain, ChainContext, CallContext, Call, Result, Option} from './support'

export class BtcRelayStoreBlockHeaderCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'BTCRelay.store_block_header')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     * Stores a single new block header
     * 
     * # Arguments
     * 
     * * `raw_block_header` - 80 byte raw Bitcoin block header.
     * 
     * # <weight>
     * Key: C (len of chains), P (len of positions)
     * - Storage Reads:
     * 	- One storage read to check that parachain is not shutdown. O(1)
     * 	- One storage read to check if relayer authorization is disabled. O(1)
     * 	- One storage read to check if relayer is authorized. O(1)
     * 	- One storage read to check if block header is stored. O(1)
     * 	- One storage read to retrieve parent block hash. O(1)
     * 	- One storage read to check if difficulty check is disabled. O(1)
     * 	- One storage read to retrieve last re-target. O(1)
     * 	- One storage read to retrieve all Chains. O(C)
     * - Storage Writes:
     *     - One storage write to store block hash. O(1)
     *     - One storage write to store block header. O(1)
     * 	- One storage mutate to extend main chain. O(1)
     *     - One storage write to store best block hash. O(1)
     *     - One storage write to store best block height. O(1)
     * - Notable Computation:
     * 	- O(P) sort to reorg chains.
     * - Events:
     * 	- One event for block stored (fork or extension).
     * 
     * Total Complexity: O(C + P)
     * # </weight>
     */
    get isV1018000(): boolean {
        return this._chain.getCallHash('BTCRelay.store_block_header') === '0b7de7a970105636591e115c41a12831834dfd0d481ebdf53724537214918766'
    }

    /**
     * Stores a single new block header
     * 
     * # Arguments
     * 
     * * `raw_block_header` - 80 byte raw Bitcoin block header.
     * 
     * # <weight>
     * Key: C (len of chains), P (len of positions)
     * - Storage Reads:
     * 	- One storage read to check that parachain is not shutdown. O(1)
     * 	- One storage read to check if relayer authorization is disabled. O(1)
     * 	- One storage read to check if relayer is authorized. O(1)
     * 	- One storage read to check if block header is stored. O(1)
     * 	- One storage read to retrieve parent block hash. O(1)
     * 	- One storage read to check if difficulty check is disabled. O(1)
     * 	- One storage read to retrieve last re-target. O(1)
     * 	- One storage read to retrieve all Chains. O(C)
     * - Storage Writes:
     *     - One storage write to store block hash. O(1)
     *     - One storage write to store block header. O(1)
     * 	- One storage mutate to extend main chain. O(1)
     *     - One storage write to store best block hash. O(1)
     *     - One storage write to store best block height. O(1)
     * - Notable Computation:
     * 	- O(P) sort to reorg chains.
     * - Events:
     * 	- One event for block stored (fork or extension).
     * 
     * Total Complexity: O(C + P)
     * # </weight>
     */
    get asV1018000(): {rawBlockHeader: Uint8Array} {
        assert(this.isV1018000)
        return this._chain.decodeCall(this.call)
    }
}

export class SystemSetStorageCall {
    private readonly _chain: Chain
    private readonly call: Call

    constructor(ctx: CallContext)
    constructor(ctx: ChainContext, call: Call)
    constructor(ctx: CallContext, call?: Call) {
        call = call || ctx.call
        assert(call.name === 'System.set_storage')
        this._chain = ctx._chain
        this.call = call
    }

    /**
     *  Set some items of storage.
     * 
     *  # <weight>
     *  - `O(I)` where `I` length of `items`
     *  - `I` storage writes (`O(1)`).
     *  - Base Weight: 0.568 * i µs
     *  - Writes: Number of items
     *  # </weight>
     */
    get isV1(): boolean {
        return this._chain.getCallHash('System.set_storage') === 'a4fb507615d69849afb1b2ee654006f9be48bb6e960a4674624d6e46e4382083'
    }

    /**
     *  Set some items of storage.
     * 
     *  # <weight>
     *  - `O(I)` where `I` length of `items`
     *  - `I` storage writes (`O(1)`).
     *  - Base Weight: 0.568 * i µs
     *  - Writes: Number of items
     *  # </weight>
     */
    get asV1(): {items: [Uint8Array, Uint8Array][]} {
        assert(this.isV1)
        return this._chain.decodeCall(this.call)
    }
}
