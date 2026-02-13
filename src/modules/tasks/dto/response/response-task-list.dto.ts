import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

class EquipmentDto {
  @ApiProperty({ description: 'ID del equipo', example: 1 })
  id: number

  @ApiProperty({ description: 'Serial del equipo', example: 'X641A' })
  serial: string
}

class UserDto {
  @ApiProperty({ description: 'ID de la usuario', example: 1 })
  id: number

  @ApiProperty({ description: 'Nombre de la usuario', example: 'Juan' })
  name: string

  @ApiProperty({ description: 'Apellido de la usuario', example: 'Morales' })
  lastname: string
}

export class ResponseTaskListDto {
  @ApiProperty({ description: 'ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Descripción', example: 'Averia en el equipo' })
  description?: string;

  @ApiPropertyOptional({ description: 'Fecha de Inicio', example: '2026-01-05' })
  start_date?: Date;

  @ApiPropertyOptional({ description: 'Fecha de Cierre', example: '2026-01-06' })
  end_date?: Date;

  @ApiProperty({ description: 'Estado', example: 1 })
  status: number;

  @ApiPropertyOptional({ description: 'Equipo', type: [Object], nullable: true })
  equipment?: EquipmentDto;

  @ApiPropertyOptional({ description: 'Usuario', type: [Object], nullable: true })
  user?: UserDto;
}