import { z } from "zod";

export const jobSchema = z.object({
  title: z.string().min(1, { message: "Job title is required" }).trim(),
  description: z.string().min(1, { message: "Job description is required" }),
  company: z.string().min(1, { message: "Company name is required" }),
  companyLogo: z
    .object({
      publicId: z.string({ required_error: "Image is required." }),
      secureUrl: z.string({ required_error: "Secure URL is required." }),
    })
    .optional(),
  location: z.string().min(1, { message: "Job location is required" }),
  jobType: z.enum(["On-site", "Hybrid", "Remote"], {
    errorMap: () => ({
      message: "Job type must be On-site, Hybrid, or Remote",
    }),
  }),
  category: z.enum(
    [
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
    {
      errorMap: () => ({
        message: "Job category must be one of the predefined values",
      }),
    }
  ),
  applicationDeadline: z
    .string()
    .min(1, { message: "Application deadline is required" }),
  vacancies: z
    .string()
    .min(1, { message: "Vacancies must be at least 1" })
    .default("1"),
});

export type TJobSchema = z.infer<typeof jobSchema>;

export enum EJobType {
  "On-site",
  "Hybrid",
  "Remote",
}
export enum EJobCategory {
  "marketing",
  "customer-service",
  "human-resource",
  "project-management",
  "business-development",
  "sales&communication",
  "teaching&education",
  "design&creative",
  "information&technology",
}
