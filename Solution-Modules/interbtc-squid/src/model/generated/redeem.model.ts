import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, OneToOne as OneToOne_} from "typeorm"
import * as marshal from "./marshal"
import {RedeemRequest} from "./_redeemRequest"
import {Vault} from "./vault.model"
import {RedeemPeriod} from "./redeemPeriod.model"
import {RedeemPayment} from "./redeemPayment.model"
import {RedeemStatus} from "./_redeemStatus"
import {RedeemExecution} from "./redeemExecution.model"
import {RedeemCancellation} from "./redeemCancellation.model"

@Entity_()
export class Redeem {
    constructor(props?: Partial<Redeem>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("jsonb", {transformer: {to: obj => obj.toJSON(), from: obj => obj == null ? undefined : new RedeemRequest(undefined, obj)}, nullable: false})
    request!: RedeemRequest

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    bridgeFee!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    collateralPremium!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    btcTransferFee!: bigint

    @Column_("text", {nullable: false})
    userParachainAddress!: string

    @Column_("text", {nullable: false})
    userBackingAddress!: string

    @Index_()
    @ManyToOne_(() => Vault, {nullable: true})
    vault!: Vault

    @Index_()
    @ManyToOne_(() => RedeemPeriod, {nullable: true})
    period!: RedeemPeriod

    @OneToOne_(() => RedeemPayment)
    backingPayment!: RedeemPayment | undefined | null

    @Column_("varchar", {length: 10, nullable: true})
    status!: RedeemStatus | undefined | null

    @OneToOne_(() => RedeemExecution)
    execution!: RedeemExecution | undefined | null

    @OneToOne_(() => RedeemCancellation)
    cancellation!: RedeemCancellation | undefined | null
}
