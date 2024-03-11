import mongoose from "mongoose";

const userSchemaRegister = new mongoose.Schema({
  email: {
    type: String,
  },
  hashedPasword: {
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

const dbUsers = mongoose.connection.useDb("Users");
const userRegister = dbUsers.model(
  "user",
  userSchemaRegister,
  "users-register"
);

const userSchemaRegisterInfo = new mongoose.Schema({
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

  newUploadPhoto: [{ type: Object }],

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

const dbRegisterUserInfo = mongoose.connection.useDb("Users");

const userInfo = dbRegisterUserInfo.model(
  "user",
  userSchemaRegisterInfo,
  "registerEdUserInfo"
);

export { userRegister, userInfo };
