import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class FindOneBranchByCodeDto {
    @IsUUID()
    @IsString()
    @IsNotEmpty()
    code: UUID | string;
}
