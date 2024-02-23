import express from "express";
import registerRouter from "./register.js";
import registerEdUserRouter from "./registerEdUserInfo.js";

const routers = express.Router();

routers.use("/register", registerRouter);
routers.use("/registerEdUserInfo", registerEdUserRouter);

export default routers;
