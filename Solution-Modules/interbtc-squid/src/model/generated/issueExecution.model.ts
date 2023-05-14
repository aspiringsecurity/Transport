import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToOne as OneToOne_, Index as Index_, JoinColumn as JoinColumn_, ManyToOne as ManyToOne_} from "typeorm"
import * as marshal from "./marshal"
import {Issue} from "./issue.model"
import {Height} from "./height.model"

@Entity_()
export class IssueExecution {
    constructor(props?: Partial<IssueExecution>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_({unique: true})
    @OneToOne_(() => Issue, {nullable: false})
    @JoinColumn_()
    issue!: Issue

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    amountWrapped!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    bridgeFeeWrapped!: bigint

    @Index_()
    @ManyToOne_(() => Height, {nullable: true})
    height!: Height

    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date
}
