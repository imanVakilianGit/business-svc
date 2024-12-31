import { BaseSuccessResponseFunctionType } from '../../../common/interface/base-success-response.interface';

export const SUCCESS_FIND_ONE_BRANCH_BY_CODE: BaseSuccessResponseFunctionType = <T>(data: T) => {
    return {
        message: 'branch found successfully',
        code: 'SUCCESS_FIND_ONE_BRANCH_BY_CODE',
        data,
    };
};
