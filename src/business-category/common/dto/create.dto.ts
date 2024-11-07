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
    ValidateNested,
} from 'class-validator';

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
