import assert from "assert"
import * as marshal from "./marshal"

export class StableLpToken {
    public readonly isTypeOf = 'StableLpToken'
    private _poolId!: number

    constructor(props?: Partial<Omit<StableLpToken, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._poolId = marshal.int.fromJSON(json.poolId)
        }
    }

    get poolId(): number {
        assert(this._poolId != null, 'uninitialized access')
        return this._poolId
    }

    set poolId(value: number) {
        this._poolId = value
    }

    toJSON(): object {
        return {
            isTypeOf: this.isTypeOf,
            poolId: this.poolId,
        }
    }
}
