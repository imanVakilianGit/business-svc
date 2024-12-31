import { BaseSuccessResponseFunctionType } from '../../../common/interface/base-success-response.interface';

export const SUCCESS_FIND_ONE_SECTION: BaseSuccessResponseFunctionType = <T>(data: T) => {
    return {
        message: 'section found successfully',
        code: 'SUCCESS_FIND_ONE_SECTION',
        data,
    };
};
