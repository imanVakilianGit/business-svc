import { business_category, business_category_options_template } from '@prisma/client';
import { PaginationResponseInterface } from '../../../../common/interface/pagination-response.interface';

export type businessCategoryWithOptionsTemplateRelationType = business_category & {
    options_template: business_category_options_template;
};

export type businessCategoryListWithOptionsTemplateRelationType = PaginationResponseInterface & {
    businessCategories: businessCategoryWithOptionsTemplateRelationType[];
};
