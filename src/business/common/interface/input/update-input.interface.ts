interface Options {
    id: number;
    value: string;
}

interface ExtraOptions {
    id: number;
    title: string;
    value: string;
}

export interface UpdateBusinessInputInterface {
    id: number;
    name?: string;
    slug?: string;
    options?: Options[];
    extraOptions?: ExtraOptions[];
}
