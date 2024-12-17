import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOODB_CONNECT_URI ?? "");
    console.log("Connected to DB Successfully!");
  } catch (error) {
    console.log(error);
    throw new Error("Connection failed!");
  }
};

export default connectDB;
