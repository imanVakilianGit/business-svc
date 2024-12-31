import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class FindOneSectionByCodeDto {
    @IsUUID()
    @IsString()
    @IsNotEmpty()
    code: UUID | string;
}
