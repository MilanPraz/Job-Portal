"use client";
import React, { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { deleteCloudinaryImage } from "@/cloudinary/upload";

type TDeleteAlert = {
  deleteAction: (id: string) => any;
  id: string;
  name?: string;
  publicId: string;
};

const DeleteAlert: React.FC<TDeleteAlert> = ({
  id,
  deleteAction,
  name,
  publicId,
}) => {
  const [pending, setPending] = useState(false);

  const handleDeleteAction = async () => {
    setPending(true);
    const deleteRes = await deleteCloudinaryImage(JSON.parse(publicId));

    const res = await deleteAction(JSON.parse(id));
    if (res.success) {
      toast.success("Job deleted successfully!");
    }

    setPending(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {name ? name : <Trash size={16} className="text-red-500" />}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your job
            and remove the job data from servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={handleDeleteAction}
              className="bg-red-600 hover:bg-red-500"
            >
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlert;
