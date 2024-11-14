import { BaseSuccessResponseInterface } from '../../../../common/interface/base-success-response.interface';
import { BusinessWithDetailType } from '../entity/business-with-detail.type';

export type FindOneBySlugBusinessResponseType = BaseSuccessResponseInterface & BusinessWithDetailType;