import { Request, Response, NextFunction } from "express";
import { userSchema } from "./userSchema";
import { sendErrorResponse } from "../../utils/common";
import { STATUS_CODES } from "../../utils/statusCodes";

export const userValidate = {
  singUpValidation: async (req: Request, res: Response, next: NextFunction) => {
    const value = await userSchema.userSingup.validate(req.body);
    if (value.error) {
      sendErrorResponse(res, value.error.details[0].message, STATUS_CODES.BAD_REQUEST);
    } else {
      next();
    }
  },
  logInValidation: async (req: Request, res: Response, next: NextFunction) => {
    const value = await userSchema.login.validate(req.body);
    if (value.error) {
      sendErrorResponse(res, value.error.details[0].message, STATUS_CODES.BAD_REQUEST);
    } else {
      next();
    }
  },
};
