import express from "express";
import { upload } from '../../middleware/multer'
import { logIn, signUp } from "../../controllers/userController";
import { userValidate } from '../../validator/userValidate/userValidate'
import { basePath } from "../../utils/routingPath";

export const userRouter = express.Router();
userRouter.post(basePath.User.login, userValidate.logInValidation, logIn);
userRouter.post(basePath.User.signup, upload.single('profilePic'), userValidate.singUpValidation, signUp);
