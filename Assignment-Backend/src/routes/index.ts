import express from "express";
import routerV1 from "./v1";
import routerV2 from "./v2";

const mainRouter = express.Router();

mainRouter.use("/v1", routerV1);
mainRouter.use("/v2", routerV2);

export default mainRouter;