import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IdentificationTypeService } from './identification_type.service';
import { CreateIdentificationTypeDto } from './dto/create-identification_type.dto';
import { UpdateIdentificationTypeDto } from './dto/update-identification_type.dto';

@Controller('identification-type')
export class IdentificationTypeController {
  constructor(private readonly identificationTypeService: IdentificationTypeService) {}

  @Post()
  create(@Body() createIdentificationTypeDto: CreateIdentificationTypeDto) {
    return this.identificationTypeService.create(createIdentificationTypeDto);
  }

  @Get()
  findAll() {
    return this.identificationTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.identificationTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIdentificationTypeDto: UpdateIdentificationTypeDto) {
    return this.identificationTypeService.update(+id, updateIdentificationTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.identificationTypeService.remove(+id);
  }
}
