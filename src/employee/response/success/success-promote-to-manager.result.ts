import { BaseSuccessResponseFunctionType } from '../../../common/interface/base-success-response.interface';

export const SUCCESS_PROMOTE_EMPLOYEE_TO_MANAGER: BaseSuccessResponseFunctionType = <T>(data: T) => {
    return {
        message: 'employee promoted to manager successfully',
        code: 'SUCCESS_PROMOTE_EMPLOYEE_TO_MANAGER',
        data,
    };
};
