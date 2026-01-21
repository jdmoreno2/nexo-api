import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UploadedFile, ParseFilePipeBuilder, HttpStatus, ValidationPipe, Req, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { PaginationDto, PaginationRequestMetaDto } from 'src/common/dto/pagination-response.dto';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilePipe } from 'src/common/decorators/file-pipe';
import { UserExistsPipe } from './decorators/user.validator';
import { User } from './entities/user.entity';
import { GenericResponsesDto } from 'src/common/dto/generic-response.dto';

@Controller('users')
@ApiTags('Users')
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
    description: 'Sin permisos para crear usuarios',
  }
)
@ApiResponse(
  {
    status: 404,
    description: 'Usuario no encontrado',
  }
)

export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiOperation({ summary: 'Crear usuario' })
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({ description: 'Usuario creado exitosamente.', type: GenericResponsesDto })
  @UseInterceptors(FileInterceptor('avatar'))
  create(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: '.(jpeg|jpg|png)', // Para imagenes
        })
        .addMaxSizeValidator({
          maxSize: 2 * 1024 * 1024, // 2 MB
        })
        .build({
          fileIsRequired: false,
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
      FilePipe
    )
    file: string,
    @Body() createUserDto: CreateUserDto,
  ): Promise<GenericResponsesDto> {
    return this.usersService.create(createUserDto, file);
  }

  @ApiOperation({ summary: 'Listar todos los usuarios' })
  @Get()
  @ApiOkResponse({ description: 'Usuarios listados correctamente', type: PaginationDto<User> })
  async findAll(@Query() meta: PaginationRequestMetaDto) {
    return await this.usersService.findAll(meta);
  }

  @ApiOperation({ summary: 'Listar usuario por id' })
  @Get(':id')
  @ApiOkResponse({ description: 'Usuario consultado correctamente', type: PaginationDto<User> })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Actualizar usuario por id' })
  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({ description: 'Usuario actualizado exitosamente.', type: GenericResponsesDto })
  @UseInterceptors(FileInterceptor('avatar'))
  update(
    @Param('id', UserExistsPipe) id: string,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: '.(jpeg|jpg|png)', // Para imagenes
        })
        .addMaxSizeValidator({
          maxSize: 2 * 1024 * 1024, // 2 MB
        })
        .build({
          fileIsRequired: false,
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
      FilePipe
    )
    file: string,
    @Body() updateUserDto: UpdateUserDto): Promise<GenericResponsesDto> {
    return this.usersService.update(+id, updateUserDto, file);
  }

  @ApiOperation({ summary: 'Eliminar usuario por id' })
  @Delete(':id')
  @ApiOkResponse({ description: 'Usuario eliminado exitosamente.', type: GenericResponsesDto })
  remove(@Param('id', UserExistsPipe) id: string): Promise<GenericResponsesDto> {
    return this.usersService.remove(+id);
  }
}
