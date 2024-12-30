export interface BaseSuccessResponseInterface {
    statusCode?: number;
    message: string;
    code: string;
    data: object;
}

export type BaseSuccessResponseFunctionType = <T>(data: T) => {
    statusCode?: number;
    message: string;
    code: string;
    data: T;
};
