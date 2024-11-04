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
import { SLUGIFY_REGEX } from '../../../common/regex/slugify.regex';

export class CreateBusinessCategoryOptionsTemplateDto {
    @Length(2, 20)
    @IsString()
    @IsNotEmpty()
    title: string;
}

export class CreateBusinessCategoryDto {
    @Length(2, 20)
    @IsString()
    @IsNotEmpty()
    title: string;

    @Matches(SLUGIFY_REGEX)
    @Length(2, 20)
    @IsString()
    @IsOptional()
    slug?: string;

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
    options: CreateBusinessCategoryOptionsTemplateDto[];
}
