"use server";
import { jobSchema } from "@/schema/jobss.schema";
import Applicant from "@/server/models/applicant";
import Jobss from "@/server/models/job";
import connectDB from "@/server/utils/ConnectDB";
import { revalidatePath } from "next/cache";

// ADD JOB
export const addJobs = async (data: any, logoData: any) => {
  if (!logoData) {
    return { success: false, message: "Company logo is required!" };
  }

  const parsedData = jobSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      message: "Invalid data provided!",
      errors: parsedData.error.errors,
    };
  }

  const {
    title,
    description,
    company,
    location,
    jobType,
    category,
    applicationDeadline,
    vacancies,
  } = parsedData.data;

  try {
    await connectDB();

    const { secureUrl, publicId } = logoData;

    const newJob = new Jobss({
      title,
      description,
      company,
      companyLogo: { secureUrl, publicId },
      location,
      jobType,
      category,
      applicationDeadline,
      vacancies,
    });

    await newJob.save();

    // Revalidate relevant paths
    revalidatePath("/admin/jobs");
    revalidatePath("/jobs");

    return {
      success: true,
      message: "New job has been added successfully!",
    };
  } catch (err) {
    console.error("Error adding job:", err);
    return {
      success: false,
      message: "Couldn't add job. Please contact the relevant party.",
    };
  }
};

//DELETE JOB
export const deleteJob = async (jobId: string) => {
  try {
    await connectDB();

    // Check if the job exists
    const job = await Jobss.findById(jobId);
    if (!job) {
      return { success: false, message: "Job not found!" };
    }

    // Delete the job
    await Jobss.findByIdAndDelete(jobId);

    // Revalidate relevant paths
    revalidatePath("/admin/jobs");
    revalidatePath("/jobs");

    return { success: true, message: "Job has been deleted successfully!" };
  } catch (err) {
    console.error("Error deleting job:", err);
    return {
      success: false,
      message: "Couldn't delete job. Please contact the relevant party.",
    };
  }
};

//UPDATE Job
export const updateJob = async (
  jobId: string,
  updatedData: any,
  logoData?: any
) => {
  const parsedData = jobSchema.safeParse(updatedData);

  if (!parsedData.success) {
    return {
      success: false,
      message: "Invalid data provided!",
      errors: parsedData.error.errors,
    };
  }

  const {
    title,
    description,
    company,
    location,
    jobType,
    category,
    applicationDeadline,
    vacancies,
  } = parsedData.data;

  try {
    await connectDB();

    // Check if the job exists
    const job = await Jobss.findById(jobId);
    if (!job) {
      return { success: false, message: "Job not found!" };
    }

    // Prepare updated fields
    const updateFields: any = {
      title,
      description,
      company,
      location,
      jobType,
      category,
      applicationDeadline,
      vacancies,
    };

    // If a new logo is provided, update it
    if (logoData) {
      const { secureUrl, publicId } = logoData;
      updateFields.companyLogo = { secureUrl, publicId };
    }

    // Update the job
    await Jobss.findByIdAndUpdate(jobId, updateFields, { new: true });

    // Revalidate relevant paths
    revalidatePath("/admin/jobs");
    revalidatePath("/jobs");

    return { success: true, message: "Job has been updated successfully!" };
  } catch (err) {
    console.error("Error updating job:", err);
    return {
      success: false,
      message: "Couldn't update job. Please contact the relevant party.",
    };
  }
};

//add applicant
export const addApplicant = async (data: any, resumeData: any) => {
  const { fullName, email, coverLetter, portfolio, jobId } = data;

  if (!jobId) {
    return { success: false, message: "Job ID is required to apply." };
  }

  try {
    await connectDB();

    // Validate that the job exists
    const job = await Jobss.findById(jobId);
    if (!job) {
      return { success: false, message: "Job not found!" };
    }

    // Create the applicant
    const newApplicant = new Applicant({
      fullName,
      email,
      coverLetter,
      portfolio,
      resume: resumeData
        ? { publicId: resumeData.publicId, secureUrl: resumeData.secureUrl }
        : undefined,
    });

    // Save the applicant in the DB
    const savedApplicant = await newApplicant.save();
    // Add applicant reference to the job's applicants array
    job.applicants.push(savedApplicant._id);
    await job.save();

    return {
      success: true,
      message: "Application submitted successfully!",
    };
  } catch (err) {
    console.error("Error adding applicant:", err);

    return {
      success: false,
      message: "Couldn't apply for the job. Please try again.",
    };
  }
};

export const deleteApplicant = async (applicantId: string) => {
  if (!applicantId) {
    return {
      success: false,
      message: "Applicant ID is required.",
    };
  }

  try {
    // Connect to the database
    await connectDB();

    // Find the job that contains the applicant in its 'applicants' array
    const job = await Jobss.findOne({ applicants: applicantId });

    if (!job) {
      return {
        success: false,
        message: "Job containing the applicant not found!",
      };
    }

    // const jobId = job._id;

    // Remove the applicant's reference from the job's 'applicants' array
    job.applicants = job.applicants.filter(
      (id: any) => id.toString() !== applicantId.toString()
    );
    await job.save();

    // Validate that the applicant exists
    const applicant = await Applicant.findById(applicantId);
    if (!applicant) {
      return { success: false, message: "Applicant not found!" };
    }

    // Delete the applicant from the database
    await Applicant.findByIdAndDelete(applicantId);

    revalidatePath("/admin/applicants");
    //  revalidatePath("/jobs");
    return {
      success: true,
      message: "Applicant has been deleted successfully!",
    };
  } catch (err) {
    console.error("Error deleting applicant:", err);
    return {
      success: false,
      message: "Couldn't delete the applicant. Please try again.",
    };
  }
};
