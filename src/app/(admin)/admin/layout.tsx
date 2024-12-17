import React, { ReactNode } from "react";
import "../../globals.css";
import BackButton from "@/components/BackButton";
import { Toaster } from "react-hot-toast";
import SideNav from "@/components/SideNav";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <html>
      <body>
        <div className="flex">
          <div className="fixed left-0 top-0 z-50">
            <SideNav />
          </div>
          <div className="ml-[250px] min-h-screen flex-1 p-4 ">
            <BackButton />

            {children}
          </div>
        </div>
        <Toaster
          containerStyle={{ zIndex: 99999999 }}
          toastOptions={{ position: "bottom-right" }}
        />
      </body>
    </html>
  );
};

export default layout;
