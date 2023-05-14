import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {PooledAmount} from "./_pooledAmount"

@Entity_()
export class CumulativeDexTradingVolume {
    constructor(props?: Partial<CumulativeDexTradingVolume>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_("timestamp with time zone", {nullable: false})
    tillTimestamp!: Date

    @Column_("jsonb", {transformer: {to: obj => obj.map((val: any) => val.toJSON()), from: obj => obj == null ? undefined : marshal.fromList(obj, val => new PooledAmount(undefined, marshal.nonNull(val)))}, nullable: false})
    amounts!: (PooledAmount)[]
}
