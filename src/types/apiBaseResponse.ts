type BaseResponse<T = undefined> = {
    success: boolean;
    message: string;
    data: T;
};

export type { BaseResponse };