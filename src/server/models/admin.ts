"use server";
import { model, models, Schema } from "mongoose";

const adminSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

// Prevent model overwrite error by checking if it already exists
const Admin = models.Admin || model("Admin", adminSchema);

export default Admin;
