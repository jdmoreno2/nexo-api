import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString, Validate } from "class-validator";
import { ClientExistsConstraint } from "src/modules/clients/decorators/clients.validator";
import { BranchAlreadyExistsConstraint } from "../../decorators/branches.validator";

export class CreateBranchDto {
  @ApiProperty({
    description: 'Nombre de la sucursal',
    example: 'NatuChips'
  })
  @IsString({ message: 'Formato de Datos invalido: name debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'Faltan datos necesario: name.' })
  @Validate(BranchAlreadyExistsConstraint)
  name: string;

  @ApiPropertyOptional({
    description: 'Direccion de la sucursal',
    example: 'Cl 1 No 1 - 01'
  })
  @IsOptional()
  @IsString({ message: 'Formato de Datos invalido: direccion debe ser una cadena de texto.' })
  address?: string;

  @ApiPropertyOptional({
    description: 'Telefono de la sucursal',
    example: '6021112222'
  })
  @IsOptional()
  @IsString({ message: 'Formato de Datos invalido: phone debe ser una cadena de texto.' })
  phone?: string;

  @ApiProperty({
    description: 'ID del cliente al que pertenece la sucursal',
    example: 1
  })
  @IsNotEmpty({ message: 'Faltan datos necesario: clients_id.' })
  @IsInt({ message: 'Formato de Datos invalido: clients_id debe ser un numero entero.' })
  @Validate(ClientExistsConstraint)
  clients_id: number;
}
