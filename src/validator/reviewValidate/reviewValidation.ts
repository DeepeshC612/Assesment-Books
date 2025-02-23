import { Request, Response, NextFunction } from "express";
import { reviewSchema } from "./reviewSchema";
import { sendErrorResponse } from "../../utils/common";
import { STATUS_CODES } from "../../utils/statusCodes";

export const reviewValidate = {
  validateReview: (req: Request, res: Response, next: NextFunction) => {
    const value = reviewSchema.reviewValidate.validate(req.body);
    if (value.error) {
      sendErrorResponse(res, value.error.details[0].message, STATUS_CODES.BAD_REQUEST);
    } else {
      next();
    }
  },
};
