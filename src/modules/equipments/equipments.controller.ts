import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EquipmentsService } from './equipments.service';
import { CreateEquipmentDto } from './dto/request/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/request/update-equipment.dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GenericResponsesDto } from 'src/common/dto/generic-response.dto';
import { PaginationDto, PaginationRequestMetaDto } from 'src/common/dto/pagination-response.dto';
import { EquipmentExistsPipe } from './decorators/equipments.validator';
import { ResponseEquipmentDto } from './dto/responses/responses-equipment.dto';
import { EquipmentPaginationRequestMetaDto } from './dto/responses/equipment-pagination-request.dto';

@ApiBearerAuth()
@ApiTags('Equipments')
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
    description: 'Sin permisos para crear usuarios',
  }
)
@ApiResponse(
  {
    status: 404,
    description: 'Equipo no encontrado',
  }
)
@Controller('equipments')
export class EquipmentsController {
  constructor(private readonly equipmentsService: EquipmentsService) { }

  @Post()
  @ApiOperation({ summary: 'Crear Equipo', description: 'Crea un nuevo Equipo en el sistema.' })
  @ApiOkResponse({ description: 'Equipo creado exitosamente.', type: GenericResponsesDto })
  create(@Body() createEquipmentDto: CreateEquipmentDto) {
    return this.equipmentsService.create(createEquipmentDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Endpoint para obtener todos los Equipos',
    description: 'Permite obtener una lista paginada de todos los Equipos registrados en el sistema.'
  })
  @ApiOkResponse({ description: 'Lista paginada de Equipos', type: PaginationDto<ResponseEquipmentDto> })
  findAll(@Query() meta: EquipmentPaginationRequestMetaDto) {
    return this.equipmentsService.findAll(meta);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Endpoint para obtener un Equipo por ID',
    description: 'Permite obtener la información de un Equipo existente utilizando su ID.'
  })
  @ApiOkResponse({ description: 'Equipo obtenido exitosamente', type: ResponseEquipmentDto })
  findOne(@Param('id', EquipmentExistsPipe) id: string) {
    return this.equipmentsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Endpoint para actualizar un Equipo por ID',
    description: 'Permite actualizar la información de un Equipo existente utilizando su ID.'
  })
  @ApiOkResponse({ description: 'Equipo actualizado exitosamente', type: GenericResponsesDto })
  update(@Param('id', EquipmentExistsPipe) id: string, @Body() updateEquipmentDto: UpdateEquipmentDto) {
    return this.equipmentsService.update(+id, updateEquipmentDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Endpoint para eliminar un Equipo por ID',
    description: 'Permite eliminar la información de un Equipo existente utilizando su ID.'
  })
  @ApiOkResponse({ description: 'Equipo eliminado exitosamente', type: GenericResponsesDto })
  remove(@Param('id', EquipmentExistsPipe) id: string) {
    return this.equipmentsService.remove(+id);
  }
}
