import assert from "assert"
import * as marshal from "./marshal"

export class RateModelJump {
    public readonly isTypeOf = 'RateModelJump'
    private _baseRate!: bigint
    private _jumpRate!: bigint
    private _fullRate!: bigint
    private _jumpUtilization!: number

    constructor(props?: Partial<Omit<RateModelJump, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._baseRate = marshal.bigint.fromJSON(json.baseRate)
            this._jumpRate = marshal.bigint.fromJSON(json.jumpRate)
            this._fullRate = marshal.bigint.fromJSON(json.fullRate)
            this._jumpUtilization = marshal.int.fromJSON(json.jumpUtilization)
        }
    }

    get baseRate(): bigint {
        assert(this._baseRate != null, 'uninitialized access')
        return this._baseRate
    }

    set baseRate(value: bigint) {
        this._baseRate = value
    }

    get jumpRate(): bigint {
        assert(this._jumpRate != null, 'uninitialized access')
        return this._jumpRate
    }

    set jumpRate(value: bigint) {
        this._jumpRate = value
    }

    get fullRate(): bigint {
        assert(this._fullRate != null, 'uninitialized access')
        return this._fullRate
    }

    set fullRate(value: bigint) {
        this._fullRate = value
    }

    get jumpUtilization(): number {
        assert(this._jumpUtilization != null, 'uninitialized access')
        return this._jumpUtilization
    }

    set jumpUtilization(value: number) {
        this._jumpUtilization = value
    }

    toJSON(): object {
        return {
            isTypeOf: this.isTypeOf,
            baseRate: marshal.bigint.toJSON(this.baseRate),
            jumpRate: marshal.bigint.toJSON(this.jumpRate),
            fullRate: marshal.bigint.toJSON(this.fullRate),
            jumpUtilization: this.jumpUtilization,
        }
    }
}
