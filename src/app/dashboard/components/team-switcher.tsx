"use client"

import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

export function TeamSwitcher({ 
  teams 
}: { 
  teams: {
    name: string
    logo: React.ElementType
    plan: string
  }[]
}) {
  const [activeTeam] = React.useState(teams[0])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton 
              size="lg"
              className="data-[state=open]:bg-red-500/20 text-white hover:bg-red-500/10"
            >
              {/* Logo Container */}
              <Link href={"/"} className="flex size-8 items-center justify-center rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors">
                <activeTeam.logo className="size-4" />
              </Link>
              
              {/* Team Info */}
              <Link href={"/"} className="ml-2 flex-1 text-left text-sm leading-tight text-white">
                <div className="font-semibold">{activeTeam.name}</div>
                <div className="text-xs text-white/80">{activeTeam.plan}</div>
              </Link>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}