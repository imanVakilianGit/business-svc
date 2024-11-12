interface Options {
    title: string;
    value: string;
}
export interface CreateBusinessInputInterface {
    ownerId: number;
    businessCategoryId: number;
    name: string;
    slug: string;
    options: Options[];
    extraOptions: Options[];
}
