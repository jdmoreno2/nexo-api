import { Branch } from "src/modules/branches/entities/branch.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('equipment')
export class Equipment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false })
  serial: string;

  @Column({ nullable: false })
  brand: string;

  @Column({ nullable: true })
  model: string;

  @Column({ default: 1 })
  status: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ nullable: true, type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at?: Date;

  @Column()
  branches_id: number;

  @ManyToOne(() => Branch, (branch) => branch.id)
  @JoinColumn({ name: 'branches_id' })
  branch: Branch;
}
