"use client"

import type * as React from "react"
import {
  Users,
  Boxes,
  Package,
  BarChart,
  FileText,
  GalleryVerticalEnd,
  LayoutDashboard,
  Star,
  AlertCircle,
} from "lucide-react"

import { TeamSwitcher } from "./team-switcher"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Digital Electronics",
      logo: GalleryVerticalEnd,
      plan: "E-Commerce",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      title: "User Management",
      url: "/dashboard/admin/users",
      icon: Users,
    },
    {
      title: "Products",
      url: "/dashboard/admin/products",
      icon: Boxes,
    },
    {
      title: "Orders",
      url: "/admin/orders",
      icon: Package,
    },
    {
      title: "Content",
      url: "/admin/content",
      icon: FileText,
    },
    {
      title: "Analytics",
      url: "/admin/analytics",
      icon: BarChart,
    },
    {
      title: "Reviews & Comments",
      url: "/admin/reviews",
      icon: Star,
    },
    {
      title: "System",
      url: "/admin/system",
      icon: AlertCircle,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
