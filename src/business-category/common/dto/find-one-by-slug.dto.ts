import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { SLUGIFY_REGEX } from '../../../common/regex/slugify.regex';

export class FindOneBySlugBusinessCategoryDto {
    @Matches(SLUGIFY_REGEX)
    @Length(2, 20)
    @IsString()
    @IsNotEmpty()
    slug: string;
}
