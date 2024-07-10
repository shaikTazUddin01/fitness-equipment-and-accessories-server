import express from "express";
import cors from "cors";
import router from "./app/routes";

const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Server is connecting");
});

app.use("/api", router);

export default app;
