import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Currency, fromJsonCurrency} from "./_currency"
import {Height} from "./height.model"

@Entity_()
export class InterestAccrual {
    constructor(props?: Partial<InterestAccrual>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("jsonb", {transformer: {to: obj => obj.toJSON(), from: obj => obj == null ? undefined : fromJsonCurrency(obj)}, nullable: false})
    underlyingCurrency!: Currency

    @Column_("text", {nullable: false})
    currencySymbol!: string

    @Column_("numeric", {transformer: marshal.floatTransformer, nullable: false})
    utilizationRatio!: number

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    borrowRate!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    supplyRate!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalBorrows!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    totalReserves!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    borrowIndex!: bigint

    @Column_("numeric", {transformer: marshal.floatTransformer, nullable: true})
    totalBorrowsNative!: number | undefined | null

    @Column_("numeric", {transformer: marshal.floatTransformer, nullable: true})
    totalReservesNative!: number | undefined | null

    @Column_("numeric", {transformer: marshal.floatTransformer, nullable: true})
    borrowIndexNative!: number | undefined | null

    @Column_("numeric", {transformer: marshal.floatTransformer, nullable: true})
    totalBorrowsUsdt!: number | undefined | null

    @Column_("numeric", {transformer: marshal.floatTransformer, nullable: true})
    totalReservesUsdt!: number | undefined | null

    @Column_("numeric", {transformer: marshal.floatTransformer, nullable: true})
    borrowIndexUsdt!: number | undefined | null

    @Column_("numeric", {transformer: marshal.floatTransformer, nullable: true})
    borrowRatePct!: number | undefined | null

    @Column_("numeric", {transformer: marshal.floatTransformer, nullable: true})
    supplyRatePct!: number | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    exchangeRate!: bigint

    @Column_("numeric", {transformer: marshal.floatTransformer, nullable: false})
    exchangeRateFloat!: number

    @Index_()
    @ManyToOne_(() => Height, {nullable: true})
    height!: Height

    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date

    @Column_("text", {nullable: true})
    comment!: string | undefined | null
}
