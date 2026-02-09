import { ApiProperty } from "@nestjs/swagger"

export class ResponseOrdersDto {
  @ApiProperty({ description: 'ID del tipo de orden', example: 1 })
  id: number

  @ApiProperty({ description: 'Sucursal', example: 'Las Americas' })
  branch?: string

  @ApiProperty({ description: 'Tipo de orden', example: 'Orden de servicio' })
  orders_type?: string

  @ApiProperty({ description: 'Estado del tipo de orden', example: 1 })
  status: number

  @ApiProperty({ description: 'Fecha de Creacion', example: 1 })
  created_at: Date

  @ApiProperty({
    description: 'ID de la sucursal',
    example: 1
  })
  branches_id: number;

  @ApiProperty({
    description: 'ID del tipo de orden',
    example: 1
  })
  orders_types_id: number;
}