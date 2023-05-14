import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToOne as OneToOne_, Index as Index_, JoinColumn as JoinColumn_, ManyToOne as ManyToOne_} from "typeorm"
import * as marshal from "./marshal"
import {LoanMarket} from "./loanMarket.model"
import {Currency, fromJsonCurrency} from "./_currency"
import {Height} from "./height.model"

@Entity_()
export class LoanMarketActivation {
    constructor(props?: Partial<LoanMarketActivation>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_({unique: true})
    @OneToOne_(() => LoanMarket, {nullable: false})
    @JoinColumn_()
    market!: LoanMarket

    @Column_("jsonb", {transformer: {to: obj => obj.toJSON(), from: obj => obj == null ? undefined : fromJsonCurrency(obj)}, nullable: false})
    token!: Currency

    @Index_()
    @ManyToOne_(() => Height, {nullable: true})
    height!: Height

    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date
}
