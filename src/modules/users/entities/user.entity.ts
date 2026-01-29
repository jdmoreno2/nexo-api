import { Subscriber } from "src/modules/subscribers/entities/subscriber.entity";
import { Entity, Column, PrimaryGeneratedColumn, ForeignKey, ManyToOne, JoinColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true, unique: true })
    identifier: number

    @Column({ nullable: false })
    id_type: string

    @Column({ nullable: false })
    name: string

    @Column({ nullable: true })
    lastname?: string

    @Column({ nullable: false, unique: true })
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

    @ManyToOne(() => Subscriber, (subscriber) => subscriber.id)
    @JoinColumn({ name: 'subscribers_id' })
    subscribers_id?: number

}
