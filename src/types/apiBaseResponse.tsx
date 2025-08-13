type BaseResponse<T = null> = {
    success: boolean;
    message: string;
    data: T;
};

export type { BaseResponse };