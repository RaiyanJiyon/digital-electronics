"use client";
import { useState } from "react";
import {
  ChevronDown,
  Search,
  Star,
  StarHalf,
  Filter,
  Trash2,
  SortAsc,
  SortDesc,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar";

interface Reviews {
  id: string;
  productId: string;
  productName: string;
  customerId: string;
  customerName: string;
  rating: number;
  title: string;
  content: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  helpful: number;
  reported: boolean;
}

// Mock data for reviews
const mockReviews: Reviews[] = [
  {
    id: "rev-001",
    productId: "prod-001",
    productName: "Dell Inspiron 14 2-in-1 Laptop",
    customerId: "cust-001",
    customerName: "John Smith",
    rating: 4,
    title: "Great laptop for the price",
    content:
      "I've been using this laptop for a month now and I'm very satisfied with its performance. The battery life is excellent and the touchscreen is responsive. The only downside is that it gets a bit hot when running intensive applications.",
    status: "published",
    createdAt: "2023-04-15T10:30:00Z",
    updatedAt: "2023-04-15T10:30:00Z",
    helpful: 12,
    reported: false,
  },
  {
    id: "rev-002",
    productId: "prod-002",
    productName: 'Apple MacBook Pro 13"',
    customerId: "cust-002",
    customerName: "Sarah Johnson",
    rating: 5,
    title: "Best laptop I've ever owned",
    content:
      "This MacBook Pro exceeds all my expectations. The M1 chip is incredibly fast and efficient. I can work all day without charging, and the display is gorgeous. Highly recommend for professionals.",
    status: "published",
    createdAt: "2023-04-10T14:20:00Z",
    updatedAt: "2023-04-10T14:20:00Z",
    helpful: 24,
    reported: false,
  },
  {
    id: "rev-003",
    productId: "prod-003",
    productName: "Samsung Galaxy S22",
    customerId: "cust-003",
    customerName: "Michael Brown",
    rating: 2,
    title: "Disappointing battery life",
    content:
      "While the phone has great features and a beautiful display, the battery life is terrible. I have to charge it multiple times a day with normal use. Not what I expected from a flagship phone.",
    status: "published",
    createdAt: "2023-04-05T09:15:00Z",
    updatedAt: "2023-04-05T09:15:00Z",
    helpful: 18,
    reported: true,
  },
  {
    id: "rev-004",
    productId: "prod-001",
    productName: "Dell Inspiron 14 2-in-1 Laptop",
    customerId: "cust-004",
    customerName: "Emily Wilson",
    rating: 3,
    title: "Good but not great",
    content:
      "The laptop is decent for everyday tasks, but I've experienced some software glitches. The keyboard is comfortable to type on, and the screen quality is good. Overall, it's an okay purchase for the price.",
    status: "pending",
    createdAt: "2023-04-02T16:45:00Z",
    updatedAt: "2023-04-02T16:45:00Z",
    helpful: 5,
    reported: false,
  },
  {
    id: "rev-005",
    productId: "prod-004",
    productName: "Sony WH-1000XM4 Headphones",
    customerId: "cust-005",
    customerName: "David Lee",
    rating: 5,
    title: "Incredible noise cancellation",
    content:
      "These headphones are worth every penny. The noise cancellation is phenomenal, and the sound quality is crisp and balanced. Battery life is excellent, and they're comfortable to wear for hours. Best purchase I've made this year!",
    status: "published",
    createdAt: "2023-03-28T11:10:00Z",
    updatedAt: "2023-03-28T11:10:00Z",
    helpful: 31,
    reported: false,
  },
  {
    id: "rev-006",
    productId: "prod-005",
    productName: "LG 4K Smart TV",
    customerId: "cust-006",
    customerName: "Jessica Martinez",
    rating: 1,
    title: "Arrived damaged and poor customer service",
    content:
      "The TV arrived with a cracked screen. When I contacted customer service, they were unhelpful and took days to respond. I'm still waiting for a replacement after two weeks. Very disappointed with both the product and service.",
    status: "rejected",
    createdAt: "2023-03-25T13:30:00Z",
    updatedAt: "2023-03-25T13:30:00Z",
    helpful: 7,
    reported: true,
  },
  {
    id: "rev-007",
    productId: "prod-006",
    productName: "Logitech MX Master 3 Mouse",
    customerId: "cust-007",
    customerName: "Robert Taylor",
    rating: 4,
    title: "Excellent ergonomics and features",
    content:
      "This mouse has greatly improved my workflow. The ergonomic design prevents wrist strain, and the customizable buttons are very useful. Battery life is impressive too. The only reason I'm not giving 5 stars is because the software can be a bit buggy at times.",
    status: "published",
    createdAt: "2023-03-20T09:50:00Z",
    updatedAt: "2023-03-20T09:50:00Z",
    helpful: 15,
    reported: false,
  },
  {
    id: "rev-008",
    productId: "prod-007",
    productName: "Bose QuietComfort Earbuds",
    customerId: "cust-008",
    customerName: "Amanda Clark",
    rating: 3,
    title: "Good sound but uncomfortable for long use",
    content:
      "The sound quality and noise cancellation are excellent, but I find them uncomfortable to wear for more than an hour. They also don't stay in my ears well during workouts. Battery life is decent, but not as good as advertised.",
    status: "pending",
    createdAt: "2023-03-15T15:25:00Z",
    updatedAt: "2023-03-15T15:25:00Z",
    helpful: 9,
    reported: false,
  },
];

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState(mockReviews);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const itemsPerPage = 5;

  // Filter and sort reviews
  const filteredReviews = reviews
    .filter((review) => {
      const matchesSearch =
        review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || review.status === statusFilter;
      const matchesRating =
        ratingFilter === "all" ||
        (ratingFilter === "5" && review.rating === 5) ||
        (ratingFilter === "4" && review.rating === 4) ||
        (ratingFilter === "3" && review.rating === 3) ||
        (ratingFilter === "2" && review.rating === 2) ||
        (ratingFilter === "1" && review.rating === 1);
      return matchesSearch && matchesStatus && matchesRating;
    })
    .sort((a, b) => {
      if (sortField === "rating") {
        return sortDirection === "asc"
          ? a.rating - b.rating
          : b.rating - a.rating;
      } else if (sortField === "createdAt") {
        return sortDirection === "asc"
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortField === "helpful") {
        return sortDirection === "asc"
          ? a.helpful - b.helpful
          : b.helpful - a.helpful;
      }
      return 0;
    });

  // Pagination
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Render stars for rating
  const renderRatingStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (i - 0.5 === rating) {
        stars.push(
          <StarHalf
            key={i}
            className="h-4 w-4 fill-yellow-400 text-yellow-400"
          />
        );
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
      }
    }
    return <div className="flex">{stars}</div>;
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800">Published</Badge>;
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-800">
            Rejected
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="container mx-auto p-6">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <h1 className="text-3xl font-bold tracking-tight">
                Customer Reviews
              </h1>
            </div>
            <p className="text-muted-foreground">
              Manage and moderate customer reviews for your products.
            </p>
          </div>
          <div className="flex flex-col space-y-4">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{reviews.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Published
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {reviews.filter((r) => r.status === "published").length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Pending</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {reviews.filter((r) => r.status === "pending").length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Average Rating
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold mr-2">
                      {(
                        reviews.reduce(
                          (acc, review) => acc + review.rating,
                          0
                        ) / reviews.length
                      ).toFixed(1)}
                    </span>
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* Filters and Search */}
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
              <div className="flex flex-1 items-center space-x-2">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search reviews..."
                    className="w-full pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <div className="p-2">
                      <div className="mb-2">
                        <label className="text-xs font-medium">Status</label>
                        <Select
                          value={statusFilter}
                          onValueChange={setStatusFilter}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Filter by status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-xs font-medium">Rating</label>
                        <Select
                          value={ratingFilter}
                          onValueChange={setRatingFilter}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Filter by rating" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Ratings</SelectItem>
                            <SelectItem value="5">5 Stars</SelectItem>
                            <SelectItem value="4">4 Stars</SelectItem>
                            <SelectItem value="3">3 Stars</SelectItem>
                            <SelectItem value="2">2 Stars</SelectItem>
                            <SelectItem value="1">1 Star</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9">
                      {sortDirection === "asc" ? (
                        <SortAsc className="mr-2 h-4 w-4" />
                      ) : (
                        <SortDesc className="mr-2 h-4 w-4" />
                      )}
                      Sort by
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[180px]">
                    <DropdownMenuItem
                      onClick={() => {
                        setSortField("createdAt");
                        setSortDirection(
                          sortDirection === "asc" ? "desc" : "asc"
                        );
                      }}
                    >
                      Date{" "}
                      {sortField === "createdAt" &&
                        (sortDirection === "asc" ? "↑" : "↓")}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSortField("rating");
                        setSortDirection(
                          sortDirection === "asc" ? "desc" : "asc"
                        );
                      }}
                    >
                      Rating{" "}
                      {sortField === "rating" &&
                        (sortDirection === "asc" ? "↑" : "↓")}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSortField("helpful");
                        setSortDirection(
                          sortDirection === "asc" ? "desc" : "asc"
                        );
                      }}
                    >
                      Helpful{" "}
                      {sortField === "helpful" &&
                        (sortDirection === "asc" ? "↑" : "↓")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            {/* Reviews Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedReviews.length > 0 ? (
                    paginatedReviews.map((review) => (
                      <TableRow key={review.id}>
                        <TableCell className="font-medium">
                          {review.productName}
                        </TableCell>
                        <TableCell>{review.customerName}</TableCell>
                        <TableCell>
                          {renderRatingStars(review.rating)}
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          {review.title}
                        </TableCell>
                        <TableCell>{formatDate(review.createdAt)}</TableCell>
                        <TableCell>{getStatusBadge(review.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <ChevronDown className="h-4 w-4" />
                                  <span className="sr-only">More</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() => {
                                    // Add delete logic here
                                    console.log("Deleting review:", review.id);
                                    setReviews(
                                      reviews.filter((r) => r.id !== review.id)
                                    );
                                  }}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No reviews found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          isActive={currentPage === i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
