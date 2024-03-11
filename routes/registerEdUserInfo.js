import express, { json } from "express";
import { userInfo } from "../userShema/userShema.js";

const routerRegisterUserInfoRouter = express.Router();

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
      console.log(newUploadPhoto);
    }

    if (radioinfo === "employable") {
      const newUser = new userInfo({
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
          // res.redirect(`/users/${saved._id}`);
          res.status(201).json({ nameAndSurname });
        })
        .catch((err) => {
          console.log("saved employable failed", err);
        });
    } else {
      const newUser = new userInfo({
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
          // res.redirect(`/users/${saved._id}`);
          res.status(201).json({ nameAndSurname });
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
