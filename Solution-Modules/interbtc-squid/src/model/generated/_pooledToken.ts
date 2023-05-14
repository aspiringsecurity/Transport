import {NativeToken} from "./_nativeToken"
import {ForeignAsset} from "./_foreignAsset"
import {StableLpToken} from "./_stableLpToken"
import {LendToken} from "./_lendToken"

export type PooledToken = NativeToken | ForeignAsset | StableLpToken | LendToken

export function fromJsonPooledToken(json: any): PooledToken {
    switch(json?.isTypeOf) {
        case 'NativeToken': return new NativeToken(undefined, json)
        case 'ForeignAsset': return new ForeignAsset(undefined, json)
        case 'StableLpToken': return new StableLpToken(undefined, json)
        case 'LendToken': return new LendToken(undefined, json)
        default: throw new TypeError('Unknown json object passed as PooledToken')
    }
}
