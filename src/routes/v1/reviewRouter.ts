import express from "express";
import {
  createReview,
  deleteReview,
  likeReview,
  updateReview,
} from "../../controllers/reviewController";
import { reviewValidate } from "../../validator/reviewValidate/reviewValidation";
import { basePath } from "../../utils/routingPath";
import { verifyToken } from "../../middleware/validateToken";


export const reviewRouter = express.Router();
reviewRouter.patch(basePath.Review.update, updateReview);
reviewRouter.patch(basePath.Review.like, verifyToken, likeReview);
reviewRouter.delete(basePath.Review.delete, deleteReview);
reviewRouter.post(basePath.Review.create, reviewValidate.validateReview, verifyToken, createReview);
