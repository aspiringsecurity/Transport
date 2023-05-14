import assert from "assert"
import * as marshal from "./marshal"
import {Height} from "./height.model"

export class IssueRequest {
    private _amountWrapped!: bigint
    private _bridgeFeeWrapped!: bigint
    private _height!: string
    private _timestamp!: Date
    private _backingHeight!: number

    constructor(props?: Partial<Omit<IssueRequest, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._amountWrapped = marshal.bigint.fromJSON(json.amountWrapped)
            this._bridgeFeeWrapped = marshal.bigint.fromJSON(json.bridgeFeeWrapped)
            this._height = marshal.string.fromJSON(json.height)
            this._timestamp = marshal.datetime.fromJSON(json.timestamp)
            this._backingHeight = marshal.int.fromJSON(json.backingHeight)
        }
    }

    get amountWrapped(): bigint {
        assert(this._amountWrapped != null, 'uninitialized access')
        return this._amountWrapped
    }

    set amountWrapped(value: bigint) {
        this._amountWrapped = value
    }

    get bridgeFeeWrapped(): bigint {
        assert(this._bridgeFeeWrapped != null, 'uninitialized access')
        return this._bridgeFeeWrapped
    }

    set bridgeFeeWrapped(value: bigint) {
        this._bridgeFeeWrapped = value
    }

    get height(): string {
        assert(this._height != null, 'uninitialized access')
        return this._height
    }

    set height(value: string) {
        this._height = value
    }

    get timestamp(): Date {
        assert(this._timestamp != null, 'uninitialized access')
        return this._timestamp
    }

    set timestamp(value: Date) {
        this._timestamp = value
    }

    get backingHeight(): number {
        assert(this._backingHeight != null, 'uninitialized access')
        return this._backingHeight
    }

    set backingHeight(value: number) {
        this._backingHeight = value
    }

    toJSON(): object {
        return {
            amountWrapped: marshal.bigint.toJSON(this.amountWrapped),
            bridgeFeeWrapped: marshal.bigint.toJSON(this.bridgeFeeWrapped),
            height: this.height,
            timestamp: marshal.datetime.toJSON(this.timestamp),
            backingHeight: this.backingHeight,
        }
    }
}
