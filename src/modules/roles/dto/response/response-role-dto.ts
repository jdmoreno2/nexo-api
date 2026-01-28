import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { ResponseListRoleDto } from "./response-role-list.dto";
import { Permission } from '../../../permissions/entities/permission.entity';
import { ResponsePermissionDto } from "src/modules/permissions/dto/responses/response-permission.dto";

export class ResponseRoleDto extends PartialType(ResponseListRoleDto) {
  @ApiProperty({
    description: 'IDs de los permisos asociados al rol',
    example: [1, 2, 3]
  })
  permissions_ids: number[];

  @ApiPropertyOptional({
    description: 'Permisos asociados al rol',
    type: () => [ResponsePermissionDto],
  })
  Permissions?: ResponsePermissionDto[];
}