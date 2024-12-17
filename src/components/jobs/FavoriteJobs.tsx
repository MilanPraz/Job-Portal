"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useJobContext } from "@/context/JobContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  Heart,
  Trash2,
  GraduationCap,
  Users2Icon,
} from "lucide-react";
import CustomBreadCrumb from "@/components/navigation/BreadCrumb";
import { TJob } from "@/app/types/job.types";

// Assuming we have access to the jobs data

export default function FavoritesJobs({ jobs }: { jobs: any }) {
  const { favorites, toggleFavorite } = useJobContext();

  const jobsArray = JSON.parse(jobs);
  const favoriteJobs = useMemo(() => {
    return jobsArray.filter((job: any) => favorites.has(job._id));
  }, [favorites]);

  return (
    <div className="">
      <CustomBreadCrumb title="Favorite Jobs" subRoot1="Favorite Jobs" />
      <section className="py-16 md:py-24 xl:container px-4">
        <div className="flex flex-col items-center space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-center"
          >
            Favorite Jobs
          </motion.h2>

          {favoriteJobs.length === 0 ? (
            <p className="text-center text-gray-500">
              You haven&apos;t added any jobs to your favorites yet.
              <br />
              <Link
                href="/jobs"
                className="mt-4 inline-block text-emerald-500 hover:underline text-sm sm:text-base"
              >
                Browse jobs
              </Link>
            </p>
          ) : (
            <div className="w-full space-y-4">
              {favoriteJobs.map((job: TJob, index: number) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative z-10 flex flex-col gap-4 p-4 sm:p-6 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start sm:items-center space-x-4">
                        <div className="relative h-12 w-12 sm:h-16 sm:w-16 overflow-hidden rounded-lg flex-shrink-0">
                          <img
                            src={
                              job.companyLogo ? job.companyLogo.secureUrl : ""
                            }
                            alt={`${job.company} logo`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-semibold">
                            {job.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500">
                            {job.company}
                          </p>
                          <div className="mt-2 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                              {job.jobType || job.type}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users2Icon className="h-3 w-3 sm:h-4 sm:w-4" />
                              {job.vacancies}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row sm:flex-col items-center justify-between sm:items-end gap-2 sm:gap-4 mt-4 sm:mt-0">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFavorite(job._id)}
                            className="text-red-500 hover:bg-red-100 hover:text-red-700 p-1 sm:p-2"
                          >
                            <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                          </Button>
                          <Link href={`/jobs/${job._id}`}>
                            <Button
                              size="sm"
                              className="bg-emerald-500 text-white hover:bg-emerald-600 text-xs sm:text-sm"
                            >
                              View Details
                            </Button>
                          </Link>
                        </div>
                        <span className="flex items-center text-xs text-gray-500">
                          <Calendar className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                          Date Line: {job.applicationDeadline || ""}
                        </span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
