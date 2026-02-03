import { Injectable } from '@nestjs/common';
import { CreateEquipmentDto } from './dto/request/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/request/update-equipment.dto';

@Injectable()
export class EquipmentsService {
  create(createEquipmentDto: CreateEquipmentDto) {
    return 'This action adds a new equipment';
  }

  findAll() {
    return `This action returns all equipments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equipment`;
  }


  findOneBySerial(serial: string) {
    return `This action returns a #${serial} equipment`;
  }

  update(id: number, updateEquipmentDto: UpdateEquipmentDto) {
    return `This action updates a #${id} equipment`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipment`;
  }
}
