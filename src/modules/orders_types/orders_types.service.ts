import { Injectable } from '@nestjs/common';
import { CreateOrdersTypeDto } from './dto/request/create-orders_type.dto';
import { UpdateOrdersTypeDto } from './dto/request/update-orders_type.dto';

@Injectable()
export class OrdersTypesService {
  create(createOrdersTypeDto: CreateOrdersTypeDto) {
    return 'This action adds a new ordersType';
  }

  findAll() {
    return `This action returns all ordersTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ordersType`;
  }

  findOneByName(name: string) {
    return `This action returns a #${name} ordersType`;
  }

  update(id: number, updateOrdersTypeDto: UpdateOrdersTypeDto) {
    return `This action updates a #${id} ordersType`;
  }

  remove(id: number) {
    return `This action removes a #${id} ordersType`;
  }
}
