"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { jobSchema, TJobSchema } from "@/schema/jobss.schema";
import { addJobs } from "@/server/actions/jobs/jobs.action";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";
import CloudinaryUpload from "@/cloudinary/CloudinaryUpload";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const Select = dynamic(
  () => import("@/components/ui/select").then((mod) => mod.Select),
  { ssr: false }
);
const SelectContent = dynamic(
  () => import("@/components/ui/select").then((mod) => mod.SelectContent),
  { ssr: false }
);
const SelectItem = dynamic(
  () => import("@/components/ui/select").then((mod) => mod.SelectItem),
  { ssr: false }
);
const SelectTrigger = dynamic(
  () => import("@/components/ui/select").then((mod) => mod.SelectTrigger),
  { ssr: false }
);
const SelectValue = dynamic(
  () => import("@/components/ui/select").then((mod) => mod.SelectValue),
  { ssr: false }
);

const Page = () => {
  const [body, setBody] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleImage = () => {
    inputRef.current?.click();
  };

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TJobSchema>({ resolver: zodResolver(jobSchema) });

  useEffect(() => {
    setValue("description", body);
    if (body.length > 0) {
      trigger("description");
    }
  }, [body, setValue, trigger]);

  const onSubmit = async (data: TJobSchema) => {
    if (!image) {
      toast.error("Please upload a company logo");
      return;
    }

    const folder = "jobs";
    const { public_id, secure_url } = await CloudinaryUpload({ image, folder });

    const imgData = {
      secureUrl: secure_url,
      publicId: public_id,
    };

    const res = await addJobs(data, imgData);

    if (res.success) {
      toast.success("Job is created!");
    } else {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      <div className="relative py-8">
        <Image
          src={imgUrl || "/placeholder.webp"}
          alt="Job Image"
          height={300}
          width={300}
        />
        {!image && (
          <Button
            onClick={handleImage}
            className="mt-4 flex items-center justify-center gap-4"
          >
            <PlusCircle size={20} /> Add Company Logo
          </Button>
        )}
        <input
          onChange={(e) => {
            if (e.target.files) {
              setImage(e.target.files[0]);
              const imageUrl = URL.createObjectURL(e.target.files[0]);
              setImgUrl(imageUrl);
            }
          }}
          ref={inputRef}
          hidden
          type="file"
        />
        <p className="text-xs text-red-500">
          {errors.companyLogo && errors.companyLogo.message}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl space-y-4">
        <div>
          <Label htmlFor="title">Job Title</Label>
          <Input
            {...register("title")}
            id="title"
            placeholder="Job Title"
            className="mb-2"
          />
          <p className="text-xs text-red-500">
            {errors.title && errors.title.message}
          </p>
        </div>

        <div>
          <Label htmlFor="company">Company Name</Label>
          <Input
            {...register("company")}
            id="company"
            placeholder="Company Name"
            className="mb-2"
          />
          <p className="text-xs text-red-500">
            {errors.company && errors.company.message}
          </p>
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            {...register("location")}
            id="location"
            placeholder="Location"
            className="mb-2"
          />
          <p className="text-xs text-red-500">
            {errors.location && errors.location.message}
          </p>
        </div>

        <div>
          <Label htmlFor="jobType">Job Type</Label>
          <Select
            {...register("jobType")}
            onValueChange={(val) => {
              if (val) {
                setValue("jobType", val as "On-site" | "Hybrid" | "Remote");
                trigger("jobType");
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="On-site">On-site</SelectItem>
              <SelectItem value="Hybrid">Hybrid</SelectItem>
              <SelectItem value="Remote">Remote</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-red-500">
            {errors.jobType && errors.jobType.message}
          </p>
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            {...register("category")}
            onValueChange={(val) => {
              if (val) {
                setValue(
                  "category",
                  val as
                    | "marketing"
                    | "customer-service"
                    | "human-resource"
                    | "project-management"
                    | "business-development"
                    | "sales&communication"
                    | "teaching&education"
                    | "design&creative"
                    | "information&technology"
                );
                trigger("category");
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="customer-service">Customer Service</SelectItem>
              <SelectItem value="human-resource">Human Resource</SelectItem>
              <SelectItem value="project-management">
                Project Management
              </SelectItem>
              <SelectItem value="business-development">
                Business Development
              </SelectItem>
              <SelectItem value="sales&communication">
                Sales & Communication
              </SelectItem>
              <SelectItem value="teaching&education">
                Teaching & Education
              </SelectItem>
              <SelectItem value="design&creative">Design & Creative</SelectItem>
              <SelectItem value="information&technology">
                Information & Technology
              </SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-red-500">
            {errors.category && errors.category.message}
          </p>
        </div>

        <div>
          <Label htmlFor="applicationDeadline">Application Deadline</Label>
          <Input
            {...register("applicationDeadline")}
            id="applicationDeadline"
            placeholder="Application Deadline"
            type="date"
            className="mb-2"
          />
          <p className="text-xs text-red-500">
            {errors.applicationDeadline && errors.applicationDeadline.message}
          </p>
        </div>

        <div>
          <Label htmlFor="vacancies">No. of Vacancies</Label>
          <Input
            {...register("vacancies")}
            id="vacancies"
            placeholder="Vacancies"
            type="text"
            className="mb-2"
          />
          <p className="text-xs text-red-500">
            {errors.vacancies && errors.vacancies.message}
          </p>
        </div>

        <div>
          <Label htmlFor="description">Job Description</Label>
          <ReactQuill
            className="h-40 mb-10"
            placeholder="Enter job description..."
            theme="snow"
            onChange={(value) => setBody(value)}
            value={body}
          />
          <p className="text-xs text-red-500">
            {errors.description && errors.description.message}
          </p>
        </div>

        <Button disabled={isSubmitting} className="mt-4">
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default Page;
