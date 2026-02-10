import { Injectable } from '@nestjs/common';
import { CreateQuestionsTypeDto } from './dto/request/create-questions_type.dto';
import { UpdateQuestionsTypeDto } from './dto/request/update-questions_type.dto';

@Injectable()
export class QuestionsTypesService {
  create(createQuestionsTypeDto: CreateQuestionsTypeDto) {
    return 'This action adds a new questionsType';
  }

  findAll() {
    return `This action returns all questionsTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} questionsType`;
  }

  findOneByName(name: string) {
    return `This action returns a #${name} questionsType`;
  }

  update(id: number, updateQuestionsTypeDto: UpdateQuestionsTypeDto) {
    return `This action updates a #${id} questionsType`;
  }

  remove(id: number) {
    return `This action removes a #${id} questionsType`;
  }
}
