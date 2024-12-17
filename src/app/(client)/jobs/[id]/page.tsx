import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, GraduationCap } from "lucide-react";

import CustomBreadCrumb from "@/components/navigation/BreadCrumb";
import JobApplyForm from "@/components/jobs/JobApplyForm";
import connectDB from "@/server/utils/ConnectDB";
import Jobss from "@/server/models/job";
import { dateFormatter } from "@/lib/dateFormatter";
import Image from "next/image";

export const revalidate = 3600; // Revalidate every hour (for ISR)

export async function generateStaticParams() {
  await connectDB();
  const jobs = await Jobss.find({}, "_id");

  return jobs.map((job) => ({
    id: job._id.toString(),
  }));
}

export default async function page({ params }: { params: { id: string } }) {
  const { id } = params;

  await connectDB();

  const singleJob = await Jobss.findById(id);

  if (!singleJob) {
    return <></>;
  }
  const {
    title,
    company,
    companyLogo,
    description,
    category,
    jobType,
    applicationDeadline,
    location,
    vacancies,
    postedDate,
  } = singleJob;

  return (
    <div className="">
      <CustomBreadCrumb
        title="job detail"
        subRoot1="jobs"
        subRoot2="job detail"
      />
      <section className="xl:container px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* JOB BASIC DETAILS LOCATION,TIME,SALARY */}
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-lg bg-emerald-100 p-2">
                <Image
                  alt={company}
                  src={companyLogo.secureUrl}
                  height={100}
                  width={100}
                  className=" rounded-md"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{title}</h1>
                <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {jobType}
                  </span>
                  <span className="flex items-center gap-1">
                    <GraduationCap className="h-4 w-4" />
                    {category}
                  </span>
                </div>
              </div>
            </div>

            {/* FULL DESCRIPTION OF JOB */}
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-4">Job Description</h2>

                <p dangerouslySetInnerHTML={{ __html: description }}></p>
              </section>

              {/* FORM SUBMISSION SECTION */}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Published On:</span>
                  <span>{dateFormatter(postedDate)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Vacancy:</span>
                  <span>{vacancies}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Job Nature:</span>
                  <span>{jobType}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Category:</span>
                  <span>{category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Location:</span>
                  <span>{location}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Date Line:</span>
                  <span>{dateFormatter(applicationDeadline)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Company Detail</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Ipsum dolor ipsum accusam stet et et diam dolores, sed rebum
                  sadipscing elitr vero dolores. Lorem dolore elitr justo et no
                  gubergren sadipscing, ipsum et takimata aliquyam et rebum est
                  ipsum lorem diam.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FORM SUBMISSION */}
        <div>
          <JobApplyForm />
        </div>
      </section>
    </div>
  );
}
