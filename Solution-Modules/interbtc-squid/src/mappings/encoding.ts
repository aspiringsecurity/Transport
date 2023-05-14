import * as ss58 from "@subsquid/ss58";
import { Network } from "bitcoinjs-lib";
import {
    Token,
    NativeToken,
    ForeignAsset,
    Currency,
    LendToken,
    LpToken,
    PooledToken,
    StableLpToken,
    RateModelJump,
    RateModelCurve,
    RateModel,
} from "../model";
import {
    VaultId as VaultIdV1020000,
    CurrencyId as CurrencyId_V1020000,
} from "../types/v1020000";
import {
    InterestRateModel as InterestRateModel_V1021000,
} from "../types/v1021000";
import {
    Address as AddressV15,
    CurrencyId_Token as CurrencyId_TokenV15,
    VaultId as VaultIdV15,
} from "../types/v15";
import {
    Address as AddressV6,
    CurrencyId_Token as CurrencyId_TokenV6,
    VaultId as VaultIdV6,
} from "../types/v6";
import {
    LpToken as LpToken_V1021000,
    VaultId as VaultIdV1021000,
    CurrencyId as CurrencyId_V1021000,
} from "../types/v1021000";

import { CurrencyId_Token as CurrencyId_TokenV10 } from "../types/v10";
import { encodeBtcAddress, getBtcNetwork } from "./bitcoinUtils";

const bitcoinNetwork: Network = getBtcNetwork(process.env.BITCOIN_NETWORK);
const ss58format = process.env.SS58_CODEC || "substrate";

export const address = {
    interlay: ss58.codec(ss58format),
    btc: {
        encode(address: AddressV6 | AddressV15): string | undefined {
            return encodeBtcAddress(address, bitcoinNetwork);
        },
    },
};

export const legacyCurrencyId = {
    encode: (
        token: CurrencyId_TokenV6 | CurrencyId_TokenV10 | CurrencyId_TokenV15
    ): Currency => {
        // handle old type definition that had INTERBTC instead of IBTC
        if (token.value.__kind === "INTERBTC") {
            token = {
                ...token,
                value: {
                    __kind: "IBTC",
                },
            } as CurrencyId_TokenV15;
        }
        return new NativeToken({
            token: Token[(token as CurrencyId_TokenV15).value.__kind],
        });
    },
};

export const lpTokenId = {
    encode: (lpToken: LpToken_V1021000): PooledToken => {
        if (lpToken.__kind === "StableLpToken") {
            return new StableLpToken({
                poolId: lpToken.value,
            });
        } else if (lpToken.__kind === "ForeignAsset") {
            return new ForeignAsset({
                asset: lpToken.value,
            });
        } else if (lpToken.__kind === "Token"){
            return new NativeToken({
                token: Token[lpToken.value.__kind],
            });
        }

        // throw if unhandled
        throw new Error(`Unknown LpToken type to encode: ${JSON.stringify(lpToken)}`);
    }
};

export const currencyId = {
    encode: (asset: CurrencyId_V1020000 | CurrencyId_V1021000): Currency => {
        switch(asset.__kind) {
            case "LendToken":
                return new LendToken({
                    lendTokenId: asset.value,
                });
            case "ForeignAsset":
                return new ForeignAsset({
                    asset: asset.value,
                });
            case "Token":
                return new NativeToken({
                    token: Token[asset.value.__kind],
                });
            case "StableLpToken":
                return lpTokenId.encode(asset);
            case "LpToken":
                return new LpToken({
                    token0: lpTokenId.encode(asset.value[0]),
                    token1: lpTokenId.encode(asset.value[1])
                });

            default:
                // throw if not handled
                throw new Error(`Unknown currency type to encode: ${JSON.stringify(asset)}`);
        }
    },
};

// Note: At the moment, this method is primarily used to encode vault_ids.
// So adding lend tokens, lp token pairs, etc is kinda overkill
// and mainly done for future proofing.
// Very much unlike the currencyId.encode and lpTokenId.encode methods.
export const rateModel = {
    encode: (model: InterestRateModel_V1021000): RateModel => {
        if (model.__kind === "Jump") {
            return new RateModelJump({
                baseRate: model.value.baseRate,
                jumpRate: model.value.jumpRate,
                fullRate: model.value.fullRate,
                jumpUtilization: model.value.jumpUtilization,
            });
        } else {
            return new RateModelCurve({
                baseRate: model.value.baseRate,
            });
        }
    },
};

export function currencyToString(currency: Currency): string {
    switch (currency.isTypeOf) {
        case "LendToken":
            return `lendToken_${currency.lendTokenId.toString()}`;
        case "ForeignAsset":
            return currency.asset.toString();
        case "NativeToken":
            return currency.token.toString();
        case "StableLpToken":
            return `poolId_${currency.poolId.toString()}`;
        case "LpToken":
            const token0string = currencyToString(currency.token0);
            const token1string = currencyToString(currency.token1);
            return `lpToken__${token0string}__${token1string}`;

        default:
            // fallback throw if unhandled
            throw new Error(`Unknown currency type to stringify: ${JSON.stringify(currency)}`);
    }
}

export function encodeLegacyVaultId(vaultId: VaultIdV6 | VaultIdV15) {
    const addressStr = address.interlay.encode(vaultId.accountId).toString();
    const wrapped = legacyCurrencyId.encode(vaultId.currencies.wrapped);
    const collateral = legacyCurrencyId.encode(vaultId.currencies.collateral);
    return `${addressStr}-${currencyToString(wrapped)}-${currencyToString(
        collateral
    )}`;
}

export function encodeVaultId(vaultId: VaultIdV1021000) {
    const addressStr = address.interlay.encode(vaultId.accountId).toString();
    const wrapped = currencyId.encode(vaultId.currencies.wrapped);
    const collateral = currencyId.encode(vaultId.currencies.collateral);
    return `${addressStr}-${currencyToString(wrapped)}-${currencyToString(
        collateral
    )}`;
}
