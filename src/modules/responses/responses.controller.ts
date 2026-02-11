import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ResponsesService } from './responses.service';
import { CreateResponseDto } from './dto/request/create-response.dto';
import { UpdateResponseDto } from './dto/request/update-response.dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseResponsesDto } from './dto/response/response-responses.dto';
import { PaginationDto, PaginationRequestMetaDto } from 'src/common/dto/pagination-response.dto';
import { GenericResponsesDto } from 'src/common/dto/generic-response.dto';
import { ResponsesExistsPipe } from './decorators/responses.validator';
import { QuestionsExistsPipe } from '../questions/decorators/questios.validator';

@ApiTags('Responses')
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
    description: 'Respuesta no encontrada',
  }
)
@ApiBearerAuth()
@Controller('responses')
export class ResponsesController {
  constructor(private readonly responsesService: ResponsesService) { }

  @Post()
  @ApiOperation({ summary: 'Crear Respuesta', description: 'Crea una nueva Respuesta en el sistema.' })
  @ApiOkResponse({ description: 'Respuesta creada exitosamente.', type: GenericResponsesDto })
  create(@Body() createResponseDto: CreateResponseDto) {
    return this.responsesService.create(createResponseDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Endpoint para obtener todos las Respuestas',
    description: 'Permite obtener una lista paginada de todos las Respuestas registrados en el sistema.'
  })
  @ApiOkResponse({ description: 'Lista paginada de Respuestas', type: PaginationDto<ResponseResponsesDto> })
  findAll(@Query() meta: PaginationRequestMetaDto) {
    return this.responsesService.findAll(meta);
  }

  @Get('by-question/:questionId')
  @ApiOperation({
    summary: 'Endpoint para obtener todos las Respuestas de una pregunta',
    description: 'Permite obtener una lista paginada de todos las Respuestas de una pregunta.'
  })
  @ApiOkResponse({ description: 'Lista paginada de Respuestas de una pregunta', type: ResponseResponsesDto, isArray: true })
  findByQuestionId(@Param('questionId', QuestionsExistsPipe) questionId: number) {
    return this.responsesService.findByQuestionId(questionId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Endpoint para obtener una Respuesta por ID',
    description: 'Permite obtener la información de una Respuesta existente utilizando su ID.'
  })
  @ApiOkResponse({ description: 'Respuesta obtenida exitosamente', type: ResponseResponsesDto })
  findOne(@Param('id', ResponsesExistsPipe) id: string) {
    return this.responsesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Endpoint para actualizar una Respuesta por ID',
    description: 'Permite actualizar la información de una Respuesta existente utilizando su ID.'
  })
  @ApiOkResponse({ description: 'Respuesta actualizada exitosamente', type: GenericResponsesDto })
  update(@Param('id', ResponsesExistsPipe) id: string, @Body() updateResponseDto: UpdateResponseDto) {
    return this.responsesService.update(+id, updateResponseDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Endpoint para eliminar una Respuesta por ID',
    description: 'Permite eliminar la información de una Respuesta existente utilizando su ID.'
  })
  @ApiOkResponse({ description: 'Respuesta eliminada exitosamente', type: GenericResponsesDto })
  remove(@Param('id', ResponsesExistsPipe) id: string) {
    return this.responsesService.remove(+id);
  }
}
