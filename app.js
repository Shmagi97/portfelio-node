import express from "express";

const app = express();
const port = 3001;

app.get("/register", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Express HTML Example</title>
      </head>
      <body>
        <h1>Hello, Express!</h1>
      </body>
    </html>
  `);
});

export { app, port };
