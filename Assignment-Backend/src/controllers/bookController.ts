import bookSchema from "../models/bookSchema";
import { NextFunction, Request, Response } from "express";
import { sendErrorResponse, sendSuccessResponse } from "../utils/common";
import { STATUS_CODES } from "../utils/statusCodes";

export const addBook = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { bookName } = req.body;
    const isBookExists = await bookSchema.findOne({ bookName });

    if (isBookExists) {
      return sendErrorResponse(res, "Book already exists", STATUS_CODES.CONFLICt);
    }

    const newBook = new bookSchema({
      ...req.body,
      userId: req.user._id,
    });

    await newBook.save();
    sendSuccessResponse(res, "Book registered successfully", newBook, STATUS_CODES.CREATED);
  } catch (error) {
    next(error);
  }
};
export const bookList = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { search = "", sorting = "asc" } = req.query;

    const searchQuery = search
      ? {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { author: { $regex: search, $options: "i" } },
        ],
      }
      : {};

    const sortDirection = sorting.toLowerCase() === "desc" ? -1 : 1;

    const books = await bookSchema.find(searchQuery).sort({ title: sortDirection });

    sendSuccessResponse(res, "Book list fetched successfully", {
      books,
      totalRecords: books.length,
    }, STATUS_CODES.OK);
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedBook = await bookSchema.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return sendErrorResponse(res, "Book Not Found", STATUS_CODES.NOT_FOUND);
    }

    sendSuccessResponse(res, "Book details updated successfully", updatedBook, STATUS_CODES.OK);
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (req: any, res: Response, next: NextFunction) => {
  try {
    const bookDelete = await bookSchema.findByIdAndDelete(req.params.id);
    if (bookDelete) {
      sendSuccessResponse(res, "Book deleted successfully", STATUS_CODES.OK);
    } else {
      sendErrorResponse(res, "Book Not Found", STATUS_CODES.NOT_FOUND);
    }
  } catch (err: any) {
    next(err)
  }
};

export const bookDetails = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const [book] = await Promise.all([
      bookSchema.findById(id),
    ]);

    if (!book) {
      return sendErrorResponse(res, "Book Not Found", STATUS_CODES.NOT_FOUND);
    }

    sendSuccessResponse(res, "Book details fetched successfully", { book }, STATUS_CODES.OK);
  } catch (error) {
    next(error);
  }
};
