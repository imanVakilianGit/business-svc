import { ArrayMaxSize, IsArray, IsOptional, IsString, Length, Matches, ValidateNested } from 'class-validator';
import { IntersectionType, OmitType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';

import { GENERAL_LETTER_REGEX } from '../../../common/regex/letter.regex';
import { IdDto } from '../../../common/dto/id.dto';
import { optionsDto as BaseOptionsDto } from './create.dto';

class ExtraOptionsDto extends IntersectionType(IdDto, BaseOptionsDto) {}

class optionsDto extends OmitType(ExtraOptionsDto, ['title']) {}

export class UpdateBusinessDto extends IdDto {
    @Matches(GENERAL_LETTER_REGEX)
    @Length(2, 25)
    @IsString()
    @IsOptional()
    name?: string;

    @ValidateNested({ each: true })
    @Type(() => optionsDto)
    @ArrayMaxSize(15)
    @IsArray()
    @IsOptional()
    options?: optionsDto[];

    @ValidateNested({ each: true })
    @Type(() => ExtraOptionsDto)
    @ArrayMaxSize(10)
    @IsArray()
    @IsOptional()
    extraOptions?: ExtraOptionsDto[];
}
