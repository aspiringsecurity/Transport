import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToOne as OneToOne_, Index as Index_, JoinColumn as JoinColumn_, ManyToOne as ManyToOne_} from "typeorm"
import {Redeem} from "./redeem.model"
import {Height} from "./height.model"

@Entity_()
export class RedeemExecution {
    constructor(props?: Partial<RedeemExecution>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_({unique: true})
    @OneToOne_(() => Redeem, {nullable: false})
    @JoinColumn_()
    redeem!: Redeem

    @Index_()
    @ManyToOne_(() => Height, {nullable: true})
    height!: Height

    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date
}
