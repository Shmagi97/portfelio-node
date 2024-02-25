import express, { json } from "express";
import mongoose from "mongoose";
import { userSchemaRegisterInfo } from "../userShema/userShema.js";

const routerRegisterUserInfoRouter = express.Router();

const dbRegisterUserInfo = mongoose.connection.useDb("Users");

const user = dbRegisterUserInfo.model(
  "user",
  userSchemaRegisterInfo,
  "registerEdUserInfo"
);

routerRegisterUserInfoRouter.post("/", async (req, res) => {
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
          res.redirect(`/users/${saved._id}`);
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
          res.redirect(`/users/${saved._id}`);
        })
        .catch((err) => {
          console.log("saved employer failed", err);
        });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "სერვერზე მოხდა შეცდომა", details: error.message });
  }
});

export default routerRegisterUserInfoRouter;
