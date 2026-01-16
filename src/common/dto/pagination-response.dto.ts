import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsIn, IsNumberString, IsOptional } from "class-validator";

export class PaginationRequestMetaDto {
    @ApiPropertyOptional({ description: 'Término de búsqueda', example: 'admin', required: false })
    @IsOptional()
    search?: string;

    @ApiPropertyOptional({ description: 'Número de página', example: 1, required: false })
    @IsOptional()
    // @IsNumberString()
    page?: number = 1;

    @ApiPropertyOptional({ description: 'Cantidad de elementos por página', example: 10, required: false })
    @IsOptional()
    // @IsNumberString()
    limit?: number = 10;

    @ApiPropertyOptional({ description: 'Campo por el cual se ordena', example: 'id', required: false })
    @IsOptional()
    orderBy?: string = 'id';

    @ApiPropertyOptional({ description: 'Dirección de ordenamiento', example: 'ASC', required: false })
    @IsOptional()
    @IsIn(['ASC', 'DESC'])
    order?: 'ASC' | 'DESC';
}

export class PaginationResponseMetaDto extends PaginationRequestMetaDto {
    @ApiPropertyOptional({ description: 'Número total de elementos', example: 100 })
    @IsOptional()
    total?: number;

    @ApiPropertyOptional({ description: 'Número total de páginas', example: 10 })
    @IsOptional()
    totalPages?: number;
}

export class PaginationDto<T = any> {

    data: T[]

    meta: PaginationResponseMetaDto
}