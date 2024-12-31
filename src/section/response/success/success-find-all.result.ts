import { BaseSuccessResponseFunctionType } from '../../../common/interface/base-success-response.interface';

export const SUCCESS_FIND_ALL_SECTIONS: BaseSuccessResponseFunctionType = <T>(data: T) => {
    return {
        message: 'sections found successfully',
        code: 'SUCCESS_FIND_ALL_SECTIONS',
        data,
    };
};
