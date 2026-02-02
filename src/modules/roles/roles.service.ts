import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/request/create-role.dto';
import { UpdateRoleDto } from './dto/request/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, RolesHasPermission } from './entities/role.entity';
import { In, Repository } from 'typeorm';
import { GenericResponsesDto } from 'src/common/dto/generic-response.dto';
import { PaginationDto, PaginationRequestMetaDto } from 'src/common/dto/pagination-response.dto';
import { ResponseListRoleDto } from './dto/response/response-role-list.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
    @InjectRepository(RolesHasPermission)
    private readonly rolesHasPermissionRepository: Repository<RolesHasPermission>
  ) { }

  async create(createRoleDto: CreateRoleDto): Promise<GenericResponsesDto> {
    const newRole = this.rolesRepository.create(createRoleDto);
    const saveRole = await this.rolesRepository.save(newRole);

    createRoleDto.permissions_ids.forEach(async (pid) => {
      const roleHasPermission = new RolesHasPermission();
      roleHasPermission.permissions_id = pid;
      roleHasPermission.roles_id = saveRole.id;
      await this.rolesHasPermissionRepository.save(roleHasPermission);
    });

    if (!newRole) throw new BadRequestException('Error al crear el rol');
    return { message: 'Rol creado exitosamente', statusCode: 201, error: '' };
  }

  async findAll(meta: PaginationRequestMetaDto): Promise<PaginationDto<ResponseListRoleDto>> {
    const page = meta?.page || 1;
    const limit = meta?.limit || 10;
    const orderBy = meta?.orderBy || 'id';
    const order = meta?.order || 'DESC';

    const [roles, total] = await this.rolesRepository.findAndCount({
      select: ['id', 'name', 'description', 'status'],
      order: { [orderBy]: order },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: roles,
      meta: {
        page: page,
        limit: limit,
        total,
        totalPages: Math.ceil(total / limit),
      }
    }
  }

  async findOne(id: number) {
    const role = await this.rolesRepository.findOne({
      where: { id, RolesHasPermissions: { status: 1, permission: { status: 1 } } },
      relations: { RolesHasPermissions: { permission: true } },
      select: {
        id: true, name: true, description: true, status: true,
        RolesHasPermissions: {
          permissions_id: true,
          permission: {
            id: true, name: true, description: true
          }
        }
      }
    });
    const roleWithPermissions = {
      ...role,
      permissions: role?.RolesHasPermissions.map(rp => rp.permission),
      permissions_ids: role?.RolesHasPermissions.map(rp => rp.permissions_id)
    };
    if (roleWithPermissions?.RolesHasPermissions) delete roleWithPermissions.RolesHasPermissions;
    if (!role) return null
    return roleWithPermissions;
  }

  findByIds(ids: number[]) {
    return this.rolesRepository.findBy({ id: In(ids) });
  }

  findOneByName(name: string) {
    return this.rolesRepository.findOneBy({ name });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const { permissions_ids, ...rest } = updateRoleDto
    await this.rolesRepository.update(id, rest);
    if (permissions_ids && permissions_ids.length) {
      const oldPermissions = await this.rolesHasPermissionRepository.findBy({ roles_id: id })
      const oldPermissions_ids = oldPermissions.map(p => p.permissions_id)
      // Necesito filtrar los permisos recibidos en updateRoleDto 
      const deletePermissions = oldPermissions_ids.filter(p => !permissions_ids.includes(p))
      const newPermissions = permissions_ids.filter(p => !oldPermissions_ids.includes(p))
      const activePermissions = permissions_ids.filter(p => oldPermissions_ids.includes(p))
      // Inactivamos los permisos a eliminar
      await this.rolesHasPermissionRepository.update({ roles_id: id, permissions_id: In(deletePermissions) }, { status: 0 });
      // Actualizamos los que posiblemente estaban inactivos los permisos nuevos
      await this.rolesHasPermissionRepository.update({ roles_id: id, permissions_id: In(activePermissions) }, { status: 1 });
      // registramos los permisos nuevos
      await this.rolesHasPermissionRepository.save(newPermissions.map(p => ({ roles_id: id, permissions_id: p })));
    }
    return { message: 'Rol actualizado exitosamente', statusCode: 200, error: '' };
  }

  async remove(id: number) {
    await this.rolesRepository.update(id, { status: 0 });
    return { message: 'Rol eliminado exitosamente', statusCode: 200, error: '' };
  }
}
