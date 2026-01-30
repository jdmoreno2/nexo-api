import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNumber, IsNumberString, IsOptional, Validate } from 'class-validator';
import { emailExistsConstraint, UserAlreadyExistsConstraint } from '../../decorators/user.validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @ApiProperty({
        description: 'Número de identificación del usuario',
        example: 12345678
    })
    @IsNumberString({}, { message: 'Formato de datos invalido: identification debe ser un número entero.' })
    @Validate(UserAlreadyExistsConstraint, [{ isUpdate: true }])
    identifier: number


    @ApiPropertyOptional({
        description: 'Estado del usuario',
        example: 1
    })
    @IsOptional()
    @IsNumberString({}, { message: 'Formato de datos invalido: status debe ser un número entero.' })
    status?: number

    @ApiProperty({
        description: 'Correo electrónico del usuario',
        example: 'correo@email.com'
    })
    @IsEmail({}, { message: 'Formato de datos invalido: email debe ser una direccion de correo valida.' })
    @Validate(emailExistsConstraint, [{ isUpdate: true }])
    email: string;

}
