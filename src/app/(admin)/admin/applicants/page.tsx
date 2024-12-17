"use server";
import React from "react";
import Link from "next/link";
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
import Applicant from "@/server/models/applicant";
import { deleteApplicant } from "@/server/actions/jobs/jobs.action";
import DeleteApplicant from "@/components/DeleteApplicant";

const page = async () => {
  await connectDB();
  const applications = await Applicant.find().sort({ createdAt: -1 });

  return (
    <div className="w-full">
      <div className="pb-2">
        <h2 className=" text-4xl font-semibold">All Applicants</h2>
      </div>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Fullname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Portfolio</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications
            ? applications.map((n: any) => (
                <TableRow key={n._id}>
                  <TableCell className="line-clamp-2 flex gap-2 items-center">
                    {/* <Image
                      src={n.companyLogo.secureUrl}
                      alt="logo"
                      height={50}
                      width={50}
                      className=" rounded-full object-cover h-10 w-10"
                    /> */}
                    {n.fullName}
                  </TableCell>
                  <TableCell className="">{n.email}</TableCell>
                  <TableCell className="text-center">
                    {n.portfolio ? n.portfolio : "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    <Link href={n.resume.secureUrl} target="_blank">
                      <span className=" underline underline-offset-2 text-primary">
                        Link
                      </span>
                    </Link>
                  </TableCell>
                  <TableCell>{dateFormatter(n.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex gap-2">
                      <div className="flex items-center justify-center text-red-500 underline underline-offset-4"></div>

                      <DeleteApplicant
                        deleteAction={deleteApplicant}
                        applicantId={JSON.stringify(n._id)}
                        jobId={JSON.stringify(n._id)}
                        publicId={JSON.stringify(n.resume.publicId)}
                      />
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
