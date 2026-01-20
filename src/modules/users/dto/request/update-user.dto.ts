import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @ApiProperty({
        description: 'Id del usuario',
        example: 1
    })
    @IsNumber({}, { message: 'Formato de datos invalido: id debe ser un número entero.' })
    id?: number;

    @ApiProperty({
        description: 'Estado del usuario',
        example: 1
    })
    @IsOptional()
    @IsNumber({}, { message: 'Formato de datos invalido: id debe ser un número entero.' })
    status?: number

}
