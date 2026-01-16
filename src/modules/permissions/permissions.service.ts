import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { STATUS_CODES } from 'http';
import { GenericResponsesDto } from 'src/common/dto/generic-response.dto';

@Injectable()
export class PermissionsService {

  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>
  ) { }

  async create(createPermissionDto: CreatePermissionDto): Promise<GenericResponsesDto> {

    const newPermission = await this.permissionRepository.save(createPermissionDto)

    if (newPermission) return { message: 'Permiso creado exitosamente', statusCode: 201, error: '' };
    throw new BadRequestException('Error al crear el permiso')

  }

  async findAll(meta: PaginationResponseMetaDto): Promise<PaginationDto<Permission>> {

    const page = meta?.page || 1;
    const limit = meta?.limit || 10;

    const [permissions, total] = await this.permissionRepository.findAndCount({
      order: { [meta.orderBy as string]: meta.order },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: permissions,
      meta: {
        page: page,
        limit: limit,
        total,
        totalPages: Math.ceil(total / limit),
      }
    }
  }

  findOne(id: number) {
    return this.permissionRepository.findOneBy({ id });
  }

  findOneByName(name: string) {
    return this.permissionRepository.findOneBy({ name });
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto): Promise<GenericResponsesDto> {
    const updatedPermission = await this.permissionRepository.update(id, updatePermissionDto);

    if (updatedPermission.affected === 0) throw new BadRequestException('Error al actualizar el permiso')

    return { message: 'Permiso actualizado exitosamente', statusCode: 200, error: '' };
  }

  async remove(id: number): Promise<GenericResponsesDto> {
    const updatedPermission = await this.permissionRepository.update(id, ({ status: 0 }));

    if (updatedPermission.affected === 0) throw new BadRequestException('Error al actualizar el permiso')

    return { message: 'Permiso eliminado exitosamente', statusCode: 200, error: '' };
  }
}
