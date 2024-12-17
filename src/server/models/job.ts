"use server";
import { model, models, Schema } from "mongoose";

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
    },
    companyLogo: {
      publicId: { type: String },
      secureUrl: { type: String },
    },
    location: {
      type: String,
      required: [true, "Job location is required"],
    },
    jobType: {
      type: String,
      enum: ["On-site", "Hybrid", "Remote"],
      required: [true, "Job type is required"],
    },
    category: {
      type: String,
      enum: [
        "marketing",
        "customer-service",
        "human-resource",
        "project-management",
        "business-development",
        "sales&communication",
        "teaching&education",
        "design&creative",
        "information&technology",
      ],
      required: [true, "Job category is required"],
    },
    postedDate: {
      type: Date,
      default: Date.now,
    },
    applicationDeadline: {
      type: String,
      required: true,
    },
    vacancies: {
      type: String,
      default: 1,
    },
    applicants: [
      {
        type: Schema.Types.ObjectId,
        ref: "Applicant", // Refers to the Applicant model (update if your applicant model name is different)
      },
    ],
  },
  { timestamps: true }
);

// Prevent model overwrite error by checking if it already exists
const Jobss = models.Jobss || model("Jobss", jobSchema);

export default Jobss;
