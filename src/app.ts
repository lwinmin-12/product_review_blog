import express, { NextFunction, Request, Response } from "express";
import config from "config";
import cors from "cors";
import fileUpload from "express-fileupload";
import userRoute from "./router/user.routes";
import roleRoute from "./router/role.routes";
import permitRoute from "./router/permit.routes";
import tagRoute from "./router/tag.routes";
import brandRoute from "./router/brand.routes";
import categoryRoute from "./router/category.routes";
import productRoute from "./router/product.routes";
import feedbackRoute from "./router/feedback.routes";
import dbConnect from "./utils/connect";

const app = express();
app.use(fileUpload());
app.use(cors({ origin: "*" }));

const server = require("http").createServer(app);

const port = config.get<number>("port");
const host = config.get<string>("host");

dbConnect()


app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("ok");
});

app.use("/api/user", userRoute);
app.use("/api/role", roleRoute);
app.use("/api/permit", permitRoute);

app.use("/api/tag", tagRoute);
app.use("/api/brand", brandRoute);
app.use("/api/category", categoryRoute);

app.use("/api/product", productRoute);
app.use("/api/feedback", feedbackRoute);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || 409;
  res.status(err.status).json({
    con: false,
    msg: err.message,
  });
});

server.listen(port, () =>
  console.log(`server is running in  http://${host}:${port}`)
);
