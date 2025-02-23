import express from "express";
import {
  addCompany,
  companyDetails,
  companyList,
  deleteCompany,
  updateCompany,
} from "../../controllers/companyController";
import { basePath } from "../../utils/routingPath";
import { upload } from "../../middleware/multer";
import { verifyToken } from "../../middleware/validateToken";

export const companyRouter = express.Router();
companyRouter.get(basePath.Company.list, companyList);
companyRouter.get(basePath.Company.details, companyDetails);
companyRouter.patch(basePath.Company.update, updateCompany);
companyRouter.delete(basePath.Company.delete, deleteCompany);
companyRouter.post(basePath.Company.create, upload.single('companyPic'), verifyToken, addCompany);
