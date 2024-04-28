import app from "./app.js";
import dotenv from "dotenv";
dotenv.config("./.ennv");
import { connectDb } from "./Database/index.js";
import { server } from "./socket/socket.js";
import path from "path";

const PORT = process.env.PORT || 5000;

connectDb()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running om Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed !!!", err);
  });
