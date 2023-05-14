import {BigDecimal} from "@subsquid/big-decimal"
import assert from "assert"
import * as marshal from "./marshal"
import {PooledToken, fromJsonPooledToken} from "./_pooledToken"

export class PooledAmount {
    private _amount!: bigint
    private _amountHuman!: BigDecimal | undefined | null
    private _token!: PooledToken

    constructor(props?: Partial<Omit<PooledAmount, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._amount = marshal.bigint.fromJSON(json.amount)
            this._amountHuman = json.amountHuman == null ? undefined : marshal.bigdecimal.fromJSON(json.amountHuman)
            this._token = fromJsonPooledToken(json.token)
        }
    }

    get amount(): bigint {
        assert(this._amount != null, 'uninitialized access')
        return this._amount
    }

    set amount(value: bigint) {
        this._amount = value
    }

    get amountHuman(): BigDecimal | undefined | null {
        return this._amountHuman
    }

    set amountHuman(value: BigDecimal | undefined | null) {
        this._amountHuman = value
    }

    get token(): PooledToken {
        assert(this._token != null, 'uninitialized access')
        return this._token
    }

    set token(value: PooledToken) {
        this._token = value
    }

    toJSON(): object {
        return {
            amount: marshal.bigint.toJSON(this.amount),
            amountHuman: this.amountHuman == null ? undefined : marshal.bigdecimal.toJSON(this.amountHuman),
            token: this.token.toJSON(),
        }
    }
}
