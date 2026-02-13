import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({
    description: 'ID de la Tarea',
    example: 1
  })
  @IsNumber({}, { message: 'Formato de Datos invalido: id debe ser un número entero.' })
  id: number;

  @ApiPropertyOptional({
    description: 'Estado de la Tarea (0 para Inactiva, 1 para Activa)',
    example: 1
  })
  @IsOptional()
  @IsNumber({}, { message: 'Formato de Datos invalido: status debe ser un número entero (0 o 1).' })
  @Min(0, { message: 'El dato enviado excede el rango permitido: minimo 0' })
  @Max(1, { message: 'El dato enviado excede el rango permitido: máximo 1' })
  status?: number;
}
