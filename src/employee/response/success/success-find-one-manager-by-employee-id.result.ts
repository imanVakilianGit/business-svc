import { BaseSuccessResponseFunctionType } from '../../../common/interface/base-success-response.interface';

export const SUCCESS_FIND_ONE_MANAGER_BY_EMPLOYEE_ID: BaseSuccessResponseFunctionType = <T>(data: T) => {
    return {
        message: 'manager found successfully',
        code: 'SUCCESS_FIND_ONE_MANAGER_BY_EMPLOYEE_ID',
        data,
    };
};
