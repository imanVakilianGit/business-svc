import { business } from '@prisma/client';
import { BaseSuccessResponseInterface } from '../../../../common/interface/base-success-response.interface';
import { PaginationResponseInterface } from '../../../../common/interface/pagination-response.interface';

export type FindAllBusinessResponseType = BaseSuccessResponseInterface & {
    data: PaginationResponseInterface & {
        businesses: business[];
    };
};
