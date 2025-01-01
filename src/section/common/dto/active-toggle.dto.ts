import { IsBoolean, IsNotEmpty, IsNumber, Min } from 'class-validator';

import { IdDto } from '../../../common/dto/id.dto';

export class ActivationToggleSectionDto extends IdDto {
    @IsBoolean()
    @IsNotEmpty()
    isActive: boolean;

    @Min(1)
    @IsNumber()
    @IsNotEmpty()
    managerId: number;
}
