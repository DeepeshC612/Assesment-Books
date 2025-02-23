import { NextFunction, Response } from "express";
import { sendErrorResponse, sendSuccessResponse } from "../utils/common";
import reviewSchema from "../models/reviewSchema";
import { STATUS_CODES } from "../utils/statusCodes";

export const createReview = async (req: any, res: Response, next: NextFunction) => {
  try {
    const reviewData = new reviewSchema(req.body);
    reviewData.userId = req.user?.user?._id;
    reviewData.companyId = req.params?.cid;

    await reviewData.save();

    sendSuccessResponse(res, "Review Added Successfully", reviewData, STATUS_CODES.CREATED);
  } catch (err: any) {
    next(err)
  }
};

export const deleteReview = async (req: any, res: Response, next: NextFunction) => {
  try {
    const reviewDelete = await reviewSchema.findByIdAndDelete(req.params.id);
    if (reviewDelete) {
      sendSuccessResponse(res, `Review deleted successefully`, STATUS_CODES.OK);
    } else {
      sendErrorResponse(
        res,
        "Review Not Found",
        STATUS_CODES.NOT_FOUND,
      );
    }
  } catch (err: any) {
    next(err)
  }
};

export const updateReview = async (req: any, res: Response, next: NextFunction) => {
  try {
    const isReviewExists = await reviewSchema.findById(req.params.id);
    if (!isReviewExists) {
      return sendErrorResponse(res, "Review Not Found", STATUS_CODES.NOT_FOUND,);
    }
    const reviewData = await reviewSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });

    sendSuccessResponse(res, "Review updated successfully", reviewData, STATUS_CODES.OK);

  } catch (err: any) {
    next(err)
  }
};

export const likeReview = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { value } = req.body;
    const userId = req.user?.user?._id

    if (![0, 1].includes(value)) {
      return sendErrorResponse(res, "Invalid like value", STATUS_CODES.BAD_REQUEST);
    }

    const review = await reviewSchema.findById(id);
    if (!review) {
      return sendErrorResponse(res, "Review Not Found", STATUS_CODES.NOT_FOUND);
    }

    const existingLikeIndex = review.likes.findIndex((like: any) => like.userId.toString() === userId);

    if (existingLikeIndex > -1) {
      review.likes[existingLikeIndex].value = value;
    } else {
      review.likes.push({ userId, value });
    }

    await review.save();

    sendSuccessResponse(res, "Review like/dislike updated successfully", review, STATUS_CODES.OK);
  } catch (err: any) {
    next(err);
  }
};

