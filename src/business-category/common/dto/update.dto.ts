import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessCategoryDto } from './create.dto';

export class UpdateBusinessCategoryDto extends PartialType(CreateBusinessCategoryDto) {
    id: number;
}
