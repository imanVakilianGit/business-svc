import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';
import { IdDto } from '../../../common/dto/id.dto';

export class UpdateSectionDto extends IdDto {
    @Length(3, 30)
    @IsString()
    @IsOptional()
    name?: string;

    @Length(3, 30)
    @IsString()
    @IsOptional()
    description?: string;

    @Min(1)
    @IsNumber()
    @IsNotEmpty()
    managerId: number;
}
