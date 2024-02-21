import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.json({ limit: "100000mb" }));
app.use(express.urlencoded({ extended: true, limit: "100000mb" }));

app.get("/", (req, res) => {
  res.send("Hello, this is the home page!");
});

const mongoURI =
  "mongodb+srv://firstMongoDb:narsa1997@cluster0.cgkga1s.mongodb.net?retryWrites=true&w=majority";
mongoose
  .connect(mongoURI)
  .then(() => console.log("conect mongoDB"))
  .catch((err) => console.error(err));

app.use("/", router);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running  http://localhost:${port}`));
