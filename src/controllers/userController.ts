import userSchema from "../models/userSchema";
import { NextFunction, Request, Response } from "express";
import { unlinkSync } from "fs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendErrorResponse, sendSuccessResponse } from "../utils/common";
import { STATUS_CODES } from "../utils/statusCodes";
require("dotenv").config();

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userEmail, userPassword } = req.body;
    const isUserExists = await userSchema.findOne({ userEmail });

    if (isUserExists) {
      if (req.file) unlinkSync(req.file.path);
      return sendErrorResponse(res, "User already exists", STATUS_CODES.CONFLICt);
    }

    const hashedPassword = await bcrypt.hash(userPassword, 10);
    const profilePic = req.file ? `${process.env.BASE_URL}uploads/${req.file.filename}` : undefined;

    const newUser = new userSchema({ ...req.body, userPassword: hashedPassword, profilePic });
    const savedUser = await newUser.save();

    sendSuccessResponse(res, "Registered successfully", savedUser, STATUS_CODES.CREATED);
  } catch (error) {
    next(error);
  }
};

export const logIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userEmail, userPassword } = req.body

    const user = await userSchema.findOne({ userEmail: userEmail });

    if (!user) {
      return sendErrorResponse(res, "User not found", STATUS_CODES.UNAUTHORIZED);
    }

    const hashPassword = await bcrypt.compare(userPassword, user.userPassword);

    if (!hashPassword) {
      return sendErrorResponse(res, "Invalid email or password", STATUS_CODES.UNAUTHORIZED);
    }

    if (user && hashPassword && process.env.ACCESS_TOKEN) {
      const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN, {
        expiresIn: "1d",
      });

      sendSuccessResponse(res, "Login successful", {}, STATUS_CODES.OK, accessToken);
    }
  } catch (error: any) {
    next(error);
  }
};
