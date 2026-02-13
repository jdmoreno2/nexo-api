import { Controller, Get, Post, Body, Query, Patch, Param } from '@nestjs/common';
import { TasksFormsService } from './tasks-forms.service';
import { CreateTasksFormDto } from './dto/request/create-tasks-form.dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GenericResponsesDto } from 'src/common/dto/generic-response.dto';
import { PaginationDto } from 'src/common/dto/pagination-response.dto';
import { ResponseFormsTasksListDto } from './dto/response/response-task-form-list.dto';
import { TasksExistsPipe } from '../tasks/decorators/task.validator';

@ApiTags('Tasks Forms')
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
    description: 'Formulario de Tarea no encontrado',
  }
)
@ApiBearerAuth()
@Controller('tasks-forms')
export class TasksFormsController {
  constructor(private readonly tasksFormsService: TasksFormsService) { }

  @Post()
  @ApiOperation({ summary: 'Crear Formulario de la Tarea', description: 'Crea un nuevo Formulario de la Tarea en el sistema.' })
  @ApiOkResponse({ description: 'Formulario de la Tarea creado exitosamente.', type: GenericResponsesDto })
  create(@Body() createTasksFormDto: CreateTasksFormDto) {
    return this.tasksFormsService.create(createTasksFormDto);
  }

  @Get(":tasks_id")
  @ApiOperation({
    summary: 'Endpoint para obtener todos los Formulario de la Tareas¿',
    description: 'Permite obtener una lista paginada de todos las Formulario de la Tarea registrados en el sistema.'
  })
  @ApiOkResponse({ description: 'Lista paginada de Formulario de la Tareas', type: PaginationDto<ResponseFormsTasksListDto> })
  findAll(@Param("tasks_id", TasksExistsPipe) tasks_id: string) {
    return this.tasksFormsService.findAll(+tasks_id);
  }
}
