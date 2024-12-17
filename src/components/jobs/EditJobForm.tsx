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
import CloudinaryUpload from "@/cloudinary/CloudinaryUpload";
import { updateJob } from "@/server/actions/jobs/jobs.action";
import ReactQuill from "react-quill-new";
import "react-quill/dist/quill.snow.css";
import { Label } from "@/components/ui/label";

const EditJobForm = ({ job }: { job: string }) => {
  const jobObject = JSON.parse(job);
  const router = useRouter();
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
    setValue("company", jobObject.company);
    setValue("title", jobObject.title);
    setValue("location", jobObject.location);
    setValue("jobType", jobObject.jobType);
    setValue("category", jobObject.category);
    setValue("applicationDeadline", jobObject.applicationDeadline);
    setValue("vacancies", jobObject.vacancies);
    setValue("description", jobObject.description);
    setBody(jobObject.description);
    setImgUrl(jobObject.companyLogo.secureUrl);
  }, []);

  useEffect(() => {
    setValue("description", body);
    if (body.length > 0) {
      trigger("description");
    }
  }, [body, setValue, trigger]);

  const onSubmit = async (data: TJobSchema) => {
    if (!image) {
      const res = await updateJob(jobObject._id, data);

      if (res.success) {
        toast.success("Job is Updated!");
      }
    } else {
      const folder = "jobs";
      const { public_id, secure_url } = await CloudinaryUpload({
        image,
        folder,
      });

      const imgData = {
        secureUrl: secure_url,
        publicId: public_id,
      };

      const res = await updateJob(jobObject._id, data, imgData);

      if (res.success) {
        toast.success("Job is Updated!");
      }
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
            <PlusCircle size={20} /> Edit Company Logo
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
          <select
            {...register("jobType")}
            defaultValue={jobObject.jobType}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Job Type</option>
            <option value="On-site">On-site</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Remote">Remote</option>
          </select>
          <p className="text-xs text-red-500">
            {errors.jobType && errors.jobType.message}
          </p>
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <select
            {...register("category")}
            defaultValue={jobObject.category}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Category</option>
            <option value="marketing">Marketing</option>
            <option value="customer-service">Customer Service</option>
            <option value="human-resource">Human Resource</option>
            <option value="project-management">Project Management</option>
            <option value="business-development">Business Development</option>
            <option value="sales&communication">Sales & Communication</option>
            <option value="teaching&education">Teaching & Education</option>
            <option value="design&creative">Design & Creative</option>
            <option value="information&technology">
              Information & Technology
            </option>
          </select>
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

export default EditJobForm;
