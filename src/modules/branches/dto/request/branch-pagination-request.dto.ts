import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional } from "class-validator";
import { PaginationRequestMetaDto } from "src/common/dto/pagination-response.dto"

export class BranchPaginationRequestMetaDto extends PartialType(PaginationRequestMetaDto) {

    @ApiPropertyOptional({
        description: 'Filtrar por el id del cliente',
        required: false,
        example: 1
    })
    @IsOptional()
    @Type(() => Number)
    clientId?: number;

    @ApiPropertyOptional({
        description: 'Filtrar por el NIT del cliente',
        required: false,
        example: '123456789'
    })
    @IsOptional()
    nit?: string;

    @ApiPropertyOptional({
        description: 'Filtrar por nombre de sucursal',
        required: false
    })
    @IsOptional()
    branchName?: string;
}