import { Injectable } from '@nestjs/common';
import { CreateFormDto } from './dto/request/create-form.dto';
import { UpdateFormDto } from './dto/request/update-form.dto';

@Injectable()
export class FormsService {
  create(createFormDto: CreateFormDto) {
    return 'This action adds a new form';
  }

  findAll() {
    return `This action returns all forms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} form`;
  }

  findOneByName(name: string) {
    return `This action returns a #${name} form`;
  }

  update(id: number, updateFormDto: UpdateFormDto) {
    return `This action updates a #${id} form`;
  }

  remove(id: number) {
    return `This action removes a #${id} form`;
  }
}
