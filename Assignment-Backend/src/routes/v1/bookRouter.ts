import express from "express";
import {
  addBook,
  bookList,
  updateBook,
  deleteBook,
  bookDetails,
} from "../../controllers/bookController";
import { basePath } from "../../utils/routingPath";
import { bookValidate } from '../../validator/bookValidate/bookValidation'
import { verifyToken } from "../../middleware/validateToken";

export const bookRouter = express.Router();
bookRouter.get(basePath.Books.list, bookList);
bookRouter.get(basePath.Books.details, bookDetails);
bookRouter.patch(basePath.Books.update, updateBook);
bookRouter.delete(basePath.Books.delete, deleteBook);
bookRouter.post(basePath.Books.create, bookValidate.validateBook,  verifyToken, addBook);
