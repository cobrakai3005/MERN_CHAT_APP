import mongoose from "mongoose";
import { DB_Name } from "../constant.js";

export const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_Name}`
    );
    console.log(
      "Mongodb connection established",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.log("Error: In Mongodb connection", error);
  }
};
