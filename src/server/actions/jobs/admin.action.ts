"use server";
import { z } from "zod";
// import { adminSchema } from "@/schema/admin.schema"; // Assuming you store your schema in a schema folder
import Admin from "@/server/models/admin"; // Admin model
import connectDB from "@/server/utils/ConnectDB"; // Database connection
import bcrypt from "bcryptjs"; // To hash the password
import { adminSchema } from "./adminSchema";

export const createAdmin = async (data: any) => {
  const parsedData = adminSchema.safeParse(data);

  // Validate the input data with Zod
  if (!parsedData.success) {
    return {
      success: false,
      message: "Invalid data provided!",
      errors: parsedData.error.errors,
    };
  }

  const { email, password } = parsedData.data;

  try {
    await connectDB();

    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return {
        success: false,
        message: "Admin with this email already exists!",
      };
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin record
    const newAdmin = new Admin({
      email,
      password: hashedPassword,
    });

    // Save the new admin to the database
    await newAdmin.save();

    return {
      success: true,
      message: "New admin has been created successfully!",
    };
  } catch (err) {
    console.error("Error creating admin:", err);
    return {
      success: false,
      message: "Couldn't create admin. Please contact the relevant party.",
    };
  }
};
