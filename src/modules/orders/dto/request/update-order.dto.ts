import { ApiProperty, ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { CreateOrderDto, CreateOrderTaskItemDto } from './create-order.dto';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, Max, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateOrderTaskItemDto extends PartialType(CreateOrderTaskItemDto) {
  @ApiPropertyOptional({ description: 'ID de la tarea', example: 1 })
  @IsOptional()
  @IsNumber({}, { message: 'Debe ser un número entero' })
  id?: number
}

export class UpdateOrderDto extends OmitType(CreateOrderDto, ['tasks'] as const) {
  @ApiProperty({ description: 'ID de la orden', example: 1 })
  @IsNumber({}, { message: 'Debe ser un número entero' })
  id: number

  @ApiPropertyOptional({ description: 'Estado de la orden', example: 1, required: false })
  @IsOptional()
  @IsNumber({}, { message: 'Debe ser un número entero (0 o 1)' })
  @Min(0, { message: 'El dato enviado excede el rango permitido: mínimo 0' })
  @Max(1, { message: 'El dato enviado excede el rango permitido: máximo 1' })
  status?: number

  @ApiProperty({
    description: 'Lista de tareas asociadas a la orden.',
    type: [UpdateOrderTaskItemDto]
  })
  @IsNotEmpty({ message: 'Faltan datos necesario: tasks.' })
  @IsArray({ message: 'tasks debe ser un arreglo.' }) // Recomendado para asegurar el tipo
  @ValidateNested({ each: true }) // <--- Valida cada elemento del arreglo
  @Type(() => UpdateOrderTaskItemDto)
  tasks: UpdateOrderTaskItemDto[];
}
