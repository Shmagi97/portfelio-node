// import http from "http";
// import { app, port } from "./app.js";

// const server = http.createServer((req, res) => {
//   //   res.statusCode = 200;
//   //   res.end("node page");
//   app(req, res);
// });

// server.listen(port, () => {
//   console.log(`server running at http://localhost:${port}`);
// });

import http from "http";
import { app, port } from "./app.js";

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
