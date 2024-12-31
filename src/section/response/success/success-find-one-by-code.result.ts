import { BaseSuccessResponseFunctionType } from '../../../common/interface/base-success-response.interface';

export const SUCCESS_FIND_ONE_SECTION_BY_CODE: BaseSuccessResponseFunctionType = <T>(data: T) => {
    return {
        message: 'section found successfully',
        code: 'SUCCESS_FIND_ONE_SECTION_BY_CODE',
        data,
    };
};
