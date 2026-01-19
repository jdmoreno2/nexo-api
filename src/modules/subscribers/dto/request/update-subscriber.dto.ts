import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateSubscriberDto } from './create-subscriber.dto';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class UpdateSubscriberDto extends PartialType(CreateSubscriberDto) {
  @ApiProperty({
    description: 'ID de la compañia',
    example: 1
  })
  @IsNumber({}, { message: 'Formato de Datos invalido: id debe ser un número entero.' })
  id: number;

  @ApiPropertyOptional({
    description: 'Estado de la compañia',
    example: 1
  })
  @IsOptional()
  @IsNumber({}, { message: 'Formato de Datos invalido: status debe ser un número entero (0 o 1).' })
  @Min(0, { message: 'El dato enviado excede el rango permitido: minimo 0' })
  @Max(1, { message: 'El dato enviado excede el rango permitido: máximo 1' })
  status?: number;
}
