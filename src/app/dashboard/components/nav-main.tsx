"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { type LucideIcon } from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
  }[]
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-white/80 font-semibold">Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const active = pathname === item.url
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                isActive={active}
                className="text-white/90 hover:bg-white/5 hover:text-white data-[active=true]:bg-white/10 data-[active=true]:text-white transition-all duration-200"
              >
                <Link href={item.url} className="flex items-center">
                  {item.icon && (
                    <item.icon className={active ? "text-white" : "text-white/70"} />
                  )}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}