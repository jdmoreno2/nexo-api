import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString, Validate } from "class-validator";
import { FormAlreadyExistsConstraint } from "../../decorators/forms.validator";
import { SubscriberExistsConstraint } from "src/modules/subscribers/decorators/subscriber.validator";

export class CreateFormDto {
  @ApiProperty({
    description: 'Nombre',
    example: 'Mantenimiento'
  })
  @IsString({ message: 'Debe ser ingresado un texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @Validate(FormAlreadyExistsConstraint)
  name: string

  @ApiPropertyOptional({
    description: 'Descripción',
    example: 'Para ordenes de Servicio de mantenimiento', required: false
  })
  @IsOptional()
  @IsString({ message: 'Debe ser ingresado un texto' })
  description?: string

  @ApiProperty({
    description: 'ID del suscriptor',
    example: 1
  })
  @IsNotEmpty({ message: 'Faltan datos necesario: subscribers_id.' })
  @IsInt({ message: 'Formato de Datos invalido: subscribers_id debe ser un numero entero.' })
  @Validate(SubscriberExistsConstraint)
  subscribers_id: number;
}
