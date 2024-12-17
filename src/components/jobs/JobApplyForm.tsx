"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { Upload } from "lucide-react";
import {
  jobApplicationSchema,
  JobApplicationSchema,
} from "@/schema/jobApplication.schema";
import CloudinaryUpload from "@/cloudinary/CloudinaryUpload";
import { addApplicant } from "@/server/actions/jobs/jobs.action";
import { useParams, usePathname } from "next/navigation";
import toast from "react-hot-toast";

export default function JobApplyForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<JobApplicationSchema>({
    resolver: zodResolver(jobApplicationSchema),
  });

  async function onSubmit(data: JobApplicationSchema) {
    setIsSubmitting(true);
    const folder = "jobs";

    try {
      const { public_id, secure_url } = await CloudinaryUpload({
        image,
        folder,
      });
      const resumeData = {
        secureUrl: secure_url,
        publicId: public_id,
      };

      // Here you would typically send the data to your backend
      const applicantData = {
        ...data,
        jobId: id,
      };

      // Simulate API call
      const res = await addApplicant(applicantData, resumeData);

      if (res.success) {
        toast.success("You application was submitted successfully!");
      }
      //   alert("Application submitted successfully!");
      reset();
    } catch (error) {
      console.error(error);
      toast.success("You application was unable to submit!");
      //   alert("Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div>
      <section className=" mt-10 max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">Apply For The Job</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="fullname"
              placeholder="John Doe"
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="text-xs text-red-500">{errors.fullName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="portfolio">Portfolio Website (Optional)</Label>
            <Input
              id="portfolio"
              placeholder="https://your-portfolio.com"
              {...register("portfolio")}
            />
            {errors.portfolio && (
              <p className="text-xs text-red-500">{errors.portfolio.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="resume">Resume</Label>
            <div className="flex items-center gap-4">
              <Input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                {...register("resume")}
                onChange={(e) => {
                  if (e.target.files) {
                    setImage(e.target.files[0]);
                    // const imageUrl = URL.createObjectURL(e.target.files[0]);
                    // setImgUrl(imageUrl);
                  }
                }}
              />
              <Upload className="h-5 w-5 text-gray-400" />
            </div>
            {errors.resume && (
              <p className="text-xs text-red-500">{errors.resume.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverLetter">Cover Letter (Optional)</Label>
            <Textarea
              id="coverLetter"
              placeholder="Tell us why you're perfect for this role..."
              className="min-h-[150px]"
              {...register("coverLetter")}
            />
            {errors.coverLetter && (
              <p className="text-xs text-red-500">
                {errors.coverLetter.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-emerald-500 text-white hover:bg-emerald-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Apply Now"}
          </Button>
        </form>
      </section>
    </div>
  );
}
