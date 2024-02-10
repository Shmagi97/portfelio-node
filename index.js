import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON body

app.get("/", (req, res) => {
  res.send("Hello, this is the home page!");
});

app.post("/register", async (req, res) => {
  console.log("Received data:", req.body);
  const { userName, email, password } = req.body;

  // Perform validation and data processing here (replace with your logic)
  console.log("Received data:", userName, email, password);

  // Interact with database or perform further actions

  res.status(201).json({ message: "Registration successful!" }); // Replace with appropriate response
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running  http://localhost:${port}`));

// import http from "http";

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.end("node pag");
// });

// const port = 3001;

// server.listen(port, () => {
//   console.log(`server running at http://localhost:${port}`);
// });
