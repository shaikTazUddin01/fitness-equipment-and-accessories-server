import express from "express";
import router from "./app/routes";

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Server is connecting");
});

app.use("/api", router);

export default app;
