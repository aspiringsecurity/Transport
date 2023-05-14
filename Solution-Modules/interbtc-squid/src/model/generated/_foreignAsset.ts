import assert from "assert"
import * as marshal from "./marshal"

export class ForeignAsset {
    public readonly isTypeOf = 'ForeignAsset'
    private _asset!: number

    constructor(props?: Partial<Omit<ForeignAsset, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._asset = marshal.int.fromJSON(json.asset)
        }
    }

    get asset(): number {
        assert(this._asset != null, 'uninitialized access')
        return this._asset
    }

    set asset(value: number) {
        this._asset = value
    }

    toJSON(): object {
        return {
            isTypeOf: this.isTypeOf,
            asset: this.asset,
        }
    }
}
