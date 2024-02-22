import express, { json } from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(" this is registerUserInfo  page ");
});

const dbRegisterUserInfo = mongoose.connection.useDb("Users");

// const photoSchema = new mongoose.Schema({
//   uid: String,
//   lastModified: Number,
//   lastModifiedDate: Date,
//   name: String,
//   size: Number,
//   type: String,
//   percent: Number,
//   originFileObj: {
//     uid: String,
//   },
//   status: String,
// });

const userSchema = new mongoose.Schema({
  nameAndSurname: {
    type: String,
  },
  radioInfo: {
    type: String,
  },

  address: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  CompanyExperienceDuration: {
    type: [Date],
  },
  education: {
    type: String,
  },
  experience: {
    type: String,
  },
  workingValueChange: {
    type: Boolean,
  },
  newUploadPhoto: [
    {
      uid: { String },
      lastModified: { Number },
      lastModifiedDate: { Date },
      name: { String },
      size: { Number },
      type: { String },
      percent: { Number },
      originFileObj: {
        uid: { String },
      },
      status: { String },
    },
  ],

  sliderSkills: [
    {
      name: { String },
      value: { Number },
    },
  ],
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

  // vinaidan monacemta bazashi shevinaxe foto exl gasatestia am fotos wamogeba da frontze gamotana

  try {
    if (uploadPhoto !== undefined) {
      var newUploadPhoto = uploadPhoto.map((el) => {
        const { xhr, thumbUrl, response, ...reset } = el;
        return reset;
      });
    }

    const newUser = new user({
      radioinfo,
      nameAndSurname,
      address,
      dateOfBirth,
      CompanyExperienceDuration,
      education,
      experience,
      workingValueChange,
      newUploadPhoto,
      sliderSkills,
      linkFacebook,
      linkGithub,
      linkLinkedln,
    });
    await newUser
      .save()
      .then((saved) => {
        console.log("saved items mongoDB", saved);
      })
      .catch((err) => {
        console.log("saved items failed", err);
      });

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
