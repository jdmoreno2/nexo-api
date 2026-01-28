import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsNumber, IsNumberString, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @ApiPropertyOptional({
        description: 'Estado del usuario',
        example: 1
    })
    @IsOptional()
    @IsNumberString({}, { message: 'Formato de datos invalido: status debe ser un número entero.' })
    status?: number

}
