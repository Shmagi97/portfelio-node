import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// Replace with your MongoDB connection string
const mongoURI =
  "mongodb+srv://firstMongoDb:narsa1997@cluster0.cgkga1s.mongodb.net/?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Define User schema
const userSchema = new mongoose.Schema({
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
});

const User = mongoose.model("User", userSchema);

const app = express();
app.use(cors());
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, this is the home page!");
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  console.log("Received data:", req.body);
  console.log("Received data:", username, email, password);

  // Basic validation (replace with more thorough checks)
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Please fill in all fields" });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: "Registration successful!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running  http://localhost:${port}`));

// const app = express();
// app.use(cors());
// app.use(express.json()); // Middleware to parse JSON body

// app.get("/", (req, res) => {
//   res.send("Hello, this is the home page!");
// });

// app.post("/register", async (req, res) => {
//   console.log("Received data:", req.body);
//   const { username, email, password } = req.body;

//   // Perform validation and data processing here (replace with your logic)
//   console.log("Received data:", username, email, password);

//   // Interact with database or perform further actions

//   res.status(201).json({ message: "Registration successful!" }); // Replace with appropriate response
// });

// const port = process.env.PORT || 4000;
// app.listen(port, () => console.log(`Server running  http://localhost:${port}`));
