import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UsersHasRoles } from './entities/user.entity';
import { In, Repository } from 'typeorm';
import { PaginationDto, PaginationRequestMetaDto } from 'src/common/dto/pagination-response.dto';
import * as bcrypt from 'bcrypt';
import { GenericResponsesDto } from 'src/common/dto/generic-response.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UsersHasRoles)
    private readonly userRolRepository: Repository<UsersHasRoles>,
  ) { }

  async create(createUserDto: CreateUserDto, file: string): Promise<GenericResponsesDto> {
    if (file) {
      createUserDto.avatar = file;
    }
    const password_hash = bcrypt.hashSync(createUserDto.password, 10);
    createUserDto['password_hash'] = password_hash;
    const newUser = await this.userRepository.save(createUserDto)
    for (const role of createUserDto.roles_ids) {
      const userRole = new UsersHasRoles()
      userRole.users_id = newUser.id;
      userRole.roles_id = Number(role);
      await this.userRolRepository.save(userRole);
    }
    if (newUser) return { message: 'Usuario creado exitosamente', statusCode: 201, error: '' };
    throw new BadRequestException('Error al crear al usuario')
  }

  async findAll(meta: PaginationRequestMetaDto): Promise<PaginationDto<User>> {
    const page = meta?.page || 1;
    const limit = meta?.limit || 10;
    const [users, total] = await this.userRepository.findAndCount({
      relations: {
        usersHasRoles: {
          role: true
        },
        identificationType: true
      },
      select: {
        id: true,
        identifier: true,
        name: true,
        lastname: true,
        email: true,
        avatar_url: true,
        status: true,
        identification_types_id: true,
        created_at: true,
        usersHasRoles: {
          roles_id: true,
          role: {
            id: true,
            name: true
          }
        },
        identificationType: {
          name: true
        }
      },
      order: { [meta.orderBy as string]: meta.order },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: users,
      meta: {
        page: page,
        limit: limit,
        total,
        totalPages: Math.ceil(total / limit),
      }
    }
  }

  findOneByIdentifier(identifier: number) {
    return this.userRepository.findOneBy({ identifier });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      relations: {
        identificationType: true,
        usersHasRoles: { role: true }
      },
      select: {
        id: true,
        identifier: true,
        name: true,
        lastname: true,
        email: true,
        avatar_url: true,
        status: true,
        identification_types_id: true,
        usersHasRoles: {
          roles_id: true,
          role: {
            id: true,
            name: true
          }
        },
        identificationType: {
          name: true
        },
      },
      where: { id }
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto, file: string): Promise<GenericResponsesDto> {

    if (file) {
      updateUserDto.avatar = file;
      delete updateUserDto.avatar;
    } else {
      delete updateUserDto.avatar;
    }

    if (updateUserDto.password) {
      const password_hash = bcrypt.hashSync(updateUserDto.password, 10);
      updateUserDto['password_hash'] = password_hash;
      delete updateUserDto.password;
    } else {
      delete updateUserDto.password;
    }

    if (updateUserDto.roles_ids) {
      const userRoles = await this.userRolRepository.findBy({ users_id: id });
      const userRoleIds = userRoles.map(ur => ur.roles_id);

      const rolesToAdd = updateUserDto.roles_ids.filter(rid => !userRoleIds.includes(rid));
      const rolesToRemove = userRoleIds.filter(rid => !updateUserDto.roles_ids!.includes(rid));
      const activeRoles = userRoleIds.filter(rid => updateUserDto.roles_ids!.includes(rid));

      // Inactivamos los permisos a eliminar
      await this.userRolRepository.update({ users_id: id, roles_id: In(rolesToRemove) }, { status: 0 });
      // Actualizamos los que posiblemente estaban inactivos los permisos nuevos
      await this.userRolRepository.update({ users_id: id, roles_id: In(activeRoles) }, { status: 1 });
      await this.userRolRepository.save(rolesToAdd.map(r => ({ users_id: id, roles_id: r })));
    }

    delete updateUserDto.roles_ids;
    const updatedUser = await this.userRepository.update(id, updateUserDto)

    if (updatedUser.affected === 0) throw new BadRequestException('Error al actualizar el usuario')

    return { message: 'Usuario actualizado exitosamente', statusCode: 200, error: '' };
  }

  async remove(id: number): Promise<GenericResponsesDto> {
    const updateUser = await this.userRepository.update(id, ({ status: 0 }));
    if (updateUser.affected === 0) throw new BadRequestException('Error al eliminar el usuario')
    return { message: 'Usuario eliminado exitosamente', statusCode: 200, error: '' };
  }
}
