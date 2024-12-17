"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../button";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

const carouselData = [
  {
    title: "Discover Your Dream Startup Job Today",
    desc: `Explore exciting opportunities at innovative companies
            shaping the future. Join a team where your skills and
            passion make a real impact.`,
    img: "/home/carousel-1.jpg",
  },
  {
    title: "Empowering Your Career Growth",
    desc: `Unlock your potential with startups that value creativity,
            innovation, and determination. Take the next big step in
            your professional journey.`,
    img: "/home/carousel-2.jpg",
  },
];

export default function Hero() {
  return (
    <div className="  ">
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        opts={{ loop: true }}
        className="w-full h-fit relative mx-auto"
      >
        <CarouselContent className=" ">
          {carouselData.map((c, index) => (
            <CarouselItem key={index}>
              <div
                style={{ background: `url(${c.img}) center/cover` }}
                className="h-[calc(100vh-10px)] relative bg-green-300"
              >
                <div className=" absolute inset-0 bg-slate-900/50"></div>
                {/* CONTAINER */}
                <section className=" absolute top-1/2 -translate-y-1/2">
                  <div className=" relative md:mx-10 p-8 md:p-10 border-l-[15px] mycontainer  border-primary">
                    <div className="max-w-md md:max-w-xl lg:max-w-3xl space-y-10">
                      <h2 className="leading-tight text-white text-4xl md:text-6xl font-bold">
                        {c.title}
                      </h2>
                      <p className="text-sm md:text-lg text-muted">{c.desc}</p>

                      <Button
                        asChild
                        className=" bg-primary rounded-none h-14 px-12 text-sm md:text-lg "
                      >
                        <Link href={"/jobs"}>Search A Job</Link>
                      </Button>
                    </div>
                  </div>
                </section>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-transparent rounded-none text-white scale-125 !right-20 top-[95%] -translate-y-[95%]  md:top-[40%] md:-translate-y-[40%]" />
        <CarouselNext className="bg-transparent rounded-none text-white scale-125  right-4 md:right-20 top-[95%] -translate-y-[95%] md:top-[50%] md:-translate-y-[50%]" />
      </Carousel>
    </div>
  );
}
