"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import RightSlide from "../animation/RightSlide";

const features = [
  "Tempor erat elitr rebum at clita",
  "Aliqu diam amet diam et eos",
  "Clita duo justo magna dolore erat amet",
];

export default function WhatWeProvide() {
  return (
    <div className="">
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="  z-10 px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Images Grid */}
            <div className="relative aspect-[4/3] overflow-hidden">
              {/* Background pattern */}

              {/* Image grid */}
              <div
                style={{ background: "url(/home/bg.jpg) center/cover" }}
                className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-0 z-10"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src="/home/meet1.jpg"
                    alt="Professional team 1"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="relative overflow-hidden">
                  <div className="absolute inset-[0%] top-[15%] right-0">
                    <Image
                      src="/home/meet2.jpg"
                      alt="Professional team 2"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
                <div className="relative overflow-hidden">
                  <div className="absolute inset-[0%] bottom-[15%] left-0">
                    <Image
                      src="/home/meet3.jpg"
                      alt="Professional team 3"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
                <div className="relative overflow-hidden">
                  <Image
                    src="/home/meet4.jpg"
                    alt="Professional team 4"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center space-y-6">
              <RightSlide>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  We Help To Get The Best Job And Find A Talent
                </h2>
              </RightSlide>
              <RightSlide>
                <p className="text-gray-500 md:text-lg">
                  Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                  Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
                  sed stet lorem sit clita duo justo magna dolore erat amet
                </p>
              </RightSlide>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <RightSlide key={index} delay={0.2 * index}>
                    <li className="flex items-center space-x-3">
                      <div className="rounded-full bg-emerald-500 p-1">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  </RightSlide>
                ))}
              </ul>
              <div className="pt-4">
                <Button
                  size="lg"
                  className="bg-emerald-500 text-white hover:bg-emerald-600"
                >
                  Read More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
