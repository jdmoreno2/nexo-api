import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/request/create-order.dto';
import { UpdateOrderDto } from './dto/request/update-order.dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GenericResponsesDto } from 'src/common/dto/generic-response.dto';
import { PaginationDto, PaginationRequestMetaDto } from 'src/common/dto/pagination-response.dto';
import { ResponseOrdersDto } from './dto/response/response-orders.dto';
import { OrdersExistsPipe } from './decorators/orders.validator';

@ApiBearerAuth()
@ApiTags('Orders')
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
    description: 'Sin permisos para realizar esta acción',
  }
)
@ApiResponse(
  {
    status: 404,
    description: 'Orden no encontrada',
  }
)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  @ApiOperation({ summary: 'Crear Orden', description: 'Crea una nueva orden en el sistema.' })
  @ApiOkResponse({ description: 'Orden creada exitosamente.', type: GenericResponsesDto })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Endpoint para obtener todos los Equipos',
    description: 'Permite obtener una lista paginada de todos las Ordenes registradas en el sistema.'
  })
  @ApiOkResponse({ description: 'Lista paginada de Ordenes', type: PaginationDto<ResponseOrdersDto> })
  findAll(@Query() meta: PaginationRequestMetaDto) {
    return this.ordersService.findAll(meta);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Endpoint para obtener una orden por ID',
    description: 'Permite obtener la información de una orden existente utilizando su ID.'
  })
  @ApiOkResponse({ description: 'Orden obtenida exitosamente', type: ResponseOrdersDto })
  findOne(@Param('id', OrdersExistsPipe) id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Endpoint para actualizar una orden por ID',
    description: 'Permite actualizar la información de una orden existente utilizando su ID.'
  })
  @ApiOkResponse({ description: 'Orden actualizada exitosamente', type: GenericResponsesDto })
  update(@Param('id', OrdersExistsPipe) id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Endpoint para eliminar una orden por ID',
    description: 'Permite eliminar la información de una orden existente utilizando su ID.'
  })
  @ApiOkResponse({ description: 'Orden eliminado exitosamente', type: GenericResponsesDto })
  remove(@Param('id', OrdersExistsPipe) id: string) {
    return this.ordersService.remove(+id);
  }
}
