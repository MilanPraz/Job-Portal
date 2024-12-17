"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FileText,
  Newspaper,
  BookImage,
  ScrollText,
  LogOutIcon,
  Users2,
  Mail,
  Settings,
  LucideNotebookPen,
  Bus,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
// import { Button } from "../ui/button";

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
} from "./ui/alert-dialog";
// import { toast } from "../ui/use-toast";
// import { GrHomeRounded } from "react-icons/gr";
// import { FaDonate, FaHouseUser, FaUserFriends } from "react-icons/fa";
import toast from "react-hot-toast";
import { Button } from "./ui/button";

const navsLinks = [
  {
    title: "Jobs",
    icon: <Settings size={20} strokeWidth={1} />,
    to: "/admin/jobs",
  },
  {
    title: "Applicants",
    icon: <Settings size={20} strokeWidth={1} />,
    to: "/admin/applicants",
  },
];

const SideNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    const res = await fetch("/api/auth");
    if (res.ok) {
      //   toast({
      //     title: res.ok
      //       ? "Successfully Logged Out !!"
      //       : "Error During Logging Out !!",
      //     description: res.ok,
      //     variant: res.ok ? "success" : "destructive",
      //   });

      if (res.ok) {
        toast.success("LoggedOut Successfully!");
      } else {
        toast.error("Failed to LogOut!");
      }
      router.push("/");
    } else return;
  };

  return (
    <div className="flex h-screen w-[220px] flex-col overflow-auto bg-primary">
      <div>
        <Link className="flex items-center  gap-2 p-2" href="/">
          <span className="font-bold text-white text-center">ADMIN</span>
        </Link>
      </div>

      <div className="mt-4 space-y-1 px-2">
        {navsLinks.map((link, idx) => (
          <Link
            key={idx}
            href={link.to}
            className={cn(
              "justify-left flex w-full cursor-pointer items-center gap-2 px-2 py-3 text-sm text-white",
              pathname.startsWith(link.to)
                ? "rounded-e-3xl rounded-s-3xl bg-white text-black"
                : "rounded-3xl hover:bg-white/20"
            )}
          >
            {link.icon} {link.title}
          </Link>
        ))}
      </div>
      <div className="mt-auto pb-8">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              className="mx-auto flex w-[80%] gap-2"
            >
              <LogOutIcon size={20} />
              <span>Logout</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout}>
                Logout
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default SideNav;
