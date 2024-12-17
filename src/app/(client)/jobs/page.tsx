import Jobss from "@/server/models/job";
import connectDB from "@/server/utils/ConnectDB";
import React from "react";

import dynamic from "next/dynamic";

const AllJobs = dynamic(() => import("@/components/jobs/AllJobs"), {
  ssr: false,
});
// import AllJobs from "@/components/jobs/AllJobs";
export const revalidate = 3600; //revalidate every hour

export default async function page() {
  await connectDB();
  const jobs = await Jobss.find().sort({ createdAt: -1 });
  if (jobs.length < 0) {
    return (
      <div className="flex h-screen items-center justify-center text-center">
        No jobs for today
      </div>
    );
  } else {
    return <AllJobs jobs={JSON.stringify(jobs)} />;
  }
}
