import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToOne as OneToOne_} from "typeorm"
import * as marshal from "./marshal"
import {IssueRequest} from "./_issueRequest"
import {Vault} from "./vault.model"
import {IssuePeriod} from "./issuePeriod.model"
import {IssuePayment} from "./issuePayment.model"
import {IssueStatus} from "./_issueStatus"
import {IssueExecution} from "./issueExecution.model"
import {IssueCancellation} from "./issueCancellation.model"
import {Refund} from "./refund.model"

@Entity_()
export class Issue {
    constructor(props?: Partial<Issue>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("jsonb", {transformer: {to: obj => obj.toJSON(), from: obj => obj == null ? undefined : new IssueRequest(undefined, obj)}, nullable: false})
    request!: IssueRequest

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    griefingCollateral!: bigint

    @Column_("text", {nullable: false})
    userParachainAddress!: string

    @Column_("text", {nullable: false})
    vaultWalletPubkey!: string

    @Column_("text", {nullable: false})
    vaultBackingAddress!: string

    @Index_()
    @ManyToOne_(() => Vault, {nullable: true})
    vault!: Vault

    @Index_()
    @ManyToOne_(() => IssuePeriod, {nullable: true})
    period!: IssuePeriod

    @OneToOne_(() => IssuePayment)
    backingPayment!: IssuePayment | undefined | null

    @Index_()
    @Column_("varchar", {length: 15, nullable: true})
    status!: IssueStatus | undefined | null

    @OneToOne_(() => IssueExecution)
    execution!: IssueExecution | undefined | null

    @OneToOne_(() => IssueCancellation)
    cancellation!: IssueCancellation | undefined | null

    @OneToOne_(() => Refund)
    refund!: Refund | undefined | null
}
