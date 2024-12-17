import ExploreByCategories from "@/components/ui/home/ExploreByCategory";
import Hero from "@/components/ui/home/Hero";
import JobListings from "@/components/ui/home/JobList";
import WhatWeProvide from "@/components/ui/home/WhatWeProvide";
import Jobss from "@/server/models/job";
import connectDB from "@/server/utils/ConnectDB";

export default async function Home() {
  await connectDB();
  const jobs = await Jobss.find().sort({ createdAt: -1 });

  return (
    <div className="">
      <Hero />
      <div className="xl:container px-4">
        <ExploreByCategories />
        <WhatWeProvide />
        {jobs.length > 0 && <JobListings jobs={JSON.stringify(jobs)} />}
      </div>
    </div>
  );
}
