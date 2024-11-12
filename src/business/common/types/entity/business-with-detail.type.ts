import { admin, business, business_category, business_extra_options, business_options } from '@prisma/client';

export type BusinessWithDetailType = business & {
    owner: admin;
    business_category: business_category;
    options: business_options;
    extra_options: business_extra_options;
};
