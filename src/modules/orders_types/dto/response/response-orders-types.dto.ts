import { ApiProperty } from "@nestjs/swagger"

export class ResponseOrdersTypesDto {
  @ApiProperty({ description: 'ID del tipo de orden', example: 1 })
  id: number

  @ApiProperty({ description: 'Nombre del tipo de orden', example: 'Ordene de servicio' })
  name: string

  @ApiProperty({ description: 'Descripción del tipo de orden', example: 'Ordenes de servicio' })
  description?: string

  @ApiProperty({ description: 'Estado del tipo de orden', example: 1 })
  status: number

  @ApiProperty({
    description: 'ID del suscriptor al que pertenece el tipo de orden',
    example: 1
  })
  subscribers_id: number;
}