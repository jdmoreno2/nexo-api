import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { CreateBranchDto } from './dto/request/create-branch.dto';
import { UpdateBranchDto } from './dto/request/update-branch.dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GenericResponsesDto } from 'src/common/dto/generic-response.dto';
import { PaginationDto, PaginationRequestMetaDto } from 'src/common/dto/pagination-response.dto';
import { BranchExistsPipe } from './decorators/clients.validator';
import { ResponseBranchtDto } from './dto/response/response-branch.dto';

@ApiBearerAuth()
@ApiTags('Branches')
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
    description: 'Sin permisos para realizar esta accion',
  }
)
@ApiResponse(
  {
    status: 404,
    description: 'Sucursal no encontrada',
  }
)
@Controller('branches')
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) { }

  @Post()
  @ApiOperation({
    summary: 'Crear Cliente',
    description: 'Crea un nuevo cliente en el sistema.'
  })
  @ApiOkResponse({ description: 'Cliente creado exitosamente.', type: GenericResponsesDto })
  create(@Body() createBranchDto: CreateBranchDto) {
    return this.branchesService.create(createBranchDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Endpoint para obtener todos los clientes',
    description: 'Permite obtener una lista paginada de todos los clientes registrados en el sistema.'
  })
  @ApiOkResponse({
    description: 'Lista paginada de clientes',
    type: PaginationDto<ResponseBranchtDto>
  })
  findAll(@Query() meta: PaginationRequestMetaDto) {
    return this.branchesService.findAll(meta);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Endpoint para obtener un cliente por ID',
    description: 'Permite obtener la información de un cliente existente utilizando su ID.'
  })
  @ApiOkResponse({ description: 'Cliente obtenido exitosamente', type: ResponseBranchtDto })
  findOne(@Param('id', BranchExistsPipe) id: string) {
    return this.branchesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Endpoint para actualizar un cliente por ID',
    description: 'Permite actualizar la información de un cliente existente utilizando su ID.'
  })
  @ApiOkResponse({ description: 'Cliente actualizado exitosamente', type: GenericResponsesDto })
  update(@Param('id', BranchExistsPipe) id: string, @Body() updateBranchDto: UpdateBranchDto) {
    return this.branchesService.update(+id, updateBranchDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Endpoint para eliminar un cliente por ID',
    description: 'Permite eliminar (Inactivar o softDelete) un cliente existente utilizando su ID.'
  })
  @ApiOkResponse({ description: 'Cliente eliminado exitosamente', type: GenericResponsesDto })
  remove(@Param('id', BranchExistsPipe) id: string) {
    return this.branchesService.remove(+id);
  }
}
