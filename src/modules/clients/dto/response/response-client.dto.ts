import { PartialType } from "@nestjs/swagger";
import { UpdateClientDto } from "../request/update-client.dto";

export class ResponseClientDto extends PartialType(UpdateClientDto) {
}