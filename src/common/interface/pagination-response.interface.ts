export interface PaginationResponseInterface {
    page: number;
    count: number;
    limit: number;
    totalPage: number;
    totalCount: number;
    sortBy?: string;
    orderBy?: string;
}
