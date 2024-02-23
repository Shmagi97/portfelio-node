import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(" this is register  page");
});

const dbUsers = mongoose.connection.useDb("Users");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  confirm: {
    type: String,
  },
  identifier: {
    type: String,
  },
  prefix: {
    type: String,
  },
  phone: {
    type: String,
  },
  agreement: {
    type: Boolean,
  },
});
const user = dbUsers.model("user", userSchema, "users-register");

router.post("/", async (req, res) => {
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
          return res.status(201).json({ loggin: "წარმატებული შესვლა" });
        } else {
          return res.status(400).json({ loggin: "სახელი ან პაროლი არასწორია" });
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

export default router;
