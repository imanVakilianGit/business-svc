import { IsBoolean, IsNotEmpty } from 'class-validator';

import { IdDto } from '../../../common/dto/id.dto';

export class ActivationToggleSectionDto extends IdDto {
    @IsBoolean()
    @IsNotEmpty()
    isActive: boolean;
}
