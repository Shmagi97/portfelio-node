import expres from "express";
import mongoose from "mongoose";
import { userSchemaRegisterInfo } from "./userShema/userShema.js";

const router = expres.Router();
const DbUserRegisterInfo = mongoose.connection.useDb("Users");

const user = DbUserRegisterInfo.model(
  "user",
  userSchemaRegisterInfo,
  "registerEdUserInfo"
);

router.get("/:userID", async (req, res) => {
  const userId = req.params.userID;

  try {
    const userData = await user.findById(userId);
    if (!userData) {
      return res.status(404).json({ error: "User Not Found" });
    }

    res.status(200).json({ userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

export default router;
