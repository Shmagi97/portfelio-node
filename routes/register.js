import express from "express";
import mongoose from "mongoose";
import { userSchemaRegister } from "../userShema/userShema.js";

const registerRouter = express.Router();

registerRouter.get("/", (req, res) => {
  res.send(" this is register  page");
});

const dbUsers = mongoose.connection.useDb("Users");

const user = dbUsers.model("user", userSchemaRegister, "users-register");

registerRouter.post("/", async (req, res) => {
  const {
    email,
    password,
    confirm,
    identifier,
    prefix,
    phone,
    agreement,
    nameValue,
    paswordValue,
  } = req.body;

  try {
    if (nameValue && paswordValue) {
      try {
        const findUser = await user.findOne({
          identifier: nameValue,
          password: paswordValue,
        });

        if (findUser) {
          return res.redirect(`/usersIdentifier/${nameValue}`);
        } else {
          return res
            .status(400)
            .json({ loggin: "იდენთიფიკატორი ან პაროლი არასწორია" });
        }
      } catch (err) {
        console.error(err);
        res.status(400).json({ error: "სერვერზე მოხდა შეცდომა " });
      }
    }

    const existingUser = await user.findOne(
      { email } || { identifier } || { phone }
    );

    if (existingUser) {
      let errorInfo = "";

      if (existingUser.email == email) {
        errorInfo = "ამ მეილით, მომხმარებელი უკვე არსებობს";
      }

      if (existingUser.identifier == identifier) {
        errorInfo = "იდენტიფიკატორი, მიუღებელია";
      }

      if (existingUser.phone == phone) {
        errorInfo = "ამ ნომრით, მომხმარებელი უკვე არსებობს";
      }

      return res.status(400).json({ error: ` ${errorInfo} ` });
    } else {
      const newUser = new user({
        email,
        password,
        confirm,
        identifier,
        prefix,
        phone,
        agreement,
      });
      await newUser.save();
      res.status(201).json({ message: "რეგისტრაცია წარმატებულია" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "სერვერზე მოხდა შეცდომა ", details: err.message });
  }
});

export default registerRouter;
