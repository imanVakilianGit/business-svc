interface Options {
    title: string;
    value: string;
}

interface ExtraOptions {
    title: string;
    value: string;
}

export interface CreateBusinessInputInterface {
    ownerId: number;
    businessCategoryId: number;
    name: string;
    slug: string;
    options: Options[];
    extraOptions: ExtraOptions[];
}
