import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type TCustomBread = {
  title: string;
  root?: string;
  subRoot1: string;
  subRoot2?: string;
};

export default function CustomBreadCrumb({
  title,
  root = "Home",
  subRoot1,
  subRoot2,
}: TCustomBread) {
  return (
    <div>
      <div
        style={{ background: "url(/home/breadcrumb.jpg) center/cover" }}
        className="h-[50vh] relative"
      >
        <div className=" absolute inset-0 bg-gradient-to-t from-primary via-transparent to-black"></div>

        <section className=" xl:container px-4 flex justify-center  h-full flex-col">
          <div className="mycontainer  p-8   border-l-[15px] border-primary">
            <div>
              <h2 className="text-4xl mb-4 capitalize md:text-6xl font-bold text-white">
                {title}
              </h2>
            </div>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink className="text-primary capitalize" href="/">
                    {root}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator
                  className={`${
                    subRoot2 ? "text-primary" : "text-white"
                  } capitalize`}
                />

                <BreadcrumbItem>
                  <BreadcrumbPage
                    className={`${
                      subRoot2 ? "text-primary" : "text-white"
                    } capitalize`}
                  >
                    {subRoot1}
                  </BreadcrumbPage>
                </BreadcrumbItem>
                {subRoot2 && (
                  <>
                    <BreadcrumbSeparator className="text-white" />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-white capitalize">
                        {subRoot2}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>
      </div>
    </div>
  );
}
