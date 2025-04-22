import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const dbConnection = () => {
  mongoose.connect(process.env.DB_URL || "");
  mongoose.connection.on("connected", (err, res) => {
    console.log(`mongoDb is connected`); 
  });
  mongoose.connection.on("error", (err, res) => {
    console.log(`mongoDb connection error ${err}`);
  });
}
