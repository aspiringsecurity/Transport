import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import * as marshal from "./marshal"
import {VolumeType} from "./_volumeType"

@Entity_()
export class CumulativeVolume {
    constructor(props?: Partial<CumulativeVolume>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("varchar", {length: 12, nullable: false})
    type!: VolumeType

    @Column_("timestamp with time zone", {nullable: false})
    tillTimestamp!: Date

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    amount!: bigint
}
