import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsIn, IsNumberString, IsOptional } from "class-validator";

export class PaginationRequestMetaDto {
  @ApiPropertyOptional({
    description: 'Término de búsqueda para filtrar resultados',
    required: false,
    example: 'empresa'
  })
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({
    description: 'Número de página a solicitar',
    required: false,
    example: 1
  })
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Número de elementos por página',
    required: false,
    example: 10
  })
  @IsOptional()
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Campo por el cual ordenar los resultados',
    required: false,
    example: 'id'
  })
  @IsOptional()
  orderBy?: string = 'id';

  @ApiPropertyOptional({
    description: 'Dirección de ordenamiento (ASC o DESC)',
    required: false,
    example: 'ASC'
  })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC';
}

export class PaginationResponseMetaDto extends PartialType(PaginationRequestMetaDto) {
  @ApiPropertyOptional({
    description: 'Número total de elementos disponibles',
    required: false,
    example: 100
  })
  @IsOptional()
  total?: number;

  @ApiPropertyOptional({
    description: 'Número total de páginas disponibles',
    required: false,
    example: 10
  })
  @IsOptional()
  totalPages?: number;
}

export class PaginationDto<T = any> {

  data: T[]

  meta: PaginationResponseMetaDto
}