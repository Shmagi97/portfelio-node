import express from "express";
import registerRouter from "./register.js";
import registerEdUserRouter from "./registerEdUserInfo.js";

const router = express.Router();

router.use("/register", registerRouter);
router.use("/registerEdUserInfo", registerEdUserRouter);

export default router;
