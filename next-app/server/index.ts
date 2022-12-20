import express, { Request, Response } from "express";
import next from "next";
const { createServer } = require("http");
const { bodyParser } = require("body-parser");
const userRouter = require("./userRouter");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || "3000";

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use("/user", userRouter);
  server.all("*", (req: Request, res: Response) => {
    return handle(req, res);
  });
  server.listen(port, (err?: any) => {
    if (err) throw err;
    console.log(
      `> Ready on http://localhost:${port} - env ${process.env.NODE_ENV}`
    );
  });
});
