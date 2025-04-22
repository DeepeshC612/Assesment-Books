import { NextFunction, Response } from "express";
import { STATUS_CODES } from "../utils/statusCodes";
import jwt from 'jsonwebtoken'
import { sendErrorResponse } from "../utils/common";

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return sendErrorResponse(res, "Token not found", null, STATUS_CODES.BAD_REQUEST)
  }
  try {
    const decoded = jwt.verify(token as string, process.env.ACCESS_TOKEN as string);
    req.user = decoded as typeof req.user;
    next();
  } catch (error: any) {
    return sendErrorResponse(
      res,
      'Token verification failed.',
      error.message || 'Token verification failed.',
      STATUS_CODES.UNAUTHORIZED
    )
  }
};