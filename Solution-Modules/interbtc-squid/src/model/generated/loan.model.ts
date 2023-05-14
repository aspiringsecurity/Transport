import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Currency, fromJsonCurrency} from "./_currency"
import {Height} from "./height.model"

@Entity_()
export class Loan {
    constructor(props?: Partial<Loan>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("jsonb", {transformer: {to: obj => obj.toJSON(), from: obj => obj == null ? undefined : fromJsonCurrency(obj)}, nullable: false})
    token!: Currency

    @Column_("text", {nullable: false})
    userParachainAddress!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    amountBorrowed!: bigint | undefined | null

    @Column_("numeric", {transformer: marshal.floatTransformer, nullable: true})
    amountBorrowedUsdt!: number | undefined | null

    @Column_("numeric", {transformer: marshal.floatTransformer, nullable: true})
    amountBorrowedBtc!: number | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    amountRepaid!: bigint | undefined | null

    @Column_("numeric", {transformer: marshal.floatTransformer, nullable: true})
    amountRepaidUsdt!: number | undefined | null

    @Column_("numeric", {transformer: marshal.floatTransformer, nullable: true})
    amountRepaidBtc!: number | undefined | null

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
