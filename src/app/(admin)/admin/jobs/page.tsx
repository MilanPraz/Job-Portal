import React from "react";
import Link from "next/link";
import { PencilIcon, Info, PlusCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import connectDB from "@/server/utils/ConnectDB";
import { dateFormatter } from "@/lib/dateFormatter";
import { deleteJob } from "@/server/actions/jobs/jobs.action";
import Jobss from "@/server/models/job";
import DeleteAlert from "@/components/DeleteAlert";
import Image from "next/image";
import { TJob } from "@/app/types/job.types";

const page = async () => {
  await connectDB();
  const jobs = await Jobss.find().sort({ createdAt: -1 });

  return (
    <div className="w-full">
      <div className="pb-2">
        <h2 className=" text-4xl font-semibold">All Jobs</h2>
        <Link
          href="/admin/jobs/new"
          className="flex items-center gap-2 text-blue-500 underline underline-offset-4"
        >
          <PlusCircle size={16} /> Create new job
        </Link>
      </div>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Job Type</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs
            ? jobs.map((n: TJob) => (
                <TableRow key={n._id}>
                  <TableCell className="line-clamp-2 flex gap-2 items-center w-[200px]">
                    <Image
                      src={n.companyLogo.secureUrl}
                      alt="logo"
                      height={50}
                      width={50}
                      className=" rounded-full object-cover h-10 w-10"
                    />
                    {n.title}
                  </TableCell>
                  <TableCell className="">{n.company}</TableCell>
                  <TableCell className="">{n.jobType}</TableCell>
                  <TableCell>{dateFormatter(n.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex gap-2">
                      <Link
                        className="flex items-center justify-center text-blue-500 underline underline-offset-4"
                        href={`/admin/jobs/${n._id}/edit`}
                      >
                        <PencilIcon size={16} />
                      </Link>
                      <div className="flex items-center justify-center text-red-500 underline underline-offset-4"></div>

                      <DeleteAlert
                        deleteAction={deleteJob}
                        id={JSON.stringify(n._id)}
                        publicId={JSON.stringify(n.companyLogo.publicId)}
                      />
                      <Link
                        className="flex items-center justify-center text-green-500 underline underline-offset-4"
                        href={`/jobs/${n._id}/`}
                      >
                        <Info size={16} />
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
