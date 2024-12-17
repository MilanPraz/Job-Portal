"use client";

import {
  BarChart3,
  Headphones,
  Users,
  ClipboardList,
  TrendingUp,
  MessageSquare,
  GraduationCap,
  Palette,
} from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  {
    icon: BarChart3,
    title: "Marketing",
    vacancies: 123,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Headphones,
    title: "Customer Service",
    vacancies: 123,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Users,
    title: "Human Resource",
    vacancies: 123,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: ClipboardList,
    title: "Project Management",
    vacancies: 123,
    gradient: "from-orange-500 to-amber-500",
  },
  {
    icon: TrendingUp,
    title: "Business Development",
    vacancies: 123,
    gradient: "from-red-500 to-rose-500",
  },
  {
    icon: MessageSquare,
    title: "Sales & Communication",
    vacancies: 123,
    gradient: "from-violet-500 to-indigo-500",
  },
  {
    icon: GraduationCap,
    title: "Teaching & Education",
    vacancies: 123,
    gradient: "from-fuchsia-500 to-pink-500",
  },
  {
    icon: Palette,
    title: "Design & Creative",
    vacancies: 123,
    gradient: "from-emerald-500 to-teal-500",
  },
];

export default function ExploreByCategories() {
  return (
    <section className="py-16 md:py-24">
      <div className=" px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Explore By Category
          </h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Browse through our curated collection of job categories to find your
            perfect role
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 pt-12 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl border bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-950"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity group-hover:opacity-10" />
              <div className="p-6">
                <div
                  className={`mb-4 inline-flex rounded-lg bg-gradient-to-r ${category.gradient} p-3`}
                >
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 font-semibold tracking-tight">
                  {category.title}
                </h3>
                <p className="text-sm text-emerald-500">
                  {category.vacancies} Vacancy
                </p>
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-emerald-500 to-teal-500 transition-all group-hover:w-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
