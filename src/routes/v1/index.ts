import express from "express";
import { userRouter } from "./userRouter";
import { companyRouter } from "./companyRouter";
import { reviewRouter } from "./reviewRouter";
import { basePath } from "../../utils/routingPath";

const routerV1 = express.Router();

routerV1.use(basePath.User.base, userRouter);
routerV1.use(basePath.Company.base, companyRouter);
routerV1.use(basePath.Review.base, reviewRouter);

export default routerV1;