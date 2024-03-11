import expres from "express";
import { userInfo } from "./userShema/userShema.js";
import path from "path";

const routerUserInfo = expres.Router();

routerUserInfo.get("/:userID", async (req, res) => {
  const userId = req.params.userID;

  try {
    const userData = await userInfo.findById(userId);
    if (!userData) {
      return res.status(404).json({ error: "User Not Found" });
    }

    res.status(200).json({ userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

const routerLoggin = expres.Router();

routerLoggin.get("/:identifier", async (req, res) => {
  const userIdentifier = req.params.identifier;

  try {
    const userDataIdentifier = await userInfo.findOne({
      identifier: userIdentifier,
    });
    if (!userDataIdentifier) {
      return res
        .status(201)
        .json({ error: "პერსონალური ინფორმაციის ვერ მოიძებნა" });
    }
    const userIdetifirED = userDataIdentifier._id;
    res.status(200).json({ userIdetifirED });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Eroor" });
  }
});

const usersImage = expres.Router();

usersImage.get("/:photousUID", async (req, res) => {
  const getPhotousUID = req.params.photousUID;
  console.log(getPhotousUID);
});

export { routerLoggin, routerUserInfo, usersImage };
