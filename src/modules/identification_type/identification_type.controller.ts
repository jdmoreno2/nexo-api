import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IdentificationTypeService } from './identification_type.service';
import { CreateIdentificationTypeDto } from './dto/request/create-identification_type.dto';
import { UpdateIdentificationTypeDto } from './dto/request/update-identification_type.dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GenericResponsesDto } from 'src/common/dto/generic-response.dto';
import { PaginationDto } from 'src/common/dto/pagination-response.dto';
import { ResponseIdentificationTypeDto } from './dto/response/response-identification-type.dto';

@ApiTags('Identification Type')
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
    description: 'Tipo de indentificacion no encontrado',
  }
)
@ApiBearerAuth()
@Controller('identification-type')
export class IdentificationTypeController {
  constructor(private readonly identificationTypeService: IdentificationTypeService) { }

  @Post()
  @ApiOperation({ summary: 'Crear tipo de indentificacion', description: 'Crea un nuevo tipo de indentificacion en el sistema.' })
  @ApiOkResponse({ description: 'Tipo de indentificacion creado exitosamente.', type: GenericResponsesDto })
  create(@Body() createIdentificationTypeDto: CreateIdentificationTypeDto) {
    return this.identificationTypeService.create(createIdentificationTypeDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Endpoint para obtener todos los tipos de indentificaciones',
    description: 'Permite obtener una lista paginada de todos los tipos de indentificaciones registrados en el sistema.'
  })
  @ApiOkResponse({ description: 'Lista paginada de tipos de indentificaciones', type: PaginationDto<ResponseIdentificationTypeDto> })
  findAll() {
    return this.identificationTypeService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Endpoint para obtener un tipo de indentificacion por ID',
    description: 'Permite obtener la información de un tipo de indentificacion existente utilizando su ID.'
  })
  @ApiOkResponse({ description: 'Tipo de indentificacion obtenido exitosamente', type: ResponseIdentificationTypeDto })
  findOne(@Param('id') id: string) {
    return this.identificationTypeService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Endpoint para actualizar un tipo de indentificacion por ID',
    description: 'Permite actualizar la información de un tipo de indentificacion existente utilizando su ID.'
  })
  @ApiOkResponse({ description: 'Tipo de indentificacion actualizado exitosamente', type: GenericResponsesDto })
  update(@Param('id') id: string, @Body() updateIdentificationTypeDto: UpdateIdentificationTypeDto) {
    return this.identificationTypeService.update(+id, updateIdentificationTypeDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Endpoint para eliminar un tipo de indentificacion por ID',
    description: 'Permite eliminar la información de un tipo de indentificacion existente utilizando su ID.'
  })
  @ApiOkResponse({ description: 'Tipo de indentificacion eliminado exitosamente', type: GenericResponsesDto })
  remove(@Param('id') id: string) {
    return this.identificationTypeService.remove(+id);
  }
}
