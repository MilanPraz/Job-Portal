import * as z from "zod";

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const jobApplicationSchema = z.object({
  fullName: z
    .string({ required_error: "Name must be at least 2 characters" })
    .min(2, { message: "Name must be at least 2 characters" }),
  email: z
    .string({ required_error: "Email is required." })
    .email("Please enter a valid email address"),
  portfolio: z.string().optional(),
  resume: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, "Resume is required")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      "Max file size is 5MB"
    )
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      "Only .pdf, .doc and .docx formats are accepted"
    ),
  coverLetter: z
    .string({ required_error: "Cover Letter is required." })
    .min(50, "Cover letter must be at least 50 characters"),
});

export type JobApplicationSchema = z.infer<typeof jobApplicationSchema>;
