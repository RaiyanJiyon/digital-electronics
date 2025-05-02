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
  Megaphone,
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
      items: [],
    },
    {
      title: "User Management",
      url: "/admin/users",
      icon: Users,
      items: [
        {
          title: "Customers",
          url: "/admin/users/customers",
        },
        {
          title: "Administrators",
          url: "/admin/users/administrators",
        },
        {
          title: "Roles & Permissions",
          url: "/admin/users/roles",
        },
      ],
    },
    {
      title: "Products",
      url: "/admin/products",
      icon: Boxes,
      items: [
        {
          title: "All Products",
          url: "/admin/products",
        },
        {
          title: "Categories",
          url: "/admin/products/categories",
        },
        {
          title: "Inventory",
          url: "/admin/products/inventory",
        },
        {
          title: "Attributes",
          url: "/admin/products/attributes",
        },
      ],
    },
    {
      title: "Orders",
      url: "/admin/orders",
      icon: Package,
      items: [
        {
          title: "All Orders",
          url: "/admin/orders",
        },
        {
          title: "Abandoned Carts",
          url: "/admin/orders/abandoned",
        },
        {
          title: "Refunds",
          url: "/admin/orders/refunds",
        },
      ],
    },
    {
      title: "Sales & Marketing",
      url: "/admin/marketing",
      icon: Megaphone,
      items: [
        {
          title: "Promotions",
          url: "/admin/marketing/promotions",
        },
        {
          title: "Discounts",
          url: "/admin/marketing/discounts",
        },
        {
          title: "Coupons",
          url: "/admin/marketing/coupons",
        },
        {
          title: "Email Campaigns",
          url: "/admin/marketing/email",
        },
      ],
    },
    {
      title: "Content",
      url: "/admin/content",
      icon: FileText,
      items: [
        {
          title: "Blog Posts",
          url: "/admin/content/blogs",
        },
        {
          title: "Pages",
          url: "/admin/content/pages",
        },
        {
          title: "Media Library",
          url: "/admin/content/media",
        },
      ],
    },
    {
      title: "Analytics",
      url: "/admin/analytics",
      icon: BarChart,
      items: [
        {
          title: "Sales Reports",
          url: "/admin/analytics/sales",
        },
        {
          title: "Customer Insights",
          url: "/admin/analytics/customers",
        },
        {
          title: "Inventory Reports",
          url: "/admin/analytics/inventory",
        },
        {
          title: "Traffic & Conversion",
          url: "/admin/analytics/traffic",
        },
      ],
    },
    {
      title: "Reviews & Comments",
      url: "/admin/reviews",
      icon: Star,
      items: [
        {
          title: "Product Reviews",
          url: "/admin/reviews/products",
        },
        {
          title: "Blog Comments",
          url: "/admin/reviews/comments",
        },
      ],
    },
    {
      title: "System",
      url: "/admin/system",
      icon: AlertCircle,
      items: [
        {
          title: "Logs",
          url: "/admin/system/logs",
        },
        {
          title: "Backups",
          url: "/admin/system/backups",
        },
        {
          title: "Integrations",
          url: "/admin/system/integrations",
        },
      ],
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
