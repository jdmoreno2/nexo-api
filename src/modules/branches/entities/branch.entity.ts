import { Client } from "src/modules/clients/entities/client.entity"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity('branch')
export class Branch {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  name: string

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
  clients_id: number;

  @ManyToOne(() => Client, (client) => client.id)
  @JoinColumn({ name: 'clients_id' })
  client: Client;
}
