import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/request/create-role.dto';
import { UpdateRoleDto } from './dto/request/update-role.dto';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GenericResponsesDto } from 'src/common/dto/generic-response.dto';
import { PaginationDto, PaginationRequestMetaDto } from 'src/common/dto/pagination-response.dto';
import { ResponseListRoleDto } from './dto/response/response-role-list.dto';
import { RoleExistsPipe } from './decorators/roles.validator';
import { ResponseRoleDto } from './dto/response/response-role-dto';

@Controller('roles')
@ApiTags('Roles')
@ApiResponse({
  status: 401,
  description: 'No autenticado',
})
@ApiResponse({
  status: 400,
  description: 'Datos de entrada inválidos',
})
@ApiResponse({
  status: 403,
  description: 'Sin permisos para ejecutar esta acción',
})
@ApiResponse({
  status: 404,
  description: 'Rol no encontrado',
})
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Post()
  @ApiOperation({ summary: 'Crear rol', description: 'Crea un nuevo rol en el sistema.' })
  @ApiOkResponse({ description: 'Rol creado exitosamente.', type: GenericResponsesDto })
  create(@Body() createRoleDto: CreateRoleDto): Promise<GenericResponsesDto> {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Endpoint para obtener todos los roles',
    description: 'Permite obtener una lista paginada de todos los roles registrados en el sistema.'
  })
  @ApiOkResponse({ description: 'Lista paginada de roles', type: PaginationDto<ResponseListRoleDto> })
  findAll(@Query() meta: PaginationRequestMetaDto): Promise<PaginationDto<ResponseListRoleDto>> {
    return this.rolesService.findAll(meta);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Endpoint para obtener un rol por ID',
    description: 'Permite obtener la información de un rol existente utilizando su ID.'
  })
  @ApiOkResponse({ description: 'Rol obtenido exitosamente', type: ResponseRoleDto })
  findOne(@Param('id', RoleExistsPipe) id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Endpoint para actualizar un rol por ID',
    description: 'Permite actualizar la información de un rol existente utilizando su ID.'
  })
  @ApiOkResponse({ description: 'Rol actualizado exitosamente', type: GenericResponsesDto })
  update(@Param('id', RoleExistsPipe) id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id', RoleExistsPipe) id: string) {
    return this.rolesService.remove(+id);
  }
}
