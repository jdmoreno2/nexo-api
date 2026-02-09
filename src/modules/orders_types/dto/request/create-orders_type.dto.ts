import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString, Validate } from "class-validator"


export class CreateOrdersTypeDto {
  @ApiProperty({
    description: 'Nombre del tipo de orden',
    example: 'Orden de servicio'
  })
  @IsString
    ({ message: 'Debe ser ingresado un texto' })
  @IsNotEmpty({ message: 'El nombre del tipo de orden es obligatorio' })
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
