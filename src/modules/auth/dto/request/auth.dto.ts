import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthDto {
    @ApiProperty({
        description: 'Correo electrónico del usuario',
        example: 'test@test.com',
    })
    @IsNotEmpty({ message: 'Faltan campos necesarios: correo electrónico' })
    @IsEmail({}, { message: 'El correo electrónico no es válido' })
    email: string;

    @ApiProperty({
        description: 'Contraseña del usuario',
        example: 'testpassword',
    })
    @IsNotEmpty({ message: 'Faltan campos necesarios: password' })
    password: string;
}
