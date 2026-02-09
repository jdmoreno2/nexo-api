import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsOptional, IsString, Validate } from "class-validator"
import { OrdersTypesAlreadyExistsConstraint } from "../../decorators/orders-types.validator"
import { SubscriberExistsConstraint } from "src/modules/subscribers/decorators/subscriber.validator"


export class CreateOrdersTypeDto {
  @ApiProperty({
    description: 'Nombre del tipo de orden',
    example: 'Orden de servicio'
  })
  @IsString
    ({ message: 'Debe ser ingresado un texto' })
  @IsNotEmpty({ message: 'El nombre del tipo de orden es obligatorio' })
  @Validate(OrdersTypesAlreadyExistsConstraint)
  name: string

  @ApiPropertyOptional({
    description: 'Descripción del tipo de identificacion',
    example: 'Para ordenes de Servicio', required: false
  })
  @IsOptional()
  @IsString({ message: 'Debe ser ingresado un texto' })
  description?: string

  @ApiProperty({
    description: 'ID del suscriptor al que pertenece el rol',
    example: 1
  })
  @IsNotEmpty({ message: 'Faltan datos necesario: subscribers_id.' })
  @IsInt({ message: 'Formato de Datos invalido: subscribers_id debe ser un numero entero.' })
  @Validate(SubscriberExistsConstraint)
  subscribers_id: number;
}
