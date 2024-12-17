"use client";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function BackButton() {
  const router = useRouter();
  return (
    <>
      <motion.div
        onClick={() => router.back()}
        className="group mb-8 flex w-fit cursor-pointer items-center justify-center text-lg  text-sm font-semibold hover:text-primary"
        whileHover="hover"
      >
        <motion.div>
          <ChevronLeft
            size={20}
            className={`translate-x-0 self-center    transition-all group-hover:-translate-x-2
               group-hover:opacity-100`}
          />
        </motion.div>
        Back
      </motion.div>
    </>
  );
}
