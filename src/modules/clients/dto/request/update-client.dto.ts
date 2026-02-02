import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { CreateClientDto } from './create-client.dto';

export class UpdateClientDto extends PartialType(CreateClientDto) {
  @ApiProperty({ description: 'ID del cliente', example: 1 })
  @IsNumber({}, { message: 'Formato de Datos invalido: id debe ser un número entero' })
  id: number

  @ApiPropertyOptional({ description: 'Estado del cliente', example: 1, required: false })
  @IsOptional()
  @IsNumber({}, { message: 'Debe ser un número entero (0 o 1)' })
  @Min(0, { message: 'El dato enviado excede el rango permitido: mínimo 0' })
  @Max(1, { message: 'El dato enviado excede el rango permitido: máximo 1' })
  status?: number
}
