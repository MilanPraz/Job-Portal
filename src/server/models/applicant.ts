import { model, models, Schema } from "mongoose";

const applicantSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    portfolio: {
      type: String,
    },
    resume: {
      publicId: { type: String }, // Optional file upload (resume)
      secureUrl: { type: String },
    },
    coverLetter: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent model overwrite error by checking if it already exists
const Applicant = models.Applicant || model("Applicant", applicantSchema);

export default Applicant;
