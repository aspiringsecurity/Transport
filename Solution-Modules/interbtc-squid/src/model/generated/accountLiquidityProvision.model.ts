import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Height} from "./height.model"
import {PooledAmount} from "./_pooledAmount"
import {LiquidityProvisionType} from "./_liquidityProvisionType"

@Entity_()
export class AccountLiquidityProvision {
    constructor(props?: Partial<AccountLiquidityProvision>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Height, {nullable: true})
    height!: Height

    @Index_()
    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date

    @Column_("jsonb", {transformer: {to: obj => obj.map((val: any) => val.toJSON()), from: obj => obj == null ? undefined : marshal.fromList(obj, val => new PooledAmount(undefined, marshal.nonNull(val)))}, nullable: false})
    amounts!: (PooledAmount)[]

    @Index_()
    @Column_("text", {nullable: false})
    accountId!: string

    @Index_()
    @Column_("varchar", {length: 10, nullable: false})
    type!: LiquidityProvisionType
}
