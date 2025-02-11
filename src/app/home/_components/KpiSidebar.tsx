"use client";
import Logo from "@/app/_components/logo";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { decriptDetailsFromCookies } from "@/utils/authentication";
import { sideBarData } from "@/utils/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronDown, ChevronUp, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const KpiSidebar = ({role, isLoading}:{role:string, isLoading: boolean}) => {

  const pathName = usePathname();
  const { toast } = useToast();
  const router = useRouter();
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar();
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      const response = await fetch("/home/auth/logout", {
        method: "POST",
      });
      return response.json();
    },

    onError: () => {
      toast({
        variant: "destructive",
        title: "Logout Error ",
        description: "fail to log out please try again",
        action: <ToastAction altText="ok">ok</ToastAction>,
      });
    },

    onSuccess: () => {
      toast({
        title: "Logged out",
        description: "successful logged out",
        action: <ToastAction altText="ok">ok</ToastAction>,
      });
      queryClient.clear();
      router.push("/login");
    },
  });

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="pt-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <Logo />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {

          isLoading ?

            <SideBarLoading />

            :


            sideBarData.map((group) => (
              <SidebarGroup key={group.group_name}>
                <SidebarGroupLabel>{group.group_name}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="gap-3">
                    {group.menu.map((menu) => (
                      <Collapsible
                        className="group/collapsible"
                        key={group.group_name + menu.title}
                      >
                        {
                          (role === "admin" ||
                            (menu.url === "/home" || menu.url === "/home/performance"))
                          &&

                          <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                              <SidebarMenuButton
                                isActive={menu.url === pathName}
                                asChild
                                className="hover:cursor-pointer"
                              >
                                {menu.url === undefined ? (
                                  <span>
                                    {" "}
                                    <menu.icon />
                                    <span>{menu.title}</span>
                                    {menu.submenu === undefined ? (
                                      ""
                                    ) : (
                                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                    )}
                                  </span>
                                ) : (
                                  <Link
                                    href={menu.url}
                                    onClick={() => setOpenMobile(false)}
                                  >
                                    <menu.icon />
                                    <span>{menu.title}</span>
                                    {menu.submenu === undefined ? (
                                      ""
                                    ) : (
                                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                    )}{" "}
                                  </Link>
                                )}
                              </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              {menu.submenu?.map((sub) => (
                                <SidebarMenuSub
                                  key={group.group_name + menu.title + sub.title}
                                  className="gap-4"
                                >
                                  <SidebarMenuSubItem>
                                    <Link href={sub.url}>
                                      {" "}
                                      <SidebarMenuButton
                                        onClick={() => setOpenMobile(false)}
                                        isActive={pathName === sub.url}
                                      >
                                        <Label>{sub.title}</Label>
                                      </SidebarMenuButton>
                                    </Link>
                                  </SidebarMenuSubItem>
                                </SidebarMenuSub>
                              ))}
                              <SidebarMenuSub className="gap-4"></SidebarMenuSub>
                            </CollapsibleContent>
                          </SidebarMenuItem>
                        }
                      </Collapsible>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
      </SidebarContent>
      <SidebarFooter className="pb-[30px]">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <LogOut /> sign out
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem
                  className="focus:bg-destructive cursor-pointer"
                  onClick={() => mutate()}
                >
                  <span>{isPending ? "signing out...." : "Sign out"}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default KpiSidebar;


function SideBarLoading() {
  return (
    <div className="flex flex-col gap-3 px-2">
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-full" />
    </div>
  );
}