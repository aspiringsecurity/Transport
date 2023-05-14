import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class CumulativeDexTradeCount {
    constructor(props?: Partial<CumulativeDexTradeCount>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_("timestamp with time zone", {nullable: false})
    tillTimestamp!: Date

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    count!: bigint
}
