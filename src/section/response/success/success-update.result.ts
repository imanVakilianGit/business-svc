import { BaseSuccessResponseFunctionType } from '../../../common/interface/base-success-response.interface';

export const SUCCESS_UPDATE_SECTION: BaseSuccessResponseFunctionType = <T>(data: T) => {
    return {
        statusCode: 201,
        message: 'section updated successfully',
        code: 'SUCCESS_UPDATE_SECTION',
        data,
    };
};
