import type { BaseResponse } from "@/types/apiBaseResponse";

type Media = {
    file_name: string;
    file_type: string;
    file_size: number;
    file_url: string;
};

type UploadRequest = {
    file: File;
    metadata: {
        conversation_id: string;
    };
};

type UploadResponse = BaseResponse<Media | null>;

export type { Media, UploadRequest, UploadResponse };