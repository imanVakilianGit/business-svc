import { BaseSuccessResponseFunctionType } from '../../../common/interface/base-success-response.interface';

export const SUCCESS_CREATE_SECTION: BaseSuccessResponseFunctionType = <T>(data: T) => {
    return {
        statusCode: 201,
        message: 'section created successfully',
        code: 'SUCCESS_CREATE_SECTION',
        data,
    };
};
