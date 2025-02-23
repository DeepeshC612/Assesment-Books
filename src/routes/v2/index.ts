import express from "express";
import { basePath } from "../../utils/routingPath";

const routerV2 = express.Router();

routerV2.use(basePath.User.base, (req, res) => {res.send("Not implemented yet")});

export default routerV2;