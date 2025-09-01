"use client";

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, RefreshCcw, Truck, AlertCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock orders data
const orders = [
  {
    id: "ORD-8101",
    customer: "Sophia Patel",
    email: "sophia@example.com",
    total: 259.99,
    items: 3,
    status: "processing" as const,
    placedAt: "2025-08-30 14:12",
  },
  {
    id: "ORD-8102",
    customer: "Liam Johnson",
    email: "liam@example.com",
    total: 89.49,
    items: 1,
    status: "completed" as const,
    placedAt: "2025-08-30 16:45",
  },
  {
    id: "ORD-8103",
    customer: "Emma Wilson",
    email: "emma@example.com",
    total: 432.5,
    items: 5,
    status: "pending" as const,
    placedAt: "2025-08-31 09:21",
  },
  {
    id: "ORD-8104",
    customer: "Noah Davis",
    email: "noah@example.com",
    total: 119.0,
    items: 2,
    status: "cancelled" as const,
    placedAt: "2025-08-31 12:03",
  },
  {
    id: "ORD-8105",
    customer: "Ava Martinez",
    email: "ava@example.com",
    total: 64.25,
    items: 1,
    status: "shipped" as const,
    placedAt: "2025-09-01 10:11",
  },
];

type Order = typeof orders[number];

function statusBadge(status: Order["status"]) {
  switch (status) {
    case "completed":
      return <Badge variant="default">completed</Badge>;
    case "processing":
      return <Badge variant="secondary">processing</Badge>;
    case "pending":
      return <Badge variant="outline">pending</Badge>;
    case "shipped":
      return (
        <Badge variant="secondary" className="gap-1">
          <Truck className="h-3 w-3" /> shipped
        </Badge>
      );
    default:
      return (
        <Badge variant="destructive" className="gap-1">
          <AlertCircle className="h-3 w-3" /> {status}
        </Badge>
      );
  }
}

export default function OrdersPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[#7a1f73] to-[#9c27b0] bg-clip-text text-transparent">
                Orders
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="outline" className="gap-2">
                <RefreshCcw className="h-4 w-4" /> Refresh
              </Button>
              <Button className="gap-2 bg-gradient-to-r from-[#e53935] to-[#ff0000] hover:from-[#d32f2f] hover:to-[#e53935]">
                <Download className="h-4 w-4" /> Export CSV
              </Button>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Today</CardTitle>
                <CardDescription>Orders placed today</CardDescription>
              </CardHeader>
              <CardContent className="text-2xl font-bold">12</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Processing</CardTitle>
                <CardDescription>Awaiting fulfillment</CardDescription>
              </CardHeader>
              <CardContent className="text-2xl font-bold">7</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Revenue</CardTitle>
                <CardDescription>Last 24 hours</CardDescription>
              </CardHeader>
              <CardContent className="text-2xl font-bold">$1,984.33</CardContent>
            </Card>
          </div>

          {/* Toolbar */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>All Orders</CardTitle>
              <CardDescription>Recent order activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 w-full sm:w-72">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search orders..." className="h-8" />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="h-8">Pending</Button>
                  <Button variant="outline" className="h-8">Processing</Button>
                  <Button variant="outline" className="h-8">Completed</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Orders table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableCaption>Showing {orders.length} recent orders</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead className="text-right">Items</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                    <TableHead className="text-right">Placed At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((o) => (
                    <TableRow key={o.id}>
                      <TableCell className="font-medium">{o.id}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{o.customer}</span>
                          <span className="text-xs text-muted-foreground md:hidden">{o.email}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{o.email}</TableCell>
                      <TableCell className="text-right">{o.items}</TableCell>
                      <TableCell className="text-right">${o.total.toFixed(2)}</TableCell>
                      <TableCell className="text-right">{statusBadge(o.status)}</TableCell>
                      <TableCell className="text-right">{o.placedAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
