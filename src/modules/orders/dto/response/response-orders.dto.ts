import { ApiProperty } from "@nestjs/swagger"

class BranchDto {
  @ApiProperty({ description: 'Nombre de la sucursal', example: 'Sucursal 1' })
  name: string
}

class OrdersTypeDto {
  @ApiProperty({ description: 'Nombre de la sucursal', example: 'Sucursal 1' })
  name: string
}

export class ResponseOrdersDto {
  @ApiProperty({ description: 'ID del tipo de orden', example: 1 })
  id: number


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

  @ApiProperty({ description: 'Sucursal', type: [Object], nullable: true })
  branch?: BranchDto;

  @ApiProperty({ description: 'Tipo de orden', type: [Object], nullable: true })
  orders_type?: OrdersTypeDto;
}