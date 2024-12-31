import { BaseSuccessResponseFunctionType } from '../../../common/interface/base-success-response.interface';

export const SUCCESS_CREATE_BRANCH: BaseSuccessResponseFunctionType = <T>(data: T) => {
    return {
        message: 'branch crated successfully',
        code: 'SUCCESS_CREATE_BRANCH',
        data,
    };
};
