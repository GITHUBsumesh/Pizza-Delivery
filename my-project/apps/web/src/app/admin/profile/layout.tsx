import { AdminAppSidebar } from "@/components/admin_app_sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import NavBar from "@/components/User/NavBar";
import {    UserRoundCog } from "lucide-react";
import React from "react";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider className="bg-main min-h-screen relative">
      {/* Sidebar (Absolute Positioning to Overlap) */}
      <div className="fixed  h-full z-50 bg-components">
        <AdminAppSidebar />
      </div>
      {/* Main Content Wrapper */}
      <div className="relative flex flex-col min-h-screen w-full">
        {/* Main Content */}
        <main className="bg-main flex-1 w-full min-h-screen  ">
          {/* <div className="relative z-40 w-full"> */}
            <NavBar title="Profile"  icon={<UserRoundCog className=" w-4 h-4 font-extrabold" />} isAdmin={true}/>
          {/* </div> */}
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
