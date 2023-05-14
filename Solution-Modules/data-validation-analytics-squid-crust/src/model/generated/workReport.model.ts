import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Account} from "./account.model"

@Entity_()
export class WorkReport {
  constructor(props?: Partial<WorkReport>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_()
  @ManyToOne_(() => Account, {nullable: false})
  account!: Account

  @Column_("jsonb", {transformer: {to: obj => obj, from: obj => obj == null ? undefined : marshal.fromList(obj, val => val == null ? undefined : marshal.fromList(val, val => val == null ? undefined : marshal.string.fromJSON(val)))}, nullable: true})
  addedFiles!: ((string | undefined | null)[] | undefined | null)[] | undefined | null

  @Column_("jsonb", {transformer: {to: obj => obj, from: obj => obj == null ? undefined : marshal.fromList(obj, val => val == null ? undefined : marshal.fromList(val, val => val == null ? undefined : marshal.string.fromJSON(val)))}, nullable: true})
  deletedFiles!: ((string | undefined | null)[] | undefined | null)[] | undefined | null

  @Column_("text", {nullable: true})
  extrinisicId!: string | undefined | null

  @Column_("timestamp with time zone", {nullable: false})
  createdAt!: Date

  @Column_("text", {nullable: false})
  blockHash!: string

  @Column_("int4", {nullable: false})
  blockNum!: number
}
