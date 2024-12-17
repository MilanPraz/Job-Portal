import React, { ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const HeadingUnderline = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className=" flex items-center justify-center">
      <div className="flex flex-col w-fit self-center text-center  items-center justify-center">
        <h2
          ref={ref}
          className={cn(
            "text-4xl  text-primary md:text-6xl font-bold text-center",
            className
          )}
        >
          {children}
        </h2>
        <motion.div
          className="bg-secondary h-1 mt-2"
          initial={{ width: "0%" }}
          animate={{ width: isInView ? "100%" : "0%" }}
          transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
        />
      </div>
    </section>
  );
};

export default HeadingUnderline;
