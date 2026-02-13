import { IdentificationType } from "src/modules/identification_type/entities/identification_type.entity";
import { Role } from "src/modules/roles/entities/role.entity";
import { Subscriber } from "src/modules/subscribers/entities/subscriber.entity";
import { Entity, Column, PrimaryGeneratedColumn, ForeignKey, ManyToOne, JoinColumn, PrimaryColumn, OneToMany } from "typeorm";

@Entity('users')
export class User {

  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true, unique: true })
  identifier: number

  @Column({ nullable: false })
  name: string

  @Column()
  lastname: string

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

  @Column()
  subscribers_id: number;

  @Column()
  identification_types_id: number;

  @ManyToOne(() => Subscriber, (subscriber) => subscriber.id)
  @JoinColumn({ name: 'subscribers_id' })
  subscriber?: Subscriber

  @OneToMany(() => UsersHasRoles, (ru) => ru.user)
  usersHasRoles: UsersHasRoles[];

  @ManyToOne(() => IdentificationType, (identificationType) => identificationType.id)
  @JoinColumn({ name: 'identification_types_id' })
  identificationType: IdentificationType;

}

@Entity('users_has_roles')
export class UsersHasRoles {

  @PrimaryColumn()
  roles_id: number;

  @PrimaryColumn()
  users_id: number;

  @Column({ default: 1 })
  status: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ nullable: true, type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at?: Date;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'users_id' })
  user: User;

  @ManyToOne(() => Role, (role) => role.id)
  @JoinColumn({ name: 'roles_id' })
  role: Role;
}
