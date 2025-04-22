import express from "express";
import { userRouter } from "./userRouter";
import { bookRouter } from "./bookRouter";
import { basePath } from "../../utils/routingPath";

const routerV1 = express.Router();

routerV1.use(basePath.User.base, userRouter);
routerV1.use(basePath.Books.base, bookRouter);

export default routerV1;