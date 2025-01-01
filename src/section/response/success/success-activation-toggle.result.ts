import { BaseSuccessResponseFunctionType } from '../../../common/interface/base-success-response.interface';

export const SUCCESS_ACTIVATION_TOGGLE_SECTION: BaseSuccessResponseFunctionType = <T>(data: T) => {
    return {
        statusCode: 201,
        message: 'section activation status changed successfully',
        code: 'SUCCESS_UPDATE_SECTION',
        data,
    };
};
