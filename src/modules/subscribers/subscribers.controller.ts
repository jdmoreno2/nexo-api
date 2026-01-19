import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/request/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/request/update-subscriber.dto';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SubscriberExistsPipe } from './decorators/subscriber.validator';
import { GenericResponsesDto } from 'src/common/dto/generic-response.dto';
import { PaginationDto, PaginationRequestMetaDto } from 'src/common/dto/pagination-response.dto';
import { ResponseSubscriberDto } from './dto/responses/response-subscriber.dto';

@Controller('suscribers')
@ApiTags('Suscriptores')
@ApiResponse({
  status: 200,
  description: 'Operacion Correcta',
})
@ApiResponse({
  status: 400,
  description: 'Datos de entrada inválidos',
})
@ApiResponse({
  status: 401,
  description: 'No autenticado',
})
@ApiResponse({
  status: 403,
  description: 'Sin permisos para crear usuarios',
})
@ApiResponse({
  status: 404,
  description: 'Suscriptor no encontrado'
})
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) { }

  @Post()
  @ApiOperation({ summary: 'Endpoint para registrar un suscriptor' })
  @ApiOkResponse({ description: 'Suscriptor registrado exitosamente', type: GenericResponsesDto })
  create(@Body() createSubscriberDto: CreateSubscriberDto): Promise<GenericResponsesDto> {
    return this.subscribersService.create(createSubscriberDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Endpoint para obtener todos los suscriptores',
    description: 'Permite obtener una lista paginada de todos los suscriptores registrados en el sistema.'
  })
  @ApiOkResponse({ description: 'Lista paginada de suscriptores', type: PaginationDto<ResponseSubscriberDto> })
  findAll(@Query() meta: PaginationRequestMetaDto): Promise<PaginationDto<ResponseSubscriberDto>> {
    return this.subscribersService.findAll(meta);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Endpoint para obtener un suscriptor por ID' })
  @ApiOkResponse({ description: 'Detalles del suscriptor', type: ResponseSubscriberDto })
  findOne(@Param('id', SubscriberExistsPipe) id: string) {
    return this.subscribersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Endpoint para actualizar un suscriptor por ID',
    description: 'Permite actualizar la información de un suscriptor existente utilizando su ID.'
  })
  @ApiOkResponse({ description: 'Suscriptor actualizado exitosamente', type: GenericResponsesDto })
  update(
    @Param('id', SubscriberExistsPipe) id: string,
    @Body(new ValidationPipe({ whitelist: false })) updateSubscriberDto: UpdateSubscriberDto
  ): Promise<GenericResponsesDto> {
    return this.subscribersService.update(+id, updateSubscriberDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Endpoint para eliminar un suscriptor por ID',
    description: 'Permite eliminar un suscriptor existente utilizando su ID.'
  })
  @ApiOkResponse({ description: 'Suscriptor eliminado exitosamente', type: GenericResponsesDto })
  remove(@Param('id', SubscriberExistsPipe) id: string): Promise<GenericResponsesDto> {
    return this.subscribersService.remove(+id);
  }
}
