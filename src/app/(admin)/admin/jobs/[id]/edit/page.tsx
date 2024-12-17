import { notFound } from "next/navigation";
import Link from "next/link";
import EditJobForm from "@/components/jobs/EditJobForm";
import Jobss from "@/server/models/job";
import connectDB from "@/server/utils/ConnectDB";

export const generateStaticParams = async () => {
  await connectDB();
  const jobs = await Jobss.find({}, "_id");
  return jobs.map((job) => ({
    id: job._id.toString(),
  }));
};

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditJobPage({ params }: PageProps) {
  await connectDB();
  const job = await Jobss.findById(params.id);

  if (!job) {
    notFound();
  }

  // Convert Mongoose document to plain object and serialize it
  const jobData = JSON.stringify(job);

  return (
    <section className="py-10">
      <EditJobForm job={jobData} />
    </section>
  );
}
