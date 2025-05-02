"use client"

import * as React from "react"
import { ChevronsUpDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

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
              className="data-[state=open]:bg-sidebar-accent"
            >
              {/* Logo Container */}
              <div className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <activeTeam.logo className="size-4" />
              </div>
              
              {/* Team Info */}
              <div className="ml-2 flex-1 text-left text-sm leading-tight">
                <div className="font-semibold">{activeTeam.name}</div>
                <div className="text-xs">{activeTeam.plan}</div>
              </div>
              
              {/* Dropdown Indicator */}
              <ChevronsUpDown className="ml-auto opacity-50" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}