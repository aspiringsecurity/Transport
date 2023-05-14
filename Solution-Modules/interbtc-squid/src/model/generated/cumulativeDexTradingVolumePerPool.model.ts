import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {PoolType} from "./_poolType"
import {PooledAmount} from "./_pooledAmount"

@Entity_()
export class CumulativeDexTradingVolumePerPool {
    constructor(props?: Partial<CumulativeDexTradingVolumePerPool>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_("text", {nullable: false})
    poolId!: string

    @Column_("varchar", {length: 8, nullable: false})
    poolType!: PoolType

    @Index_()
    @Column_("timestamp with time zone", {nullable: false})
    tillTimestamp!: Date

    @Column_("jsonb", {transformer: {to: obj => obj.map((val: any) => val.toJSON()), from: obj => obj == null ? undefined : marshal.fromList(obj, val => new PooledAmount(undefined, marshal.nonNull(val)))}, nullable: false})
    amounts!: (PooledAmount)[]
}
