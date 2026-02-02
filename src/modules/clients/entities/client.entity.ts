import { Subscriber } from "src/modules/subscribers/entities/subscriber.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('client')
export class Client {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false, unique: true })
  nit: string

  @Column()
  address?: string

  @Column()
  phone?: string

  @Column({ default: 1 })
  status: number

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date

  @Column({ nullable: true, type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at?: Date


  @Column()
  subscribers_id: number;

  @ManyToOne(() => Subscriber, (subscriber) => subscriber.id)
  @JoinColumn({ name: 'subscribers_id' })
  subscriber: Subscriber;

}
