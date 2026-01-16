import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/requests/create-permission.dto';
import { UpdatePermissionDto } from './dto/requests/update-permission.dto';
import { PermissionExistsPipe } from './decorators/permission.validator';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GenericResponsesDto } from 'src/common/dto/generic-response.dto';
import { PaginationDto, PaginationRequestMetaDto } from 'src/common/dto/pagination-response.dto';
import { Permission } from './entities/permission.entity';
import { ResponsePermissionDto } from './dto/responses/response-permission.dto';

@Controller('permissions')
@ApiTags('Permissions')
@ApiResponse(
  {
    status: 401,
    description: 'No autenticado',
  }
)
@ApiResponse(
  {
    status: 400,
    description: 'Datos de entrada inválidos',
  }
)
@ApiResponse(
  {
    status: 403,
    description: 'Sin permisos para crear permisos',
  }
)
@ApiResponse(
  {
    status: 404,
    description: 'Permiso no encontrado',
  }
)

export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) { }

  @ApiOperation({ summary: 'Crear permiso' })
  @Post()
  @ApiOkResponse({ description: 'Permiso creado exitosamente.', type: GenericResponsesDto })
  create(@Body() createPermissionDto: CreatePermissionDto): Promise<GenericResponsesDto> {
    return this.permissionsService.create(createPermissionDto);
  }

  @ApiOperation({ summary: 'Listar todos permisos' })
  @Get()
  @ApiOkResponse({ description: 'Permiso actualizado exitosamente.', type: PaginationDto<Permission> })
  async findAll(@Query() meta: PaginationRequestMetaDto) {
    return await this.permissionsService.findAll(meta);
  }

  @ApiOperation({ summary: 'Listar permiso por id' })
  @Get(':id')
  @ApiOkResponse({ description: 'Permiso actualizado exitosamente.', type: ResponsePermissionDto })
  findOne(@Param('id', PermissionExistsPipe) id: string) {
    return this.permissionsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Actualizar permiso por id' })
  @Patch(':id')
  @ApiOkResponse({ description: 'Permiso actualizado exitosamente.', type: GenericResponsesDto })
  update(
    @Param('id', PermissionExistsPipe) id: string,
    @Body() updatePermissionDto: UpdatePermissionDto
  ): Promise<GenericResponsesDto> {
    updatePermissionDto.id = +id;
    return this.permissionsService.update(+id, updatePermissionDto);
  }

  @ApiOperation({ summary: 'Eliminar permiso por id' })
  @Delete(':id')
  @ApiOkResponse({ description: 'Permiso eliminado exitosamente.', type: GenericResponsesDto })
  remove(
    @Param('id', PermissionExistsPipe) id: string
  ): Promise<GenericResponsesDto> {
    return this.permissionsService.remove(+id);
  }
}
