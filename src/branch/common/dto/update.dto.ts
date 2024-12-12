import { PartialType } from '@nestjs/mapped-types';
import { CreateBranchDto } from './create.dto';

export class UpdateBranchDto extends PartialType(CreateBranchDto) {
    id: number;
}
