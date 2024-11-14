import { Type } from 'class-transformer';
import {
    ArrayMaxSize,
    ArrayMinSize,
    ArrayNotEmpty,
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Length,
    Matches,
    Min,
    ValidateNested,
} from 'class-validator';
import { GENERAL_LETTER_REGEX } from '../../../common/regex/letter.regex';

class options {
    @Matches(GENERAL_LETTER_REGEX)
    @Length(2, 25)
    @IsString()
    @IsNotEmpty()
    title: string;

    @Matches(GENERAL_LETTER_REGEX)
    @Length(2, 25)
    @IsString()
    @IsNotEmpty()
    value: string;
}

export class CreateBusinessDto {
    @Min(1)
    @IsNumber()
    @IsNotEmpty()
    ownerId: number;

    @Min(1)
    @IsNumber()
    @IsNotEmpty()
    businessCategoryId: number;

    @Matches(GENERAL_LETTER_REGEX)
    @Length(2, 25)
    @IsString()
    @IsNotEmpty()
    name: string;

    @ValidateNested({ each: true })
    @Type(() => options)
    @ArrayMaxSize(15)
    @ArrayMinSize(2)
    @ArrayNotEmpty()
    @IsArray()
    @IsNotEmpty()
    options: options[];

    @ValidateNested({ each: true })
    @Type(() => options)
    @ArrayMaxSize(10)
    @IsArray()
    @IsOptional()
    extraOptions: options[];
}
