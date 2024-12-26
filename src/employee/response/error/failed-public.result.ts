import { BaseFailedResponseInterface } from '../../../common/interface/base-failed-response.interface';

export const FAILED_EMPLOYEE_NOT_FOUND: BaseFailedResponseInterface = {
    message: 'employee not found',
    code: 'FAILED_EMPLOYEE_NOT_FOUND',
};

export const FAILED_EMPLOYEE_ALREADY_EXISTS: BaseFailedResponseInterface = {
    message: 'employee already exists',
    code: 'FAILED_EMPLOYEE_ALREADY_EXISTS',
};

export const FAILED_USER_NOT_FOUND: BaseFailedResponseInterface = {
    message: 'user not found',
    code: 'FAILED_USER_NOT_FOUND',
};

export const FAILED_MANAGER_NOT_FOUND: BaseFailedResponseInterface = {
    message: 'manager not found',
    code: 'FAILED_MANAGER_NOT_FOUND',
};

export const FAILED_MANAGER_ALREADY_EXISTS: BaseFailedResponseInterface = {
    message: 'manager already exists',
    code: 'FAILED_MANAGER_ALREADY_EXISTS',
};
