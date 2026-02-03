import { ApiProperty, PartialType } from "@nestjs/swagger";
import { UpdateBranchDto } from "../request/update-branch.dto";

export class ResponseBranchtDto extends PartialType(UpdateBranchDto) {
  @ApiProperty({
    description: 'Nombre del cliente',
    example: 'NatuChips'
  })
  name: string;
}