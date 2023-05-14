import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToOne as OneToOne_, Index as Index_, JoinColumn as JoinColumn_, ManyToOne as ManyToOne_} from "typeorm"
import * as marshal from "./marshal"
import {Issue} from "./issue.model"
import {Height} from "./height.model"

/**
 * Refund on issue overpayment
 */
@Entity_()
export class Refund {
    constructor(props?: Partial<Refund>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_({unique: true})
    @OneToOne_(() => Issue, {nullable: false})
    @JoinColumn_()
    issue!: Issue

    @Column_("text", {nullable: false})
    issueID!: string

    @Column_("text", {nullable: false})
    btcAddress!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    amountPaid!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    btcFee!: bigint

    @Index_()
    @ManyToOne_(() => Height, {nullable: true})
    requestHeight!: Height

    @Column_("timestamp with time zone", {nullable: false})
    requestTimestamp!: Date

    @Index_()
    @ManyToOne_(() => Height, {nullable: true})
    executionHeight!: Height | undefined | null

    @Column_("timestamp with time zone", {nullable: true})
    executionTimestamp!: Date | undefined | null
}
