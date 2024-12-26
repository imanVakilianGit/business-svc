import { BaseSuccessResponseFunctionType } from '../../../common/interface/base-success-response.interface';

export const SUCCESS_FIND_ONE_EMPLOYEE_BY_USER_ID: BaseSuccessResponseFunctionType = <T>(data: T) => {
    return {
        message: 'employee found successfully',
        code: 'SUCCESS_FIND_ONE_EMPLOYEE_BY_USER_ID',
        data,
    };
};
