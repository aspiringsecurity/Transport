import assert from "assert"
import * as marshal from "./marshal"

export class LendToken {
    public readonly isTypeOf = 'LendToken'
    private _lendTokenId!: number

    constructor(props?: Partial<Omit<LendToken, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._lendTokenId = marshal.int.fromJSON(json.lendTokenId)
        }
    }

    get lendTokenId(): number {
        assert(this._lendTokenId != null, 'uninitialized access')
        return this._lendTokenId
    }

    set lendTokenId(value: number) {
        this._lendTokenId = value
    }

    toJSON(): object {
        return {
            isTypeOf: this.isTypeOf,
            lendTokenId: this.lendTokenId,
        }
    }
}
