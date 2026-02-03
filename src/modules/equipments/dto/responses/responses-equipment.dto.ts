import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateEquipmentDto {
  @ApiProperty({ description: 'ID del equipo', example: 1 })
  id: number

  @ApiProperty({
    description: 'Nombre del equipo',
    example: 'X8'
  })
  name: string;

  @ApiPropertyOptional({
    description: 'Descripción del equipo',
    example: 'Automovil'
  })
  description?: string;

  @ApiProperty({
    description: 'Serial del equipo',
    example: 'X505'
  })
  serial: string;

  @ApiProperty({
    description: 'Marca del equipo',
    example: 'Audi'
  })
  brand: string;

  @ApiPropertyOptional({
    description: 'Modelo del equipo',
    example: 'MK15'
  })
  model?: string;

  @ApiProperty({ description: 'Estado del equipo', example: 1, required: false })
  status: number
}