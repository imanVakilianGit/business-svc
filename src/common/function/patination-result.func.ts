import { PaginationResponseInterface } from '../interface/pagination-response.interface';

export function paginationResult<T, D extends string>(data: {
    totalCount: number;
    limit: number;
    page: number;
    count: number;
    resultFieldName: D;
    ResultValue: T[];
    sortBy?: string;
    orderBy?: string;
}): PaginationResponseInterface & { [K in D]: T[] } {
    return <PaginationResponseInterface & { [K in D]: T[] }>{
        totalPage: data.totalCount > 0 ? Math.ceil(data.totalCount / data.limit) : 0,
        totalCount: data.totalCount,
        limit: data.limit,
        page: data.page,
        count: data.count,
        ...(data.sortBy ? { sortBy: data.sortBy } : {}),
        ...(data.orderBy ? { orderBy: data.orderBy } : {}),
        [data.resultFieldName]: data.ResultValue,
    };
}
