import companySchema from "../models/companySchema";
import { NextFunction, Request, Response } from "express";
import reviewSchema from "../models/reviewSchema";
import { unlinkSync } from "fs";
import { sendErrorResponse, sendSuccessResponse } from "../utils/common";
import { STATUS_CODES } from "../utils/statusCodes";

export const addCompany = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { companyName } = req.body;
    const isCompanyExists = await companySchema.findOne({ companyName });

    if (isCompanyExists) {
      if (req.file) unlinkSync(req.file.path);
      return sendErrorResponse(res, "Company already exists", STATUS_CODES.CONFLICt);
    }

    const companyPic = req.file ? `${process.env.BASE_URL}uploads/${req.file.filename}` : undefined;
    const newCompany = new companySchema({
      ...req.body,
      companyPic: companyPic,
      userId: req.user._id,
    });

    await newCompany.save();
    sendSuccessResponse(res, "Company registered successfully", newCompany, STATUS_CODES.CREATED);
  } catch (error) {
    next(error);
  }
};
export const companyList = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { search = "", sorting = "asc" } = req.query;

    const searchQuery = search
      ? {
        $or: [
          { companyName: { $regex: search, $options: "i" } },
          { companyLocation: { $regex: search, $options: "i" } },
          { companyCity: { $regex: search, $options: "i" } },
        ],
      }
      : {};

    const sortDirection = sorting.toLowerCase() === "desc" ? -1 : 1;

    const companies = await companySchema.find(searchQuery).sort({ companyName: sortDirection });

    const companyIds = companies.map(company => company._id);

    const reviewsData = await reviewSchema.aggregate([
      {
        $match: { companyId: { $in: companyIds } }
      },
      {
        $group: {
          _id: "$companyId",
          reviewCount: { $sum: 1 },
          averageRating: { $avg: "$rating" }
        }
      }
    ]);

    const reviewsMap = reviewsData.reduce((acc, review) => {
      acc[review._id.toString()] = {
        reviewCount: review.reviewCount,
        averageRating: review.averageRating.toFixed(1) // Round to 1 decimal place
      };
      return acc;
    }, {});

    const updatedCompanies = companies.map(company => ({
      ...company.toObject(),
      reviewCount: reviewsMap[company._id.toString()]?.reviewCount || 0,
      averageRating: reviewsMap[company._id.toString()]?.averageRating || 0
    }))

    sendSuccessResponse(res, "Company list fetched successfully", {
      companies: updatedCompanies,
      totalRecords: companies.length,
    }, STATUS_CODES.OK);
  } catch (error) {
    next(error);
  }
};

export const updateCompany = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedCompany = await companySchema.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true } // Returns updated document & ensures validation
    );

    if (!updatedCompany) {
      return sendErrorResponse(res, "Company Not Found", STATUS_CODES.NOT_FOUND);
    }

    sendSuccessResponse(res, "Company details updated successfully", updatedCompany, STATUS_CODES.OK);
  } catch (error) {
    next(error);
  }
};

export const deleteCompany = async (req: any, res: Response, next: NextFunction) => {
  try {
    const companyDelete = await companySchema.findByIdAndDelete(req.params.id);
    if (companyDelete) {
      sendSuccessResponse(res, "Company deleted successfully", STATUS_CODES.OK);
    } else {
      sendErrorResponse(res, "Company Not Found", STATUS_CODES.NOT_FOUND);
    }
  } catch (err: any) {
    next(err)
  }
};

export const companyDetails = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { sorting = "asc" } = req.query;

    const sortDirection = sorting.toLowerCase() === "desc" ? -1 : 1;
    const [company, reviews] = await Promise.all([
      companySchema.findById(id),
      reviewSchema.find({ companyId: id }).populate({ path: "userId", select: "userName profilePic" }).sort({ rating: sortDirection })
    ]);

    if (!company) {
      return sendErrorResponse(res, "Company Not Found", STATUS_CODES.NOT_FOUND);
    }

    sendSuccessResponse(res, "Company details fetched successfully", { company, reviews }, STATUS_CODES.OK);
  } catch (error) {
    next(error);
  }
};
