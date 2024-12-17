"use client";

import { useRouter } from "next/navigation";
import {
  BarChart3,
  Headphones,
  Users,
  ClipboardList,
  TrendingUp,
  MessageSquare,
  GraduationCap,
  Palette,
  Code,
} from "lucide-react";
import { motion } from "framer-motion";
import { useJobContext } from "@/context/JobContext";

const categories = [
  {
    icon: BarChart3,
    title: "Marketing",
    vacancies: 123,
    gradient: "from-emerald-500 to-teal-500",
    slug: "marketing",
  },
  {
    icon: Headphones,
    title: "Customer Service",
    vacancies: 123,
    gradient: "from-blue-500 to-cyan-500",
    slug: "customer-service",
  },
  {
    icon: Users,
    title: "Human Resource",
    vacancies: 123,
    gradient: "from-purple-500 to-pink-500",
    slug: "human-resource",
  },
  {
    icon: ClipboardList,
    title: "Project Management",
    vacancies: 123,
    gradient: "from-orange-500 to-amber-500",
    slug: "project-management",
  },
  {
    icon: TrendingUp,
    title: "Business Development",
    vacancies: 123,
    gradient: "from-red-500 to-rose-500",
    slug: "business-development",
  },
  {
    icon: MessageSquare,
    title: "Sales & Communication",
    vacancies: 123,
    gradient: "from-violet-500 to-indigo-500",
    slug: "sales&communication",
  },
  {
    icon: GraduationCap,
    title: "Teaching & Education",
    vacancies: 123,
    gradient: "from-fuchsia-500 to-pink-500",
    slug: "teaching&education",
  },
  {
    icon: Palette,
    title: "Design & Creative",
    vacancies: 123,
    gradient: "from-emerald-500 to-teal-500",
    slug: "design&creative",
  },
  {
    icon: Code,
    title: "Information & Technology",
    vacancies: 123,
    gradient: "from-blue-500 to-indigo-500",
    slug: "information&technology",
  },
];

export default function ExploreByCategories() {
  const router = useRouter();
  const { setSelectedCategory } = useJobContext();

  const handleCategoryClick = (slug: string) => {
    setSelectedCategory(slug);
    router.push(`/jobs`);
  };

  return (
    <section className="py-16 md:py-24">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Explore By Category
          </h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Browse through our curated collection of job categories to find your
            perfect role
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 pt-12 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl border bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-950 cursor-pointer"
              onClick={() => handleCategoryClick(category.slug)}
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
