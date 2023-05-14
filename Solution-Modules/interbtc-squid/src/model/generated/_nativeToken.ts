import assert from "assert"
import * as marshal from "./marshal"
import {Token} from "./_token"

export class NativeToken {
    public readonly isTypeOf = 'NativeToken'
    private _token!: Token

    constructor(props?: Partial<Omit<NativeToken, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._token = marshal.enumFromJson(json.token, Token)
        }
    }

    get token(): Token {
        assert(this._token != null, 'uninitialized access')
        return this._token
    }

    set token(value: Token) {
        this._token = value
    }

    toJSON(): object {
        return {
            isTypeOf: this.isTypeOf,
            token: this.token,
        }
    }
}
