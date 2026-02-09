import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersTypesService } from './orders_types.service';
import { CreateOrdersTypeDto } from './dto/request/create-orders_type.dto';
import { UpdateOrdersTypeDto } from './dto/request/update-orders_type.dto';

@Controller('orders-types')
export class OrdersTypesController {
  constructor(private readonly ordersTypesService: OrdersTypesService) { }

  @Post()
  create(@Body() createOrdersTypeDto: CreateOrdersTypeDto) {
    return this.ordersTypesService.create(createOrdersTypeDto);
  }

  @Get()
  findAll() {
    return this.ordersTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrdersTypeDto: UpdateOrdersTypeDto) {
    return this.ordersTypesService.update(+id, updateOrdersTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersTypesService.remove(+id);
  }
}
