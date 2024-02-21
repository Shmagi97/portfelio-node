import express, { json } from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(" this is registerUserInfo  page ");
});

const dbRegisterUserInfo = mongoose.connection.useDb("Users");

const photoSchema = new mongoose.Schema({
  filename: String,
});

const userSchema = new mongoose.Schema({
  radioInfo: {
    type: String,
  },
  nameAndSurname: {
    String,
  },
  address: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  CompanyExperienceDuration: {
    type: Date,
  },
  education: {
    type: String,
  },
  experience: {
    type: String,
  },
  //   uploadPhoto: [photoSchema],

  //   sliderSkills: [
  //     {
  //       name: { String },
  //       value: { Number },
  //     },
  //   ],
  linkFacebook: {
    type: String,
    validate: {
      validator: function (value) {
        try {
          new URL(value);
          return true;
        } catch (error) {
          return false;
        }
      },

      message: "Invalid URL Format",
    },
  },

  linkGithub: {
    type: String,
    validate: {
      validator: function (value) {
        try {
          new URL(value);
          return true;
        } catch (error) {
          return false;
        }
      },

      message: "Invalid URL Format",
    },
  },

  linkLinkedln: {
    type: String,
    validate: {
      validator: function (value) {
        try {
          new URL(value);
          return true;
        } catch (error) {
          return false;
        }
      },

      message: "Invalid URL Format",
    },
  },
});

const user = dbRegisterUserInfo.model("user", userSchema, "registerEdUserInfo");

router.post("/", async (req, res) => {
  const {
    radioinfo,
    nameAndSurname,
    address,
    dateOfBirth,
    CompanyExperienceDuration,
    education,
    experience,
    workingValueChange,
    uploadPhoto,

    sliderSkills,
    linkFacebook,
    linkGithub,
    linkLinkedln,
  } = req.body;

  //   console.log(req.body.nameAndSurname);

  try {
    const newUser = new user({
      nameAndSurname,
    });
    await newUser.save();
    res.status(200);
    json({ message: "მონაცემები აიტვირთა წარმატებით" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "სერვერზე მოხდა შეცდომა", details: error.message });
  }
});

export default router;
