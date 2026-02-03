import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ResponseEquipmentDto {
  @ApiProperty({ description: 'ID del equipo', example: 1 })
  id: number

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

  @ApiProperty({
    description: 'ID de la sucursal a la que pertenece el rol',
    example: 1
  })
  branches_id: number;

  @ApiProperty({ description: 'Estado del equipo', example: 1, required: false })
  status: number

  @ApiProperty({ description: 'Sucursal del equipo', type: [Object], nullable: true })
  branch?: EquipmentBranchDto;
}

class EquipmentBranchDto {
  @ApiProperty({ description: 'ID de la sucursal', example: 1 })
  id: number

  @ApiProperty({ description: 'Nombre de la sucursal', example: 'Sucursal 1' })
  name: string
}