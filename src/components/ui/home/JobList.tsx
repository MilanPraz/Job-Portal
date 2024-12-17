"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import {
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  Heart,
  GraduationCap,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { TJob } from "@/app/types/job.types";
import { useJobContext } from "@/context/JobContext";

const jobTypes = ["On-site", "Hybrid", "Remote"] as const;
type JobType = (typeof jobTypes)[number];

export default function JobListings({ jobs }: { jobs: any }) {
  const [activeTab, setActiveTab] = useState<JobType>("On-site");
  const { toggleFavorite, favorites } = useJobContext();

  const jobsObjects = JSON.parse(jobs);

  return (
    <section className="py-16 md:py-24">
      <div className=" ">
        <div className="flex flex-col items-center space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
          >
            Job Listing
          </motion.h2>

          <Tabs
            defaultValue="On-site"
            className="w-full"
            onValueChange={(value) => setActiveTab(value as JobType)}
          >
            <TabsList className="grid w-full grid-cols-3  h-16  px-3 max-w-xl mx-auto">
              {jobTypes.map((type) => (
                <TabsTrigger
                  key={type}
                  value={type}
                  className="data-[state=active]:bg-emerald-500 h-10 data-[state=active]:text-white"
                >
                  {type}
                </TabsTrigger>
              ))}
            </TabsList>

            {jobTypes.map((type, idx) => (
              <TabsContent key={idx} value={type} className="mt-6">
                <div className="space-y-4">
                  {jobsObjects &&
                    jobsObjects
                      // .filter((job: any) => job.jobType === type)
                      .slice(0, 5)
                      .map((job: TJob, index: number) => (
                        <motion.div
                          key={job._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                            <div className="relative z-10 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                                  <img
                                    src={job.companyLogo.secureUrl}
                                    alt={`${job.company} logo`}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div>
                                  <h3 className="text-xl font-semibold">
                                    {job.title}
                                  </h3>
                                  <p className="text-sm text-gray-500">
                                    {job.company}
                                  </p>
                                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                      <MapPin className="h-4 w-4" />
                                      {job.location}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Clock className="h-4 w-4" />
                                      {job.jobType}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <GraduationCap
                                        // size={30}
                                        className="h-4 w-4"
                                      />
                                      {job.category}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-center gap-4">
                                <div className="flex  items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => toggleFavorite(job._id)}
                                    className="hover:text-emerald-500"
                                  >
                                    <Heart
                                      className={`h-5 w-5 transition-colors ${
                                        favorites.has(job._id)
                                          ? "fill-emerald-500 text-emerald-500"
                                          : ""
                                      }`}
                                    />
                                  </Button>
                                  <Button
                                    asChild
                                    className="bg-emerald-500 text-white hover:bg-emerald-600"
                                  >
                                    <Link href={`/jobs/${job._id}`}>
                                      Apply Now
                                    </Link>
                                  </Button>
                                </div>
                                <span className="flex items-center text-xs text-gray-500">
                                  <Calendar className="mr-1 h-4 w-4" />
                                  Date Line:
                                  {job.applicationDeadline}
                                </span>
                              </div>
                            </div>
                          </Card>
                          {/* </Link> */}
                        </motion.div>
                      ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        <div className="grid place-items-center mt-10">
          <Button asChild>
            <Link href={"/jobs"}>Browser More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
