import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { userSchemaRegister } from "../userShema/userShema.js";

const logginUsers = express.Router();

const DbUsers = mongoose.connection.useDb("Users");
const user = DbUsers.model("users", userSchemaRegister, "users-register");

logginUsers.post("/", async (req, res) => {
  const { nameValue, paswordValue } = req.body;

  if (nameValue && paswordValue) {
    try {
      const findUser = await user.findOne({
        identifier: nameValue,
      });

      if (findUser) {
        const hashedUserPasword = bcrypt.compareSync(
          paswordValue,
          findUser.hashedPasword
        );

        if (hashedUserPasword)
          return res.redirect(`/usersIdentifier/${nameValue}`);
        else {
          return res.status(400).json({ loggin: " პაროლი არასწორია" });
        }
      } else {
        return res.status(400).json({ loggin: "იდენთიფიკატორი არასწორია" });
      }
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: "სერვერზე მოხდა შეცდომა " });
    }
  }
});

export default logginUsers;
