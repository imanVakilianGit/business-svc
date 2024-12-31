import { BaseSuccessResponseFunctionType } from '../../../common/interface/base-success-response.interface';

export const SUCCESS_FIND_ALL_BRANCHES: BaseSuccessResponseFunctionType = <T>(data: T) => {
    return {
        message: 'branches found successfully',
        code: 'SUCCESS_FIND_ALL_BRANCHES',
        data,
    };
};
