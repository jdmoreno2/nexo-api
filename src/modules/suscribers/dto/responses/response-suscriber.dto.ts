import { PartialType } from "@nestjs/swagger";
import { UpdateSuscriberDto } from "../request/update-suscriber.dto";

export class ResponseSuscriberDto extends PartialType(UpdateSuscriberDto) {

}