import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {Height} from "./height.model"

/**
 * BTC block stored by BTCRelay
 */
@Entity_()
export class RelayedBlock {
    constructor(props?: Partial<RelayedBlock>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Height, {nullable: true})
    relayedAtHeight!: Height

    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date

    @Column_("text", {nullable: false})
    blockHash!: string

    @Index_()
    @Column_("int4", {nullable: false})
    backingHeight!: number

    @Column_("text", {nullable: true})
    relayer!: string | undefined | null
}
