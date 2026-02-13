import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger"
import { ResponseTaskListDto } from "./response-task-list.dto"

export class ResponseTaskDto extends PartialType(ResponseTaskListDto) {
  @ApiProperty({
    description: 'ID de la orden de servicio',
    example: 1
  })
  orders_id: number;

  @ApiPropertyOptional({
    description: 'ID del equipo',
    example: 1
  })
  equipments_id?: number;

  @ApiProperty({
    description: 'ID del usuario',
    example: 1
  })
  users_id: number;
}