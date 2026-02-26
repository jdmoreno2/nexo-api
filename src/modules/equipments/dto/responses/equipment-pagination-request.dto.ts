import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional } from "class-validator";
import { PaginationRequestMetaDto } from "src/common/dto/pagination-response.dto";

export class EquipmentPaginationRequestMetaDto extends PartialType(PaginationRequestMetaDto) {

    @ApiPropertyOptional({
        description: 'Filtrar por el id del equipo',
        required: false,
        example: 1
    })
    @IsOptional()
    @Type(() => Number)
    id?: number;

    @ApiPropertyOptional({
        description: 'Filtrar por el serial del equipo',
        required: false,
        example: 'X505'
    })
    @IsOptional()
    serial?: string;

    @ApiPropertyOptional({
        description: 'Filtrar por el id de la sucursal',
        required: false,
        example: 1
    })
    @IsOptional()
    branchId?: number;

    @ApiPropertyOptional({
        description: 'Filtrar por marca',
        required: false,
        example: 'Audi'
    })
    @IsOptional()
    brand?: string;

    @ApiPropertyOptional({
        description: 'Filtrar por modelo',
        required: false,
        example: 'MK15'
    })
    @IsOptional()
    model?: string;


}