import {BigDecimal} from "@subsquid/big-decimal"
import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import * as marshal from "./marshal"
import {VolumeType} from "./_volumeType"
import {Currency, fromJsonCurrency} from "./_currency"

@Entity_()
export class CumulativeVolumePerCurrencyPair {
    constructor(props?: Partial<CumulativeVolumePerCurrencyPair>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("varchar", {length: 12, nullable: false})
    type!: VolumeType

    @Column_("timestamp with time zone", {nullable: false})
    tillTimestamp!: Date

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    amount!: bigint

    @Column_("numeric", {transformer: marshal.bigdecimalTransformer, nullable: false})
    amountHuman!: BigDecimal

    @Column_("jsonb", {transformer: {to: obj => obj == null ? undefined : obj.toJSON(), from: obj => obj == null ? undefined : fromJsonCurrency(obj)}, nullable: true})
    wrappedCurrency!: Currency | undefined | null

    @Column_("jsonb", {transformer: {to: obj => obj == null ? undefined : obj.toJSON(), from: obj => obj == null ? undefined : fromJsonCurrency(obj)}, nullable: true})
    collateralCurrency!: Currency | undefined | null
}
