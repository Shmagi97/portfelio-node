import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(cors());
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, this is the home page!");
});

const mongoURI =
  "mongodb+srv://firstMongoDb:narsa1997@cluster0.cgkga1s.mongodb.net?retryWrites=true&w=majority";
// Connect to MongoDB in cluster0
mongoose
  .connect(mongoURI)
  .then(() => console.log("conect mongoDB"))
  .catch((err) => console.error(err));

// Connect to MongoDB in cluster0 in databeiz Users

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
  nickname: {
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

app.post("/register", async (req, res) => {
  const { email, password, confirm, nickname, prefix, phone, agreement } =
    req.body;
  // console.log("Received data:", req.body);
  // console.log("Received data:", register.nickname);

  //  validation
  // if (
  //   !register.email ||
  //   !register.password ||
  //   !register.confirm ||
  //   !register.nickname ||
  //   !register.prefix ||
  //   !register.phone
  // ) {
  //   return res.status(400).json({ error: "Please fill in all fields" });
  // }

  try {
    const existingUser = await user.findOne(
      { email } || { nickname } || { phone }
    );

    // ar aris dasrulebuli problemaa tanmimdevroba validaciis gasworebis

    if (existingUser) {
      let errorInfo = "";

      if (existingUser.email == email) {
        errorInfo = "მეილით, ";
      }

      if (existingUser.nickname == nickname) {
        errorInfo = "სახელით, ";
      }

      if (existingUser.phone == phone) {
        errorInfo = "ნომრით, ";
      }

      errorInfo = errorInfo.slice(0, -2);
      return res
        .status(400)
        .json({ error: `ამ ${errorInfo} მომხმარებელი უკვე არსებობს` });
    } else {
      const newUser = new user({
        email,
        password,
        confirm,
        nickname,
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

// const findEdUser = "nikala10";

// try {
//   const findUser = await user.findOne({ register });

//   if (findUser) {
//     console.log("find user", findUser);
//   } else {
//     console.log("user notFound");
//   }
// } catch (err) {
//   console.error(err);
// }

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running  http://localhost:${port}`));
