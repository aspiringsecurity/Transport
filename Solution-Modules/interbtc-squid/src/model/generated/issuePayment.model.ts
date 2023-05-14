import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToOne as OneToOne_, Index as Index_, JoinColumn as JoinColumn_} from "typeorm"
import * as marshal from "./marshal"
import {Issue} from "./issue.model"

/**
 * Bitcoin payment executing an issue
 */
@Entity_()
export class IssuePayment {
    constructor(props?: Partial<IssuePayment>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_({unique: true})
    @OneToOne_(() => Issue, {nullable: false})
    @JoinColumn_()
    issue!: Issue

    @Column_("text", {nullable: false})
    btcTxId!: string

    @Column_("int4", {nullable: false})
    confirmations!: number

    @Column_("int4", {nullable: true})
    blockHeight!: number | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    amount!: bigint
}
