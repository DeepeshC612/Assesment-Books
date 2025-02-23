import { Response } from 'express';

export interface ApiResponse {
    status: boolean;
    message: string;
    result?: any;
    error?: any;
    token?: string
}

export const sendSuccessResponse = (res: Response, message: string, result: any = null, statusCode: number = 200, token?: string): void => {
    const response: ApiResponse = {
        status: true,
        message,
        result,
        token
    };
    res.status(statusCode).json(response);
};

export const sendErrorResponse = (res: Response, message: string, error: any = null, statusCode: number = 500): void => {
    const response: ApiResponse = {
        status: false,
        message,
        error,
    };
    res.status(statusCode).json(response);
};