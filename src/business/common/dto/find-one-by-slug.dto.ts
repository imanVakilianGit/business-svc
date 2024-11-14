import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { SLUGIFY_REGEX } from '../../../common/regex/slugify.regex';

export class FindOneBySLugBusinessDto {
    @Matches(SLUGIFY_REGEX)
    @Length(2, 25)
    @IsString()
    @IsNotEmpty()
    slug: string;
}
