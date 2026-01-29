import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBase64, IsEmail, IsNumber, IsNumberString, IsOptional, IsString, Validate } from "class-validator";
import { SubscriberExistsConstraint } from "src/modules/subscribers/decorators/subscriber.validator";
import { emailExistsConstraint, UserAlreadyExistsConstraint } from "../../decorators/user.validator";

export class CreateUserDto {

    @ApiProperty({
        description: 'Número de identificación del usuario',
        example: 12345678
    })
    @IsNumberString({}, { message: 'Formato de datos invalido: identification debe ser un número entero.' })
    @Validate(UserAlreadyExistsConstraint)
    identifier: number

    @ApiProperty({
        description: 'Tipo de identificación del usuario',
        example: 'DNI'
    })
    @IsString({ message: 'Formato de datos invalido: id_type debe ser una cadena de texto.' })
    id_type: string;

    @ApiProperty({
        description: 'Nombre del usuario',
        example: 'Juan'
    })
    @IsString({ message: 'Formato de datos invalido: name debe ser una cadena de texto.' })
    name: string;

    @ApiProperty({
        description: 'Apellido del usuario',
        example: 'Morcillo'
    })
    @IsString({ message: 'Formato de datos invalido: lastname debe ser una cadena de texto.' })
    lastname: string;

    @ApiProperty({
        description: 'Correo electrónico del usuario',
        example: 'correo@email.com'
    })
    @IsEmail({}, { message: 'Formato de datos invalido: email debe ser una direccion de correo valida.' })
    @Validate(emailExistsConstraint)
    email: string;

    @ApiProperty({
        description: 'Contraseña del usuario',
        example: 'password'
    })
    @IsString({ message: 'Formato de datos invalido: password debe estar en base64' })
    password: string;

    @ApiPropertyOptional({
        description: 'Archivo de imagen',
        type: 'string',
        format: 'binary'
    })
    @IsOptional()
    avatar?: any;

    @ApiProperty({
        description: 'Id del suscriptor al que pertenece el usuario',
        example: 1
    })
    @IsNumberString({}, { message: 'Formato de Datos invalido: subscriber_id debe ser un numero.' })
    @Validate(SubscriberExistsConstraint)
    subscribers_id: number;

}
