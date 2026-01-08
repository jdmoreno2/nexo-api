import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Permission {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    name: string

    @Column()
    description?: string

    @Column({ default: 1 })
    status: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @Column({ nullable: true, type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}
