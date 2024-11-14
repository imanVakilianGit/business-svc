import { Type } from 'class-transformer';
import {
    ArrayMaxSize,
    ArrayMinSize,
    ArrayNotEmpty,
    IsArray,
    IsNotEmpty,
    IsOptional,
    IsString,
    Length,
    Matches,
    ValidateNested,
} from 'class-validator';
import { GENERAL_LETTER_REGEX } from '../../../common/regex/letter.regex';

export class CreateBusinessCategoryOptionsTemplateDto {
    @Matches(GENERAL_LETTER_REGEX)
    @Length(2, 20)
    @IsString()
    @IsNotEmpty()
    title: string;
}

export class CreateBusinessCategoryDto {
    @Matches(GENERAL_LETTER_REGEX)
    @Length(2, 20)
    @IsString()
    @IsNotEmpty()
    title: string;

    @Length(10, 1000)
    @IsString()
    @IsOptional()
    description?: string;

    @ValidateNested({ each: true })
    @Type(() => CreateBusinessCategoryOptionsTemplateDto)
    @ArrayMaxSize(15)
    @ArrayMinSize(2)
    @ArrayNotEmpty()
    @IsArray()
    @IsNotEmpty()
    options: CreateBusinessCategoryOptionsTemplateDto[];
}
