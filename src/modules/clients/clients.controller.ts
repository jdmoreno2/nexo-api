import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/request/create-client.dto';
import { UpdateClientDto } from './dto/request/update-client.dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GenericResponsesDto } from 'src/common/dto/generic-response.dto';
import { PaginationDto, PaginationRequestMetaDto } from 'src/common/dto/pagination-response.dto';
import { ResponseClientDto } from './dto/response/response-client.dto';
import { ClientExistsPipe } from './decorators/clients.validator';

@ApiBearerAuth()
@ApiTags('Clients')
@ApiResponse(
  {
    status: 401,
    description: 'No autenticado',
  }
)
@ApiResponse(
  {
    status: 400,
    description: 'Datos de entrada inválidos',
  }
)
@ApiResponse(
  {
    status: 403,
    description: 'Sin permisos para realizar esta accion',
  }
)
@ApiResponse(
  {
    status: 404,
    description: 'Cliente no encontrado',
  }
)
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) { }

  @Post()
  @ApiOperation({
    summary: 'Crear Cliente',
    description: 'Crea un nuevo cliente en el sistema.'
  })
  @ApiOkResponse({ description: 'Cliente creado exitosamente.', type: GenericResponsesDto })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Endpoint para obtener todos los clientes',
    description: 'Permite obtener una lista paginada de todos los clientes registrados en el sistema.'
  })
  @ApiOkResponse({
    description: 'Lista paginada de clientes',
    type: PaginationDto<ResponseClientDto>
  })
  findAll(@Query() meta: PaginationRequestMetaDto) {
    return this.clientsService.findAll(meta);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Endpoint para obtener un cliente por ID',
    description: 'Permite obtener la información de un cliente existente utilizando su ID.'
  })
  @ApiOkResponse({ description: 'Cliente obtenido exitosamente', type: ResponseClientDto })
  findOne(@Param('id', ClientExistsPipe) id: string) {
    return this.clientsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Endpoint para actualizar un cliente por ID',
    description: 'Permite actualizar la información de un cliente existente utilizando su ID.'
  })
  @ApiOkResponse({ description: 'Cliente actualizado exitosamente', type: GenericResponsesDto })
  update(@Param('id', ClientExistsPipe) id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(+id, updateClientDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Endpoint para eliminar un cliente por ID',
    description: 'Permite eliminar (Inactivar o softDelete) un cliente existente utilizando su ID.'
  })
  @ApiOkResponse({ description: 'Cliente eliminado exitosamente', type: GenericResponsesDto })
  remove(@Param('id', ClientExistsPipe) id: string) {
    return this.clientsService.remove(+id);
  }
}
