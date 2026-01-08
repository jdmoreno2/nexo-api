import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSuscriberDto {
  @ApiProperty({
    description: 'Nombre de la compañia',
    example: 'Test'
  })
  @IsString({ message: 'Formato de Datos invalido: company_name debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'Faltan datos necesario: company_name.' })
  company_name: string;

  @ApiProperty({
    description: 'nit de la compañia',
    example: '12345678'
  })
  @IsString({ message: 'Formato de Datos invalido: nit debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'Faltan datos necesario: nit.' })
  nit: string;

  @ApiProperty({
    description: 'Nombre de la compañia',
    example: 'Test'
  })
  @IsEmail({}, { message: 'Formato de Datos invalido: email debe ser una direccion de correo valida.' })
  @IsNotEmpty({ message: 'Faltan datos necesario: email.' })
  email: string;

  @ApiPropertyOptional({
    description: 'Direccion de la compañia',
    example: 'Kr 1 No 1 - 1'
  })
  @IsOptional()
  @IsString({ message: 'Formato de Datos invalido: address debe ser una cadena de texto.' })
  address?: string;

  @ApiPropertyOptional({
    description: 'Telefono de la compañia',
    example: '6021235545'
  })
  @IsOptional()
  @IsString({ message: 'Formato de Datos invalido: phone debe ser una cadena de texto.' })
  phone?: string;
}
