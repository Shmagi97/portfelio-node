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
const user = dbUsers.model(
  "user",
  new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  }),
  "users-register"
);

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  console.log("Received data:", req.body);
  console.log("Received data:", username, email, password);

  //  validation
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Please fill in all fields" });
  }

  try {
    const existingUser = await user.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const newUser = new user({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: "Registration successful!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const findEdUser = "nikala10";

try {
  const findUser = await user.findOne({ username: findEdUser });

  if (findUser) {
    console.log("find user", findUser);
  } else {
    console.log("user notFound");
  }
} catch (err) {
  console.error(err);
}

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running  http://localhost:${port}`));
