import express from "express";
import registerRouter from "./register.js";
import registerEdUserRouter from "./registerEdUserInfo.js";
import getRegisterUserInfo from "../getUserInfo.js";

const routers = express.Router();

routers.use("/register", registerRouter);
routers.use("/registerEdUserInfo", registerEdUserRouter);
routers.use("/users", getRegisterUserInfo);

export default routers;
