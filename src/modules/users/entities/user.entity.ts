import { Suscriber } from "src/modules/suscribers/entities/suscriber.entity";
import { Entity, Column, PrimaryGeneratedColumn, ForeignKey } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false, unique: true })
    name: string

    @Column({ nullable: true })
    lastname?: string

    @Column({ nullable: false })
    email: string

    @Column({ nullable: false })
    password_hash: string

    @Column({ nullable: true })
    avatar_url?: string

    @Column({ default: 1 })
    status: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @Column({ nullable: true, type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at?: Date

    @ForeignKey(() => Suscriber)
    @Column({ nullable: true })
    suscriber_id?: number

}
