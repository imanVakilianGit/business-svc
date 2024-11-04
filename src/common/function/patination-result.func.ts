import { PaginationResponseInterface } from '../interface/pagination-response.interface';

export function paginationResult<T>(
    totalCount: number,
    limit: number,
    page: number,
    count: number,
    resultFieldName: string,
    ResultValue: T[],
): PaginationResponseInterface & { [field: string]: number | T[] } {
    return {
        totalPage: totalCount > 0 ? Math.floor(totalCount / limit) + 1 : 0,
        totalCount,
        limit,
        page,
        count,
        [resultFieldName]: ResultValue,
    };
}
