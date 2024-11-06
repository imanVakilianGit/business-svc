import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessDto } from './create.dto';

export class UpdateBusinessDto extends PartialType(CreateBusinessDto) {
    id: number;
}
