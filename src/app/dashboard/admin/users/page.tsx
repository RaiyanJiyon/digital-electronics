"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  Download,
  Filter,
  MoreHorizontal,
  Search,
  SlidersHorizontal,
  UserPlus,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar";

// Sample user data
const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Customer",
    status: "Active",
    lastActive: "2 hours ago",
    dateJoined: "Jan 12, 2023",
    orders: 8,
    spent: "$1,245.89",
    avatar: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Customer",
    status: "Active",
    lastActive: "1 day ago",
    dateJoined: "Mar 5, 2023",
    orders: 12,
    spent: "$2,345.50",
    avatar: "/placeholder.svg",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    role: "Administrator",
    status: "Active",
    lastActive: "Just now",
    dateJoined: "Nov 18, 2022",
    orders: 0,
    spent: "$0.00",
    avatar: "/placeholder.svg",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "Customer",
    status: "Inactive",
    lastActive: "2 months ago",
    dateJoined: "Feb 8, 2023",
    orders: 3,
    spent: "$450.25",
    avatar: "/placeholder.svg",
  },
  {
    id: "5",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    role: "Customer",
    status: "Active",
    lastActive: "3 days ago",
    dateJoined: "Apr 22, 2023",
    orders: 5,
    spent: "$780.50",
    avatar: "/placeholder.svg",
  },
  {
    id: "6",
    name: "Sarah Brown",
    email: "sarah.brown@example.com",
    role: "Manager",
    status: "Active",
    lastActive: "5 hours ago",
    dateJoined: "Dec 1, 2022",
    orders: 0,
    spent: "$0.00",
    avatar: "/placeholder.svg",
  },
  {
    id: "7",
    name: "David Miller",
    email: "david.miller@example.com",
    role: "Customer",
    status: "Blocked",
    lastActive: "1 month ago",
    dateJoined: "Jan 30, 2023",
    orders: 2,
    spent: "$150.75",
    avatar: "/placeholder.svg",
  },
  {
    id: "8",
    name: "Jennifer Taylor",
    email: "jennifer.taylor@example.com",
    role: "Customer",
    status: "Active",
    lastActive: "1 week ago",
    dateJoined: "Mar 15, 2023",
    orders: 7,
    spent: "$1,050.30",
    avatar: "/placeholder.svg",
  },
  {
    id: "9",
    name: "Thomas Anderson",
    email: "thomas.anderson@example.com",
    role: "Customer",
    status: "Active",
    lastActive: "4 days ago",
    dateJoined: "Feb 20, 2023",
    orders: 4,
    spent: "$620.15",
    avatar: "/placeholder.svg",
  },
  {
    id: "10",
    name: "Lisa White",
    email: "lisa.white@example.com",
    role: "Support",
    status: "Active",
    lastActive: "12 hours ago",
    dateJoined: "May 5, 2023",
    orders: 0,
    spent: "$0.00",
    avatar: "/placeholder.svg",
  },
];

