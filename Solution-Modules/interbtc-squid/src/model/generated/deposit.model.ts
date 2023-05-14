import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Currency, fromJsonCurrency} from "./_currency"
import {Height} from "./height.model"

@Entity_()
export class Deposit {
    constructor(props?: Partial<Deposit>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("jsonb", {transformer: {to: obj => obj.toJSON(), from: obj => obj == null ? undefined : fromJsonCurrency(obj)}, nullable: false})
    token!: Currency

    @Column_("text", {nullable: false})
    symbol!: string

    @Column_("text", {nullable: false})
    userParachainAddress!: string

    @Column_("text", {nullable: false})
    type!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    amountDeposited!: bigint | undefined | null

    @Column_("numeric", {transformer: marshal.floatTransformer, nullable: true})
    amountDepositedUsdt!: number | undefined | null

    @Column_("numeric", {transformer: marshal.floatTransformer, nullable: true})
    amountDepositedBtc!: number | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    amountWithdrawn!: bigint | undefined | null

    @Column_("numeric", {transformer: marshal.floatTransformer, nullable: true})
    amountWithdrawnUsdt!: number | undefined | null

    @Column_("numeric", {transformer: marshal.floatTransformer, nullable: true})
    amountWithdrawnBtc!: number | undefined | null

    @Index_()
    @ManyToOne_(() => Height, {nullable: true})
    height!: Height

    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date

    @Column_("text", {nullable: true})
    comment!: string | undefined | null

    @Column_("text", {nullable: false})
    currencySymbol!: string
}
