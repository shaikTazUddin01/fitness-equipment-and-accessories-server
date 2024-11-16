import express from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import { notfound } from "./app/middlewares/notfound";
import cookieParser  from 'cookie-parser'

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://epicfit.vercel.app",
    ],
    credentials: true,
  })
);
app.use(cookieParser())
app.get("/", (req, res) => {
  res.send("Server is connecting");
});

app.use("/api", router);
app.use(globalErrorHandler);
app.use(notfound);

export default app;
