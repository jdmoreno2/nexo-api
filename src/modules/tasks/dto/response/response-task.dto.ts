import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class ResponseTaskDto {
  @ApiProperty({ description: 'ID', example: 1 })
  id: number

  @ApiProperty({ description: 'Descripción', example: 'Averiaen el equipo' })
  description?: string

  @ApiPropertyOptional({ description: 'Fecha de Inicio', example: '2026-01-05' })
  start_date?: string

  @ApiPropertyOptional({ description: 'Fecha de Cierre', example: '2026-01-06' })
  end_date?: string

  @ApiProperty({ description: 'Estado', example: 1 })
  status: number

  @ApiProperty({
    description: 'ID de la orden de servicio',
    example: 1
  })
  orders_id: number;

  @ApiPropertyOptional({
    description: 'ID del equipo',
    example: 1
  })
  equipments_id?: number;

  @ApiProperty({
    description: 'ID del usuario',
    example: 1
  })
  users_id: number;

}