import { BaseSuccessResponseFunctionType } from '../../../common/interface/base-success-response.interface';

export const SUCCESS_CREATE_EMPLOYEE: BaseSuccessResponseFunctionType = <T>(data: T) => {
    return {
        message: 'employee created successfully',
        code: 'SUCCESS_CREATE_EMPLOYEE',
        data,
    };
};
