import { BaseSuccessResponseInterface } from '../../../../common/interface/base-success-response.interface';
import { businessCategoryWithOptionsTemplateRelationType } from '../entity/business-category-entity.type';

export type FindOneBySlugBusinessCategoryResponseType = BaseSuccessResponseInterface & {
    data: businessCategoryWithOptionsTemplateRelationType;
};