export default function UsersPage() {
  const router = useRouter();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginate users
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle select all users
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(paginatedUsers.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  // Handle select individual user
  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  };

  // Handle delete user
  const handleDeleteUser = (userId: string) => {
    setUserToDelete(userId);
    setIsDeleteDialogOpen(true);
  };

  // Confirm delete user
  const confirmDeleteUser = () => {
    // In a real app, you would call an API to delete the user
    console.log(`Deleting user with ID: ${userToDelete}`);
    setIsDeleteDialogOpen(false);
    setUserToDelete(null);
    // After successful deletion, you might want to refresh the user list
  };

  // Handle bulk actions
  const handleBulkAction = (action: string) => {
    if (action === "delete" && selectedUsers.length > 0) {
      // In a real app, you would call an API to delete the selected users
      console.log(`Deleting users with IDs: ${selectedUsers.join(", ")}`);
      // After successful deletion, you might want to refresh the user list
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <h2 className="text-3xl font-bold tracking-tight">
              User Management
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="hidden sm:flex"
              onClick={() => router.push("/admin/users/export")}
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button onClick={() => router.push("/admin/users/new")}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all-users" className="space-y-4">
          <div className="flex justify-between">
            <TabsList>
              <TabsTrigger value="all-users" className="flex gap-2">
                <Users className="h-4 w-4" />
                All Users
              </TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
              <TabsTrigger value="administrators">Administrators</TabsTrigger>
              <TabsTrigger value="staff">Staff</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all-users" className="space-y-4">
            <Card>
              <CardHeader className="p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex w-full max-w-md items-center gap-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-9"
                    />
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="h-9">
                          <Filter className="mr-2 h-4 w-4" />
                          Filter
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[200px]">
                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Checkbox id="status" className="mr-2" />
                          <Label htmlFor="status">Status</Label>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Checkbox id="role" className="mr-2" />
                          <Label htmlFor="role">Role</Label>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Checkbox id="date" className="mr-2" />
                          <Label htmlFor="date">Join Date</Label>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <Select>
                      <SelectTrigger className="h-9 w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Sort by</SelectLabel>
                          <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                          <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                          <SelectItem value="date-newest">Newest</SelectItem>
                          <SelectItem value="date-oldest">Oldest</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="h-9">
                          <SlidersHorizontal className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[180px]">
                        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Checkbox
                            id="col-name"
                            className="mr-2"
                            defaultChecked
                          />
                          <Label htmlFor="col-name">Name</Label>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Checkbox
                            id="col-email"
                            className="mr-2"
                            defaultChecked
                          />
                          <Label htmlFor="col-email">Email</Label>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Checkbox
                            id="col-role"
                            className="mr-2"
                            defaultChecked
                          />
                          <Label htmlFor="col-role">Role</Label>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Checkbox
                            id="col-status"
                            className="mr-2"
                            defaultChecked
                          />
                          <Label htmlFor="col-status">Status</Label>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Checkbox
                            id="col-last-active"
                            className="mr-2"
                            defaultChecked
                          />
                          <Label htmlFor="col-last-active">Last Active</Label>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Checkbox
                            id="col-joined"
                            className="mr-2"
                            defaultChecked
                          />
                          <Label htmlFor="col-joined">Date Joined</Label>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {selectedUsers.length > 0 && (
                  <div className="mb-4 flex items-center gap-2 rounded-lg bg-muted p-2">
                    <span className="text-sm font-medium">
                      {selectedUsers.length} user
                      {selectedUsers.length > 1 ? "s" : ""} selected
                    </span>
                    <div className="flex-1" />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          Actions
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Send email</DropdownMenuItem>
                        <DropdownMenuItem>Export selected</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleBulkAction("delete")}
                        >
                          Delete selected
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">
                          <Checkbox
                            checked={
                              paginatedUsers.length > 0 &&
                              selectedUsers.length === paginatedUsers.length
                            }
                            onCheckedChange={handleSelectAll}
                            aria-label="Select all"
                          />
                        </TableHead>
                        <TableHead>User</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Role
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Status
                        </TableHead>
                        <TableHead className="hidden lg:table-cell">
                          Last Active
                        </TableHead>
                        <TableHead className="hidden lg:table-cell">
                          Date Joined
                        </TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedUsers.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="h-24 text-center">
                            No users found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        paginatedUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <Checkbox
                                checked={selectedUsers.includes(user.id)}
                                onCheckedChange={(checked) =>
                                  handleSelectUser(user.id, checked as boolean)
                                }
                                aria-label={`Select ${user.name}`}
                              />
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                  <AvatarImage
                                    src={user.avatar || "/placeholder.svg"}
                                    alt={user.name}
                                  />
                                  <AvatarFallback>
                                    {user.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                  <span className="font-medium">
                                    {user.name}
                                  </span>
                                  <span className="text-sm text-muted-foreground">
                                    {user.email}
                                  </span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <Badge
                                variant="outline"
                                className={
                                  user.role === "Administrator"
                                    ? "bg-blue-50 text-blue-700 hover:bg-blue-50 hover:text-blue-700"
                                    : user.role === "Manager"
                                    ? "bg-purple-50 text-purple-700 hover:bg-purple-50 hover:text-purple-700"
                                    : user.role === "Support"
                                    ? "bg-amber-50 text-amber-700 hover:bg-amber-50 hover:text-amber-700"
                                    : "bg-gray-50 text-gray-700 hover:bg-gray-50 hover:text-gray-700"
                                }
                              >
                                {user.role}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <Badge
                                variant="outline"
                                className={
                                  user.status === "Active"
                                    ? "bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                                    : user.status === "Inactive"
                                    ? "bg-gray-50 text-gray-700 hover:bg-gray-50 hover:text-gray-700"
                                    : "bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700"
                                }
                              >
                                {user.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                              {user.lastActive}
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                              {user.dateJoined}
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() =>
                                      router.push(`/admin/users/${user.id}`)
                                    }
                                  >
                                    View details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      router.push(
                                        `/admin/users/edit/${user.id}`
                                      )
                                    }
                                  >
                                    Edit user
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-destructive focus:text-destructive"
                                    onClick={() => handleDeleteUser(user.id)}
                                  >
                                    Delete user
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing {paginatedUsers.length} of {filteredUsers.length}{" "}
                    users
                  </div>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                          }
                          className={
                            currentPage === 1
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              isActive={currentPage === page}
                              onClick={() => setCurrentPage(page)}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      )}
                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(prev + 1, totalPages)
                            )
                          }
                          className={
                            currentPage === totalPages
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Customers</CardTitle>
                <CardDescription>
                  Manage customer accounts and their information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <p>Customer management is available in the All Users tab.</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    You can filter by role to see only customers.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="administrators" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Administrators</CardTitle>
                <CardDescription>
                  Manage administrator accounts and their permissions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <p>
                    Administrator management is available in the All Users tab.
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    You can filter by role to see only administrators.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="staff" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Staff</CardTitle>
                <CardDescription>
                  Manage staff accounts and their access levels.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <p>Staff management is available in the All Users tab.</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    You can filter by role to see only staff members.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Delete User Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete User</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this user? This action cannot be
                undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDeleteUser}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </SidebarProvider>
  );
}
