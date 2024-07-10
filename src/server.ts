import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";
const port = config.port;

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

main();
