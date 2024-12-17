"use client";
import CustomBreadCrumb from "@/components/navigation/BreadCrumb";
import React, { useState, useMemo, useEffect } from "react";
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
  Users2Icon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useJobContext } from "@/context/JobContext";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import { TJob } from "@/app/types/job.types";

const jobTypes = ["On-site", "Hybrid", "Remote"] as const;
type JobType = (typeof jobTypes)[number];

export interface Job {
  id: number;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: JobType;
  salary: string;
  deadline: string;
}

const ITEMS_PER_PAGE = 5;

export default function AllJobs({
  jobs,
  initialCategory,
}: {
  jobs: any;
  initialCategory?: string;
}) {
  const [activeTab, setActiveTab] = useState<JobType>("On-site");
  const { toggleFavorite, favorites, selectedCategory, setSelectedCategory } =
    useJobContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const jobsObjects = JSON.parse(jobs);

  const filteredJobs = useMemo(() => {
    return jobsObjects.filter(
      (job: TJob) =>
        (selectedCategory ? job.category === selectedCategory : true) &&
        job.jobType === activeTab
    );
  }, [jobs, activeTab, selectedCategory]);

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);

  const currentJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredJobs.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredJobs, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, activeTab]);

  return (
    <div className=" ">
      <CustomBreadCrumb title="job list" subRoot1="job list" />
      <section className="py-16 md:py-24 xl:container px-4">
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Filter by Category:</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => setSelectedCategory(null)}
              variant={selectedCategory === null ? "default" : "outline"}
            >
              All
            </Button>
            {[
              "marketing",
              "customer-service",
              "human-resource",
              "project-management",
              "business-development",
              "sales&communication",
              "teaching&education",
              "design&creative",
              "information&technology",
            ].map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
              >
                {category
                  .replace(/&/g, " & ")
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </Button>
            ))}
          </div>
        </div>
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
              onValueChange={(value) => {
                setActiveTab(value as JobType);
                //it has to be 1 when new tab is clicked so that it starts from initial page
                setCurrentPage(1);
              }}
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
                    {currentJobs.map((job: TJob, index: number) => (
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
                                  <span className="flex  gap-1">
                                    <MapPin className="h-4 w-4" />
                                    {job.location}
                                  </span>
                                  <span className="flex  gap-1">
                                    <Clock className="h-4 w-4" />
                                    {job.jobType}
                                  </span>
                                  <span className="flex gap-1">
                                    <Users2Icon className="h-4 w-4" />
                                    {job.vacancies}
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
                      </motion.div>
                    ))}
                    {currentJobs.length <= 0 && (
                      <div className="text-center text-red-400 my-20">
                        No such job found!
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            {/* Pagination */}
            {currentJobs.length > 0 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={() =>
                        handlePageChange(Math.max(1, currentPage - 1))
                      }
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        href="#"
                        onClick={() => handlePageChange(i + 1)}
                        isActive={currentPage === i + 1}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={() =>
                        handlePageChange(Math.min(totalPages, currentPage + 1))
                      }
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
