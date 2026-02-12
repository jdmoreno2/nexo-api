import { Equipment } from "src/modules/equipments/entities/equipment.entity";
import { Order } from "src/modules/orders/entities/order.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  description?: string

  @Column({ type: 'timestamp', nullable: true })
  start_date: Date

  @Column({ type: 'timestamp', nullable: true })
  end_date: Date

  @Column({ default: 1 })
  status: number

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date

  @Column({ nullable: true, type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at?: Date

  @Column()
  orders_id: number;

  @Column()
  equipments_id: number;

  @Column()
  users_id: number;

  @ManyToOne(() => Order, (order) => order.id)
  @JoinColumn({ name: 'orders_id' })
  order: Order;

  @ManyToOne(() => Equipment, (equipment) => equipment.id)
  @JoinColumn({ name: 'equipments_id' })
  equipment: Equipment;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'users_id' })
  user: User;
}
