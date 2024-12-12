export interface BaseSuccessResponseInterface {
    message: string;
    code: string;
    data: object;
}

export type BaseSuccessResponseFunctionType = <T>(data: T) => {
    message: string;
    code: string;
    data: T;
};
