import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { QuestionsTypesService } from './questions_types.service';
import { CreateQuestionsTypeDto } from './dto/request/create-questions_type.dto';
import { UpdateQuestionsTypeDto } from './dto/request/update-questions_type.dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GenericResponsesDto } from 'src/common/dto/generic-response.dto';
import { PaginationDto, PaginationRequestMetaDto } from 'src/common/dto/pagination-response.dto';
import { ResponseQuestionsTypesDto } from './dto/response/response-question-type.dto';
import { QuestionsTypesExistsPipe } from './decorators/questions-types.validator';

@ApiTags('Questions Types')
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
    description: 'Tipo de Pregunta no encontrado',
  }
)
@ApiBearerAuth()
@Controller('questions-types')
export class QuestionsTypesController {
  constructor(private readonly questionsTypesService: QuestionsTypesService) { }

  @Post()
  @ApiOperation({ summary: 'Crear Tipo de Pregunta', description: 'Crea un nuevo Tipo de Pregunta en el sistema.' })
  @ApiOkResponse({ description: 'Tipo de Pregunta creado exitosamente.', type: GenericResponsesDto })
  create(@Body() createQuestionsTypeDto: CreateQuestionsTypeDto) {
    return this.questionsTypesService.create(createQuestionsTypeDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Endpoint para obtener todos los Tipos de Preguntas',
    description: 'Permite obtener una lista paginada de todos los Tipos de Preguntas registrados en el sistema.'
  })
  @ApiOkResponse({ description: 'Lista paginada de Tipos de Preguntas', type: PaginationDto<ResponseQuestionsTypesDto> })
  findAll(@Query() meta: PaginationRequestMetaDto) {
    return this.questionsTypesService.findAll(meta);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Endpoint para obtener un Tipo de Pregunta por ID',
    description: 'Permite obtener la información de un Tipo de Pregunta existente utilizando su ID.'
  })
  @ApiOkResponse({ description: 'Tipo de Pregunta obtenido exitosamente', type: ResponseQuestionsTypesDto })
  findOne(@Param('id', QuestionsTypesExistsPipe) id: string) {
    return this.questionsTypesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Endpoint para actualizar un Tipo de Pregunta por ID',
    description: 'Permite actualizar la información de un Tipo de Pregunta existente utilizando su ID.'
  })
  @ApiOkResponse({ description: 'Tipo de Pregunta actualizado exitosamente', type: GenericResponsesDto })
  update(@Param('id', QuestionsTypesExistsPipe) id: string, @Body() updateQuestionsTypeDto: UpdateQuestionsTypeDto) {
    return this.questionsTypesService.update(+id, updateQuestionsTypeDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Endpoint para eliminar un Tipo de Pregunta por ID',
    description: 'Permite eliminar la información de un Tipo de Pregunta existente utilizando su ID.'
  })
  @ApiOkResponse({ description: 'Tipo de Pregunta eliminado exitosamente', type: GenericResponsesDto })
  remove(@Param('id', QuestionsTypesExistsPipe) id: string) {
    return this.questionsTypesService.remove(+id);
  }
}
