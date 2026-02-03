import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('identification_type')
export class IdentificationType {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false, unique: true })
  name: string

  @Column({ nullable: true })
  description?: string

  @Column({ default: 1 })
  status: number

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date

  @Column({ nullable: true, type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at?: Date
}
