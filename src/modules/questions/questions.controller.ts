import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/request/create-question.dto';
import { UpdateQuestionDto } from './dto/request/update-question.dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GenericResponsesDto } from 'src/common/dto/generic-response.dto';
import { ResponseQuestiosDto } from './dto/response/response-questions.dto';
import { PaginationDto, PaginationRequestMetaDto } from 'src/common/dto/pagination-response.dto';
import { QuestionsExistsPipe } from './decorators/questios.validator';

@ApiTags('Questions')
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
    description: 'Pregunta no encontrada',
  }
)
@ApiBearerAuth()
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) { }

  @Post()
  @ApiOperation({ summary: 'Crear Pregunta', description: 'Crea una nueva Pregunta en el sistema.' })
  @ApiOkResponse({ description: 'Pregunta creada exitosamente.', type: GenericResponsesDto })
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Endpoint para obtener todos las Preguntas',
    description: 'Permite obtener una lista paginada de todos las Preguntas registrados en el sistema.'
  })
  @ApiOkResponse({ description: 'Lista paginada de Preguntas', type: PaginationDto<ResponseQuestiosDto> })
  findAll(@Query() meta: PaginationRequestMetaDto) {
    return this.questionsService.findAll(meta);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Endpoint para obtener una Pregunta por ID',
    description: 'Permite obtener la información de una Pregunta existente utilizando su ID.'
  })
  @ApiOkResponse({ description: 'Pregunta obtenida exitosamente', type: ResponseQuestiosDto })
  findOne(@Param('id', QuestionsExistsPipe) id: string) {
    return this.questionsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Endpoint para actualizar una Pregunta por ID',
    description: 'Permite actualizar la información de una Pregunta existente utilizando su ID.'
  })
  @ApiOkResponse({ description: 'Pregunta actualizada exitosamente', type: GenericResponsesDto })
  update(@Param('id', QuestionsExistsPipe) id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionsService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Endpoint para eliminar una Pregunta por ID',
    description: 'Permite eliminar la información de una Pregunta existente utilizando su ID.'
  })
  @ApiOkResponse({ description: 'Pregunta eliminada exitosamente', type: GenericResponsesDto })
  remove(@Param('id', QuestionsExistsPipe) id: string) {
    return this.questionsService.remove(+id);
  }
}
