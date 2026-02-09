import { Branch } from "src/modules/branches/entities/branch.entity"
import { OrdersType } from "src/modules/orders_types/entities/orders_type.entity"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity('orders_types')
export class Order {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  order_number: number

  @Column({ type: 'timestamp', nullable: true })
  close_date: Date

  @Column({ default: 1 })
  status: number

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date

  @Column({ nullable: true, type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at?: Date

  @Column()
  branches_id: number;

  @Column()
  orders_types_id: number;

  @ManyToOne(() => Branch, (branch) => branch.id)
  @JoinColumn({ name: 'branches_id' })
  branch: Branch;

  @ManyToOne(() => OrdersType, (ordersType) => ordersType.id)
  @JoinColumn({ name: 'orders_types_id' })
  ordersType: OrdersType;
}
