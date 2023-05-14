import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import {WorkReport} from "./workReport.model"
import {JoinGroup} from "./joinGroup.model"
import {StorageOrder} from "./storageOrder.model"

@Entity_()
export class Account {
  constructor(props?: Partial<Account>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @OneToMany_(() => WorkReport, e => e.account)
  workReports!: WorkReport[]

  @OneToMany_(() => JoinGroup, e => e.member)
  joinGroups!: JoinGroup[]

  @OneToMany_(() => StorageOrder, e => e.account)
  storageOrders!: StorageOrder[]
}
