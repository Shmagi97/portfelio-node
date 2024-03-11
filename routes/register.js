import express from "express";
import bcrypt from "bcrypt";
import { userRegister } from "../userShema/userShema.js";

const registerRouter = express.Router();

registerRouter.get("/", (req, res) => {
  res.send(" this is register  page");
});

const saltRounds = 12;
const salt = bcrypt.genSaltSync(saltRounds);

registerRouter.post("/", async (req, res) => {
  const { email, password, identifier, prefix, phone, agreement } = req.body;

  try {
    const existingUser = await userRegister.findOne(
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
      const hashedPasword = bcrypt.hashSync(password, salt);

      const newUser = new userRegister({
        email,
        hashedPasword,
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
