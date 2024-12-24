import { BaseFailedResponseInterface } from '../../../common/interface/base-failed-response.interface';

export const FAILED_BUSINESS_NOT_FOUND: BaseFailedResponseInterface = {
    message: 'business not found',
    code: 'FAILED_BUSINESS_NOT_FOUND',
};

export const FAILED_BUSINESS_ALREADY_EXIST: BaseFailedResponseInterface = {
    message: 'business already exist',
    code: 'FAILED_BUSINESS_ALREADY_EXIST',
    field: '',
};

export const FAILED_RELATIONS_OF_BUSINESS_NOT_FOUND: BaseFailedResponseInterface = {
    message: 'one or more relation not found',
    code: 'FAILED_RELATIONS_OF_BUSINESS_NOT_FOUND',
    field: '',
};

export const FAILED_YOU_ARE_IN_A_BUSINESS_ALREADY: BaseFailedResponseInterface = {
    message: 'you are already working in another business\n if you want create a new business you should not work any business',
    code: 'FAILED_YOU_ARE_IN_A_BUSINESS_ALREADY',
};
