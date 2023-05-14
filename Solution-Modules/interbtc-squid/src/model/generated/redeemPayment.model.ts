import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToOne as OneToOne_, Index as Index_, JoinColumn as JoinColumn_} from "typeorm"
import {Redeem} from "./redeem.model"

/**
 * Bitcoin payment executing a redeem
 */
@Entity_()
export class RedeemPayment {
    constructor(props?: Partial<RedeemPayment>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_({unique: true})
    @OneToOne_(() => Redeem, {nullable: false})
    @JoinColumn_()
    redeem!: Redeem

    @Column_("text", {nullable: false})
    btcTxId!: string

    @Column_("int4", {nullable: false})
    confirmations!: number

    @Column_("int4", {nullable: true})
    blockHeight!: number | undefined | null
}
