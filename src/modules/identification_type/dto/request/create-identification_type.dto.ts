import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString, Validate } from "class-validator"
import { IdentificationTypeAlreadyExistsConstraint } from "../../decorators/identification-type.validator"

export class CreateIdentificationTypeDto {
  @ApiProperty({
    description: 'Nombre del tipo de identificacion',
    example: 'CC'
  })
  @IsString({ message: 'Debe ser ingresado un texto' })
  @IsNotEmpty({ message: 'El nombre del permiso es obligatorio' })
  @Validate(IdentificationTypeAlreadyExistsConstraint)
  name: string

  @ApiPropertyOptional({
    description: 'Descripción del tipo de identificacion',
    example: 'Numero de Cedula', required: false
  })
  @IsOptional()
  @IsString({ message: 'Debe ser ingresado un texto' })
  description?: string
}

