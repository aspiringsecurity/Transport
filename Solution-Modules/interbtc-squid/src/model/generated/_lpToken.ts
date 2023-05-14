import assert from "assert"
import * as marshal from "./marshal"
import {PooledToken, fromJsonPooledToken} from "./_pooledToken"

export class LpToken {
    public readonly isTypeOf = 'LpToken'
    private _token0!: PooledToken
    private _token1!: PooledToken

    constructor(props?: Partial<Omit<LpToken, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._token0 = fromJsonPooledToken(json.token0)
            this._token1 = fromJsonPooledToken(json.token1)
        }
    }

    get token0(): PooledToken {
        assert(this._token0 != null, 'uninitialized access')
        return this._token0
    }

    set token0(value: PooledToken) {
        this._token0 = value
    }

    get token1(): PooledToken {
        assert(this._token1 != null, 'uninitialized access')
        return this._token1
    }

    set token1(value: PooledToken) {
        this._token1 = value
    }

    toJSON(): object {
        return {
            isTypeOf: this.isTypeOf,
            token0: this.token0.toJSON(),
            token1: this.token1.toJSON(),
        }
    }
}
