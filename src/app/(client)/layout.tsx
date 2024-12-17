import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";

import "../globals.css";
import { JobProvider } from "@/context/JobContext";
import { Navbar } from "@/components/navigation/Navbar";
import { Toaster } from "react-hot-toast";
import ProgressBar from "@/components/navigation/ProgressBar";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Job Portal",
  description: "Job Portal Website, where your search for job ends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-[#fcfcfd] " + "relative"}>
        <ProgressBar />
        <Toaster toastOptions={{ position: "bottom-right" }} />

        <JobProvider>
          <Navbar />
          {children}
        </JobProvider>
      </body>
    </html>
  );
}
