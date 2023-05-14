import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_, ManyToOne as ManyToOne_} from "typeorm"
import * as marshal from "./marshal"
import {Currency, fromJsonCurrency} from "./_currency"
import {Height} from "./height.model"

@Entity_()
export class Vault {
    constructor(props?: Partial<Vault>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_("text", {nullable: false})
    accountId!: string

    @Column_("jsonb", {transformer: {to: obj => obj.toJSON(), from: obj => obj == null ? undefined : fromJsonCurrency(obj)}, nullable: false})
    collateralToken!: Currency

    @Column_("jsonb", {transformer: {to: obj => obj.toJSON(), from: obj => obj == null ? undefined : fromJsonCurrency(obj)}, nullable: false})
    wrappedToken!: Currency

    @Index_()
    @ManyToOne_(() => Height, {nullable: true})
    registrationBlock!: Height

    @Column_("timestamp with time zone", {nullable: false})
    registrationTimestamp!: Date

    @Index_()
    @ManyToOne_(() => Height, {nullable: true})
    lastActivity!: Height | undefined | null
}
