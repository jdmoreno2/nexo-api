import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/request/create-task.dto';
import { UpdateTaskDto } from './dto/request/update-task.dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GenericResponsesDto } from 'src/common/dto/generic-response.dto';
import { PaginationDto, PaginationRequestMetaDto } from 'src/common/dto/pagination-response.dto';
import { ResponseTaskListDto } from './dto/response/response-task-list.dto';
import { ResponseTaskDto } from './dto/response/response-task.dto';
import { TasksExistsPipe } from './decorators/task.validator';

@ApiTags('Tasks')
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
    description: 'Tarea no encontrada',
  }
)
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  @ApiOperation({ summary: 'Crear Tarea', description: 'Crea una nueva Tarea en el sistema.' })
  @ApiOkResponse({ description: 'Tarea creada exitosamente.', type: GenericResponsesDto })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Endpoint para obtener todos las Tareas',
    description: 'Permite obtener una lista paginada de todos las Tareas registrados en el sistema.'
  })
  @ApiOkResponse({ description: 'Lista paginada de Tareas', type: PaginationDto<ResponseTaskListDto> })
  findAll(@Query() meta: PaginationRequestMetaDto) {
    return this.tasksService.findAll(meta);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Endpoint para obtener una Tarea por ID',
    description: 'Permite obtener la información de una Tarea existente utilizando su ID.'
  })
  @ApiOkResponse({ description: 'Tarea obtenida exitosamente', type: ResponseTaskDto })
  findOne(@Param('id', TasksExistsPipe) id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Endpoint para actualizar una Tarea por ID',
    description: 'Permite actualizar la información de una Tarea existente utilizando su ID.'
  })
  @ApiOkResponse({ description: 'Tarea actualizada exitosamente', type: GenericResponsesDto })
  update(@Param('id', TasksExistsPipe) id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Endpoint para eliminar una Tarea por ID',
    description: 'Permite eliminar la información de una Tarea existente utilizando su ID.'
  })
  @ApiOkResponse({ description: 'Tarea eliminada exitosamente', type: GenericResponsesDto })
  remove(@Param('id', TasksExistsPipe) id: string) {
    return this.tasksService.remove(+id);
  }
}
