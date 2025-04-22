import { Request, Response, NextFunction } from "express";
import { bookSchema } from "./bookSchema";
import { sendErrorResponse } from "../../utils/common";
import { STATUS_CODES } from "../../utils/statusCodes";

export const bookValidate = {
  validateBook: (req: Request, res: Response, next: NextFunction) => {
    const value = bookSchema.bookValidate.validate(req.body);
    if (value.error) {
      sendErrorResponse(res, value.error.details[0].message, STATUS_CODES.BAD_REQUEST);
    } else {
      next();
    }
  },
};
