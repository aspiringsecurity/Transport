import {RateModelJump} from "./_rateModelJump"
import {RateModelCurve} from "./_rateModelCurve"

export type RateModel = RateModelJump | RateModelCurve

export function fromJsonRateModel(json: any): RateModel {
    switch(json?.isTypeOf) {
        case 'RateModelJump': return new RateModelJump(undefined, json)
        case 'RateModelCurve': return new RateModelCurve(undefined, json)
        default: throw new TypeError('Unknown json object passed as RateModel')
    }
}
