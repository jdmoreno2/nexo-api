import { Injectable } from '@nestjs/common';
import { CreateIdentificationTypeDto } from './dto/request/create-identification_type.dto';
import { UpdateIdentificationTypeDto } from './dto/request/update-identification_type.dto';

@Injectable()
export class IdentificationTypeService {
  create(createIdentificationTypeDto: CreateIdentificationTypeDto) {
    return 'This action adds a new identificationType';
  }

  findAll() {
    return `This action returns all identificationType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} identificationType`;
  }


  findOneByName(name: string) {
    return `This action returns a #${name} identificationType`;
  }

  update(id: number, updateIdentificationTypeDto: UpdateIdentificationTypeDto) {
    return `This action updates a #${id} identificationType`;
  }

  remove(id: number) {
    return `This action removes a #${id} identificationType`;
  }
}
