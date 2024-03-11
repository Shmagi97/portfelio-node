import express from "express";
import registerRouter from "./register.js";
import registerUserInfoRouter from "./registerEdUserInfo.js";
import logginUsers from "./loggin.js";
import { routerUserInfo, routerLoggin, usersImage } from "../getUserInfo.js";

const routers = express.Router();

routers.use("/register", registerRouter);
routers.use("/registerEdUserInfo", registerUserInfoRouter);
routers.use("/loggin", logginUsers);
routers.use("/users", routerUserInfo);
routers.use("/usersIdentifier", routerLoggin);
routers.use("/registerEdUserInfo/usersPhotous", usersImage);

export default routers;
