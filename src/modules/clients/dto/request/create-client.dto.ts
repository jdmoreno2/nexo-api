import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString, Validate } from "class-validator";
import { SubscriberExistsConstraint } from "src/modules/subscribers/decorators/subscriber.validator";
import { ClientAlreadyExistsConstraint } from "../../decorators/clients.validator";

export class CreateClientDto {
  @ApiProperty({
    description: 'Nombre del cliente',
    example: 'NatuChips'
  })
  @IsString({ message: 'Formato de Datos invalido: name debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'Faltan datos necesario: name.' })
  name: string;

  @ApiProperty({
    description: 'Nit del cliente',
    example: '1000001-8'
  })
  @IsString({ message: 'Formato de Datos invalido: nit debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'Faltan datos necesario: nit.' })
  @Validate(ClientAlreadyExistsConstraint)
  nit: string;

  @ApiPropertyOptional({
    description: 'Direccion del cliente',
    example: 'Cl 1 No 1 - 01'
  })
  @IsOptional()
  @IsString({ message: 'Formato de Datos invalido: direccion debe ser una cadena de texto.' })
  address?: string;

  @ApiPropertyOptional({
    description: 'Telefono del cliente',
    example: '6021112222'
  })
  @IsOptional()
  @IsString({ message: 'Formato de Datos invalido: phone debe ser una cadena de texto.' })
  phone?: string;

  @ApiProperty({
    description: 'ID del suscriptor al que pertenece el cliente',
    example: 1
  })
  @IsNotEmpty({ message: 'Faltan datos necesario: subscribers_id.' })
  @IsInt({ message: 'Formato de Datos invalido: subscribers_id debe ser un numero entero.' })
  @Validate(SubscriberExistsConstraint)
  subscribers_id: number;
}
