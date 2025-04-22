import { Request, Response, NextFunction } from "express";;
import logger from "../configs/logger";
import { sendErrorResponse } from "../utils/common";

interface CustomError extends Error {
    statusCode?: number;
    isOperational?: boolean;
    details?: any;
}

const isDev = true /* process.env.NODE_ENV === "development"; */

export const errorHandler = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || "Internal Server Error";

    // Operational errors (expected errors)
    if (err.isOperational) {
        logger.warn(`Operational Error - StatusCode: ${statusCode}, Message: ${errorMessage}`, {
            path: req.path,
            method: req.method,
            details: err.details,
        });
        sendErrorResponse(res, errorMessage, isDev ? err : undefined, statusCode);
        return;
    }

    // Non-operational errors (unexpected errors) - these might require further investigation
    logger.error(`Non-Operational Error - StatusCode: ${statusCode}, Message: ${errorMessage}`, {
        path: req.path,
        method: req.method,
        stack: isDev ? err.stack : undefined,
        details: err.details,
    });

    // Send a generic message for non-operational errors in production
    sendErrorResponse(
        res,
        isDev ? errorMessage : "An unexpected error occurred",
        isDev ? err : undefined,
        statusCode
    );
};