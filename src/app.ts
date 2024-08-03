import express from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import { notfound } from "./app/middlewares/notfound";

const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Server is connecting");
});

app.use("/api", router);
app.use(globalErrorHandler);
app.use(notfound);

export default app;
