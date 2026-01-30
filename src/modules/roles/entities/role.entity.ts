import { Permission } from "src/modules/permissions/entities/permission.entity";
import { Subscriber } from "src/modules/subscribers/entities/subscriber.entity";
import { UsersHasRoles } from "src/modules/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 1 })
  status: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ nullable: true, type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at?: Date;

  @Column()
  subscribers_id: number;

  @ManyToOne(() => Subscriber, (subscriber) => subscriber.id)
  @JoinColumn({ name: 'subscribers_id' })
  subscriber: Subscriber;

  @OneToMany(() => RolesHasPermission, (rp) => rp.role)
  RolesHasPermissions: RolesHasPermission[];

  @OneToMany(() => UsersHasRoles, (ru) => ru.role)
  UsersHasRoles: UsersHasRoles[];
}


@Entity('roles_has_permissions')
export class RolesHasPermission {
  @PrimaryColumn()
  roles_id: number;

  @PrimaryColumn()
  permissions_id: number;

  @Column({ default: 1 })
  status: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ nullable: true, type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at?: Date;

  @ManyToOne(() => Permission, (permission) => permission.id)
  @JoinColumn({ name: 'permissions_id' })
  permission: Permission;

  @ManyToOne(() => Role, (role) => role.id)
  @JoinColumn({ name: 'roles_id' })
  role: Role;

}
