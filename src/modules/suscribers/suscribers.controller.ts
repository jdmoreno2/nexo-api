import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SuscribersService } from './suscribers.service';
import { CreateSuscriberDto } from './dto/request/create-suscriber.dto';
import { UpdateSuscriberDto } from './dto/request/update-suscriber.dto';

@Controller('suscribers')
export class SuscribersController {
  constructor(private readonly suscribersService: SuscribersService) { }

  @Post()
  create(@Body() createSuscriberDto: CreateSuscriberDto) {
    return this.suscribersService.create(createSuscriberDto);
  }

  @Get()
  findAll() {
    return this.suscribersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suscribersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSuscriberDto: UpdateSuscriberDto) {
    return this.suscribersService.update(+id, updateSuscriberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suscribersService.remove(+id);
  }
}
