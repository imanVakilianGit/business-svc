import { BaseSuccessResponseInterface } from '../../../../common/interface/base-success-response.interface';
import { businessCategoryListWithOptionsTemplateRelationType } from '../entity/business-category-entity.type';

export type FindOneByIdBusinessCategoryResponseType = BaseSuccessResponseInterface & {
    data: businessCategoryListWithOptionsTemplateRelationType;
};
