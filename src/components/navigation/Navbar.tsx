"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Bell,
  Briefcase,
  ChevronDown,
  Heart,
  LogIn,
  Menu,
  User,
} from "lucide-react";
import { usePathname } from "next/navigation";
import path from "path";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link href={href} passHref legacyBehavior>
    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
      {children}
    </NavigationMenuLink>
  </Link>
);

const navLinks = [
  {
    id: 1,
    title: "Home",
    to: "/",
  },
  {
    id: 2,
    title: "Jobs",
    to: "/jobs",
  },
  {
    id: 3,
    title: "About us",
    to: "/about-us",
  },
  {
    id: 4,
    title: "Contact",
    to: "/contact",
  },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-[99999] w-full border-b bg-white/80 backdrop-blur-sm">
      <div className=" mx-auto px-4">
        <div className="flex h-16 items-center justify-between xl:container px-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Briefcase className="h-6 w-6 text-emerald-500" />
              <span className="text-xl font-bold">JobPortal</span>
            </Link>
          </div>

          <div className=" flex items-center gap-4">
            <nav className="hidden md:flex">
              <ul className=" flex gap-8  items-center">
                {navLinks.map((l) => {
                  const isActive =
                    pathname === l.to ||
                    (pathname.startsWith("/jobs/") && l.to === "/jobs");

                  return (
                    <li
                      className={` ${
                        isActive
                          ? "text-primary underline underline-offset-4"
                          : "text-black"
                      }`}
                      key={l.id}
                    >
                      <Link href={l.to}>{l.title}</Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="hidden items-center space-x-4 md:flex">
              <Button variant="ghost" size="icon">
                <Link href={"/favorites"}>
                  <Heart
                    className="h-5 w-5 border-none outline-none"
                    fill="#00b377"
                    // stroke="1px"
                    strokeWidth={0}
                  />
                </Link>
              </Button>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={isMenuOpen ? { height: "auto" } : { height: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden md:hidden"
      >
        <nav className="">
          <ul className=" flex flex-col gap-8  items-center">
            {navLinks.map((l) => {
              const isActive =
                pathname == l.to ||
                (pathname.startsWith("/jobs/") && l.to === "/jobs");
              return (
                <li
                  onClick={() => setIsMenuOpen(false)}
                  className={` ${
                    isActive
                      ? "text-primary underline underline-offset-4"
                      : "text-black"
                  }`}
                  key={l.id}
                >
                  <Link href={l.to}>{l.title}</Link>
                </li>
              );
            })}
          </ul>
          <div className=" items-center  grid place-items-center mt-8 mb-4">
            <Link href={"/favorites"} className=" flex items-center gap-1">
              <Heart
                className="h-5 w-5 border-none outline-none"
                fill="#00b377"
                // stroke="1px"
                strokeWidth={0}
              />{" "}
              Fav
            </Link>
          </div>
        </nav>
      </motion.div>
    </header>
  );
}
