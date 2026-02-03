import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString, Validate } from "class-validator";
import { EquipmentAlreadyExistsConstraint } from "../../decorators/equipments.validator";
import { BranchExistsConstraint } from "src/modules/branches/decorators/branches.validator";

export class CreateEquipmentDto {
  @ApiPropertyOptional({
    description: 'Descripción del equipo',
    example: 'Automovil'
  })
  @IsOptional()
  @IsString({ message: 'Formato de Datos invalido: description debe ser una cadena de texto.' })
  description?: string;

  @ApiProperty({
    description: 'Serial del equipo',
    example: 'X505'
  })
  @IsString({ message: 'Formato de Datos invalido: serial debe ser una cadena de texto.' })
  @Validate(EquipmentAlreadyExistsConstraint)
  serial: string;

  @ApiProperty({
    description: 'Marca del equipo',
    example: 'Audi'
  })
  @IsString({ message: 'Formato de Datos invalido: marca debe ser una cadena de texto.' })
  brand: string;

  @ApiPropertyOptional({
    description: 'Modelo del equipo',
    example: 'MK15'
  })
  @IsOptional()
  @IsString({ message: 'Formato de Datos invalido: description debe ser una cadena de texto.' })
  model?: string;

  @ApiProperty({
    description: 'ID de la sucursal a la que pertenece el rol',
    example: 1
  })
  @IsNotEmpty({ message: 'Faltan datos necesario: branches_id.' })
  @IsInt({ message: 'Formato de Datos invalido: branches_id debe ser un numero entero.' })
  @Validate(BranchExistsConstraint)
  branches_id: number;
}
