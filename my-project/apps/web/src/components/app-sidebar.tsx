/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  Home,
  Pizza,
  Heart,
  ShoppingBasket,
  ShoppingCart,
  ChevronUp,
  Settings,
  LogOut,
  MapPin,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useEffect } from "react";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useLogout } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/user",
    icon: Home,
  },
  {
    title: "Orders",
    url: "/user/orders",
    icon: ShoppingCart,
  },
  {
    title: "Cart",
    url: "/user/cart",
    icon: ShoppingBasket,
  },
  // {
  //   title: "Favorites",
  //   url: "/user/favorites",
  //   icon: Heart,
  // },
  // {
  //   title: "Settings",
  //   url: "#",
  //   icon: Settings,
  // },
];
interface AppSideBarProps{
  collapsible?:"offcanvas" | "icon" | "none" | undefined,
    variant?:"sidebar" | "floating" | "inset" | undefined
}
export function AppSidebar({collapsible=undefined,variant=undefined}:AppSideBarProps) {
  const {
    // state,
    // open,
    // setOpen,
    // openMobile,
    setOpenMobile,
    // isMobile,
    // toggleSidebar,
  } = useSidebar();
  useEffect(() => {
    setOpenMobile(false); // Example: Move state updates inside useEffect
  }, [setOpenMobile]);

  const { mutate: logout, isPending, isError, error } = useLogout();
  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
         // Redirect to login page after logout
      },
    });
  };
  return (
    <Sidebar side="left" className="bg-components border-none" collapsible={collapsible} variant={variant}>
      <SidebarHeader>
        <h1 className="flex flex-row items-center gap-2 font-bold pl-3 text-black p-1">
          <span className="yellow w-10 h-7 center flex-row">
            <Pizza className="rotate-90 w-4 h-4" />
          </span>
          PizzaCraft
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Settings /> Account
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                {/* <Link href={'/user/profile'}><DropdownMenuItem>
                  <span className="flex flex-row items-center gap-2">
                    <MapPin className="w-4 h-4" /> 
                    Your Addresses
                  </span>
                </DropdownMenuItem>
                </Link> */}
                <Link href={'/user/profile'}><DropdownMenuItem>
                  <span className="flex flex-row items-center gap-2">
                    <User className="w-4 h-4" />
                    Profile
                  </span>
                </DropdownMenuItem></Link>
                {/* <DropdownMenuItem>
                  <span className="flex flex-row items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Settings
                  </span>
                </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarMenuItem key={"SignOut"}>
            <SidebarMenuButton asChild>
              <button onClick={handleLogout} disabled={isPending}>
                <LogOut />
                {isPending ? "Logging out..." : "Logout"}
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
