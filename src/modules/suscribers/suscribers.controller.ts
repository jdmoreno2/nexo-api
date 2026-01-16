import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe, UseInterceptors } from '@nestjs/common';
import { SuscribersService } from './suscribers.service';
import { CreateSuscriberDto } from './dto/request/create-suscriber.dto';
import { UpdateSuscriberDto } from './dto/request/update-suscriber.dto';
import { ApiBody, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuscriberExistsPipe } from './decorators/suscriber.validator';
import { GenericResponseDto } from 'src/common/dto/generic-response.dto';
import { PaginationDto, PaginationRequestMetaDto } from 'src/common/dto/pagination-response.dto';
import { ResponseSuscriberDto } from './dto/responses/response-suscriber.dto';

@Controller('suscribers')
@ApiTags('Suscriptores')
@ApiResponse({
  status: 200,
  description: 'Operacion Correcta',
})
@ApiResponse({
  status: 400,
  description: 'Datos de entrada inválidos',
})
@ApiResponse({
  status: 401,
  description: 'No autenticado',
})
@ApiResponse({
  status: 403,
  description: 'Sin permisos para crear usuarios',
})
@ApiResponse({
  status: 404,
  description: 'Suscriptor no encontrado'
})
export class SuscribersController {
  constructor(private readonly suscribersService: SuscribersService) { }

  @Post()
  @ApiOperation({ summary: 'Endpoint para registrar un suscriptor' })
  @ApiOkResponse({ description: 'Suscriptor registrado exitosamente', type: GenericResponseDto })
  create(@Body() createSuscriberDto: CreateSuscriberDto): Promise<GenericResponseDto> {
    return this.suscribersService.create(createSuscriberDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Endpoint para obtener todos los suscriptores',
    description: 'Permite obtener una lista paginada de todos los suscriptores registrados en el sistema.'
  })
  @ApiOkResponse({ description: 'Lista paginada de suscriptores', type: PaginationDto<ResponseSuscriberDto> })
  findAll(@Query() meta: PaginationRequestMetaDto): Promise<PaginationDto<ResponseSuscriberDto>> {
    return this.suscribersService.findAll(meta);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Endpoint para obtener un suscriptor por ID' })
  @ApiOkResponse({ description: 'Detalles del suscriptor', type: ResponseSuscriberDto })
  findOne(@Param('id', SuscriberExistsPipe) id: string) {
    return this.suscribersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Endpoint para actualizar un suscriptor por ID',
    description: 'Permite actualizar la información de un suscriptor existente utilizando su ID.'
  })
  @ApiOkResponse({ description: 'Suscriptor actualizado exitosamente', type: GenericResponseDto })
  update(
    @Param('id', SuscriberExistsPipe) id: string,
    @Body(new ValidationPipe({ whitelist: false })) updateSuscriberDto: UpdateSuscriberDto
  ): Promise<GenericResponseDto> {
    return this.suscribersService.update(+id, updateSuscriberDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Endpoint para eliminar un suscriptor por ID',
    description: 'Permite eliminar un suscriptor existente utilizando su ID.'
  })
  @ApiOkResponse({ description: 'Suscriptor eliminado exitosamente', type: GenericResponseDto })
  remove(@Param('id', SuscriberExistsPipe) id: string): Promise<GenericResponseDto> {
    return this.suscribersService.remove(+id);
  }
}
