import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FormsService } from './forms.service';
import { CreateFormDto } from './dto/request/create-form.dto';
import { UpdateFormDto } from './dto/request/update-form.dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GenericResponsesDto } from 'src/common/dto/generic-response.dto';
import { PaginationDto, PaginationRequestMetaDto } from 'src/common/dto/pagination-response.dto';
import { ResponseFormsDto } from './dto/response/response-forms.dto';
import { FormExistsPipe } from './decorators/forms.validator';

@ApiTags('Forms')
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
    description: 'Sin permisos para ejecutar esta acción',
  }
)
@ApiResponse(
  {
    status: 404,
    description: 'Formulario no encontrado',
  }
)
@ApiBearerAuth()
@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) { }

  @Post()
  @ApiOperation({ summary: 'Crear Formulario', description: 'Crea un nuevo Formulario en el sistema.' })
  @ApiOkResponse({ description: 'Formulario creado exitosamente.', type: GenericResponsesDto })
  create(@Body() createFormDto: CreateFormDto) {
    return this.formsService.create(createFormDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Endpoint para obtener todos los Formularios',
    description: 'Permite obtener una lista paginada de todos los Formularios registrados en el sistema.'
  })
  @ApiOkResponse({ description: 'Lista paginada de Formularios', type: PaginationDto<ResponseFormsDto> })
  findAll(@Query() meta: PaginationRequestMetaDto) {
    return this.formsService.findAll(meta);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Endpoint para obtener un Formulario por ID',
    description: 'Permite obtener la información de un Formulario existente utilizando su ID.'
  })
  @ApiOkResponse({ description: 'Formulario obtenido exitosamente', type: ResponseFormsDto })
  findOne(@Param('id', FormExistsPipe) id: string) {
    return this.formsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Endpoint para actualizar un Formulario por ID',
    description: 'Permite actualizar la información de un Formulario existente utilizando su ID.'
  })
  @ApiOkResponse({ description: 'Formulario actualizado exitosamente', type: GenericResponsesDto })
  update(@Param('id', FormExistsPipe) id: string, @Body() updateFormDto: UpdateFormDto) {
    return this.formsService.update(+id, updateFormDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Endpoint para eliminar un Formulario por ID',
    description: 'Permite eliminar la información de un Formulario existente utilizando su ID.'
  })
  @ApiOkResponse({ description: 'Formulario eliminado exitosamente', type: GenericResponsesDto })
  remove(@Param('id', FormExistsPipe) id: string) {
    return this.formsService.remove(+id);
  }
}
