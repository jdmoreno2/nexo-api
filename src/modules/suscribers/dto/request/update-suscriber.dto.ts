import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateSuscriberDto } from './create-suscriber.dto';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class UpdateSuscriberDto extends PartialType(CreateSuscriberDto) {
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
