import { BaseFailedResponseInterface } from '../../../common/interface/base-failed-response.interface';

export const FAILED_RELATION_BUSINESS_NOT_FOUND: BaseFailedResponseInterface = {
    message: 'business relations not found',
    code: 'FAILED_RELATION_BUSINESS_NOT_FOUND',
};

export const FAILED_BUSINESS_NOT_FOUND: BaseFailedResponseInterface = {
    message: 'business not found',
    code: 'FAILED_BUSINESS_NOT_FOUND',
};
