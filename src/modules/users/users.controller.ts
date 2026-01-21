import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UploadedFile, ParseFilePipeBuilder, HttpStatus, ValidationPipe, Req, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { PaginationRequestMetaDto } from 'src/common/dto/pagination-response.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilePipe } from 'src/common/decorators/file-pipe';
import { UserExistsPipe } from './decorators/user.validator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateUserDto })
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
  ) {
    return this.usersService.create(createUserDto, file);
  }

  @Get()
  async findAll(@Query() meta: PaginationRequestMetaDto) {
    return await this.usersService.findAll(meta);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateUserDto })
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
    @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
