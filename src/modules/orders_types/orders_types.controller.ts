import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrdersTypesService } from './orders_types.service';
import { CreateOrdersTypeDto } from './dto/request/create-orders_type.dto';
import { UpdateOrdersTypeDto } from './dto/request/update-orders_type.dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GenericResponsesDto } from 'src/common/dto/generic-response.dto';
import { PaginationDto, PaginationRequestMetaDto } from 'src/common/dto/pagination-response.dto';
import { ResponseOrdersTypesDto } from './dto/response/response-orders-types.dto';
import { OrdersTypesExistsPipe } from './decorators/orders-types.validator';

@ApiTags('Orders Types')
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
    description: 'Tipo de orden no encontrado',
  }
)
@ApiBearerAuth()
@Controller('orders-types')
export class OrdersTypesController {
  constructor(private readonly ordersTypesService: OrdersTypesService) { }

  @Post()
  @ApiOperation({ summary: 'Crear tipo de orden', description: 'Crea un nuevo tipo de orden en el sistema.' })
  @ApiOkResponse({ description: 'Tipo de orden creado exitosamente.', type: GenericResponsesDto })
  create(@Body() createOrdersTypeDto: CreateOrdersTypeDto) {
    return this.ordersTypesService.create(createOrdersTypeDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Endpoint para obtener todos los tipos de ordenes',
    description: 'Permite obtener una lista paginada de todos los tipos de ordenes registrados en el sistema.'
  })
  @ApiOkResponse({ description: 'Lista paginada de tipos de ordenes', type: PaginationDto<ResponseOrdersTypesDto> })
  findAll(@Query() meta: PaginationRequestMetaDto) {
    return this.ordersTypesService.findAll(meta);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Endpoint para obtener un tipo de orden por ID',
    description: 'Permite obtener la información de un tipo de orden existente utilizando su ID.'
  })
  @ApiOkResponse({ description: 'Tipo de orden obtenido exitosamente', type: ResponseOrdersTypesDto })
  findOne(@Param('id', OrdersTypesExistsPipe) id: string) {
    return this.ordersTypesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Endpoint para actualizar un tipo de orden por ID',
    description: 'Permite actualizar la información de un tipo de orden existente utilizando su ID.'
  })
  @ApiOkResponse({ description: 'Tipo de orden actualizado exitosamente', type: GenericResponsesDto })
  update(@Param('id', OrdersTypesExistsPipe) id: string, @Body() updateOrdersTypeDto: UpdateOrdersTypeDto) {
    return this.ordersTypesService.update(+id, updateOrdersTypeDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Endpoint para eliminar un tipo de orden por ID',
    description: 'Permite eliminar la información de un tipo de orden existente utilizando su ID.'
  })
  @ApiOkResponse({ description: 'Tipo de orden eliminado exitosamente', type: GenericResponsesDto })
  remove(@Param('id', OrdersTypesExistsPipe) id: string) {
    return this.ordersTypesService.remove(+id);
  }
}
