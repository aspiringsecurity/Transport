import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"

/**
 * Mapping of parachain raw/absolute blocks to parachain active blocks
 */
@Entity_()
export class Height {
    constructor(props?: Partial<Height>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    /**
     * Should be equal to the absolute value, for determinism
     */
    @Index_()
    @Column_("int4", {nullable: false})
    absolute!: number

    @Column_("int4", {nullable: false})
    active!: number
}
