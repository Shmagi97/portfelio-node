import express, { json } from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(" this is registerUserInfo  page ");
});

const dbRegisterUserInfo = mongoose.connection.useDb("Users");

const userSchema = new mongoose.Schema({
  identifier: {
    type: String,
  },
  nameAndSurname: {
    type: String,
  },
  radioinfo: {
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
  selectProfesionUser: [
    {
      selectedProfesion: [String],
    },
  ],
  companyName: {
    type: String,
  },
  CompanyActivity: {
    type: String,
  },
  CompanyLoans: {
    type: String,
  },
});

const user = dbRegisterUserInfo.model("user", userSchema, "registerEdUserInfo");

router.post("/", async (req, res) => {
  const {
    identifier,
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
    selectProfesionUser,
    companyName,
    CompanyActivity,
    CompanyLoans,
  } = req.body;

  try {
    if (uploadPhoto !== undefined) {
      var newUploadPhoto = uploadPhoto.map((el) => {
        const { xhr, thumbUrl, response, ...reset } = el;
        return reset;
      });
    }

    if (radioinfo === "employable") {
      const newUser = new user({
        identifier,
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
        selectProfesionUser,
      });

      await newUser
        .save()
        .then((saved) => {
          console.log("saved employable mongoDB", saved);
        })
        .catch((err) => {
          console.log("saved employable failed", err);
        });
    } else {
      const newUser = new user({
        identifier,
        radioinfo,
        nameAndSurname,
        address,
        dateOfBirth,
        CompanyExperienceDuration,
        newUploadPhoto,
        companyName,
        CompanyActivity,
        CompanyLoans,
      });

      await newUser
        .save()
        .then((saved) => {
          console.log("saved employer mongoDB", saved);
          res.redirect(`/registerEdUserInfo${saved._id}`);
          // redirect - ით გასატესტია
        })
        .catch((err) => {
          console.log("saved employer failed", err);
        });
    }

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
