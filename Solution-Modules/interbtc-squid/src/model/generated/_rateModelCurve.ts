import assert from "assert"
import * as marshal from "./marshal"

export class RateModelCurve {
    public readonly isTypeOf = 'RateModelCurve'
    private _baseRate!: bigint

    constructor(props?: Partial<Omit<RateModelCurve, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._baseRate = marshal.bigint.fromJSON(json.baseRate)
        }
    }

    get baseRate(): bigint {
        assert(this._baseRate != null, 'uninitialized access')
        return this._baseRate
    }

    set baseRate(value: bigint) {
        this._baseRate = value
    }

    toJSON(): object {
        return {
            isTypeOf: this.isTypeOf,
            baseRate: marshal.bigint.toJSON(this.baseRate),
        }
    }
}
