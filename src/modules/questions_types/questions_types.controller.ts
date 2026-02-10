import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionsTypesService } from './questions_types.service';
import { CreateQuestionsTypeDto } from './dto/request/create-questions_type.dto';
import { UpdateQuestionsTypeDto } from './dto/request/update-questions_type.dto';

@Controller('questions-types')
export class QuestionsTypesController {
  constructor(private readonly questionsTypesService: QuestionsTypesService) { }

  @Post()
  create(@Body() createQuestionsTypeDto: CreateQuestionsTypeDto) {
    return this.questionsTypesService.create(createQuestionsTypeDto);
  }

  @Get()
  findAll() {
    return this.questionsTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionsTypeDto: UpdateQuestionsTypeDto) {
    return this.questionsTypesService.update(+id, updateQuestionsTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsTypesService.remove(+id);
  }
}
