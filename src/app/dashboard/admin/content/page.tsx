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
import { Input } from "@/components/ui/input";
import { Plus, RefreshCcw, Pencil, CalendarClock, CheckCircle2, AlertCircle, Search } from "lucide-react";

// Mock content data
const posts = [
  {
    id: "POST-901",
    title: "Top 10 Noise Cancelling Headphones in 2025",
    author: "Jane Cooper",
    category: "Buying Guide",
    status: "published" as const,
    updatedAt: "2025-08-30 18:30",
  },
  {
    id: "POST-902",
    title: "How to Choose the Right Gaming Laptop",
    author: "Cody Fisher",
    category: "Tutorial",
    status: "draft" as const,
    updatedAt: "2025-08-31 09:05",
  },
  {
    id: "POST-903",
    title: "Wearables Trend Report Q3",
    author: "Eleanor Pena",
    category: "Report",
    status: "scheduled" as const,
    updatedAt: "2025-09-01 08:00",
  },
  {
    id: "POST-904",
    title: "Best Budget Smartphones Under $300",
    author: "Theresa Webb",
    category: "Buying Guide",
    status: "published" as const,
    updatedAt: "2025-08-29 14:42",
  },
  {
    id: "POST-905",
    title: "Photography Tips for Product Shoots",
    author: "Albert Flores",
    category: "Tutorial",
    status: "draft" as const,
    updatedAt: "2025-08-28 12:17",
  },
];

type Post = typeof posts[number];

function statusBadge(status: Post["status"]) {
  switch (status) {
    case "published":
      return (
        <Badge variant="default" className="gap-1">
          <CheckCircle2 className="h-3 w-3" /> published
        </Badge>
      );
    case "draft":
      return (
        <Badge variant="outline" className="gap-1">
          <Pencil className="h-3 w-3" /> draft
        </Badge>
      );
    case "scheduled":
      return (
        <Badge variant="secondary" className="gap-1">
          <CalendarClock className="h-3 w-3" /> scheduled
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

export default function ContentPage() {
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
                Content
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="outline" className="gap-2">
                <RefreshCcw className="h-4 w-4" /> Refresh
              </Button>
              <Button className="gap-2 bg-gradient-to-r from-[#e53935] to-[#ff0000] hover:from-[#d32f2f] hover:to-[#e53935]">
                <Plus className="h-4 w-4" /> New Post
              </Button>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Total Posts</CardTitle>
                <CardDescription>All-time published items</CardDescription>
              </CardHeader>
              <CardContent className="text-2xl font-bold">248</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Drafts</CardTitle>
                <CardDescription>Work in progress</CardDescription>
              </CardHeader>
              <CardContent className="text-2xl font-bold">18</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Scheduled</CardTitle>
                <CardDescription>Upcoming publications</CardDescription>
              </CardHeader>
              <CardContent className="text-2xl font-bold">6</CardContent>
            </Card>
          </div>

          {/* Toolbar */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Articles</CardTitle>
              <CardDescription>Manage blog posts and pages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 w-full sm:w-96">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search articles..." className="h-8" />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="h-8">All</Button>
                  <Button variant="outline" className="h-8">Draft</Button>
                  <Button variant="outline" className="h-8">Published</Button>
                  <Button variant="outline" className="h-8">Scheduled</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posts table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableCaption>Showing {posts.length} recent items</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">Category</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                    <TableHead className="text-right">Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span>{p.title}</span>
                          <span className="text-xs text-muted-foreground">{p.id}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{p.category}</TableCell>
                      <TableCell>{p.author}</TableCell>
                      <TableCell className="text-right">{statusBadge(p.status)}</TableCell>
                      <TableCell className="text-right">{p.updatedAt}</TableCell>
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
