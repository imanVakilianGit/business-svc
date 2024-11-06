import { SLUGIFY_REGEX } from '../regex/slugify.regex';

export function slugifyStrings(input: string): string {
    return input.trim().replace(SLUGIFY_REGEX, '_');
}
