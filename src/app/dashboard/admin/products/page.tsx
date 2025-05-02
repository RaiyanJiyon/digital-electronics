"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Edit,
  Eye,
  Filter,
  ImageIcon,
  Loader2,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Avatar } from "@/components/ui/avatar";
import Image from "next/image";
import { toast } from "sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar";

// Type for product
interface Product {
  _id: string;
  productName: string;
  category: string;
  price: number;
  availability: string;
  rating: number;
  description: string;
  quantity: number;
  details: string;
  color: string;
  size: string;
  manufacturer: string;
  productTypes: string;
  images: string[];
  email: string;
  phoneNumber: string;
  address: string;
  status: string;
  createdAt?: string;
}

// Form schema using Zod
const productFormSchema = z.object({
  productName: z
    .string()
    .min(3, { message: "Product name must be at least 3 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
  price: z.coerce
    .number()
    .positive({ message: "Price must be a positive number" }),
  availability: z.string().min(1, { message: "Please select availability" }),
  rating: z.coerce
    .number()
    .min(0)
    .max(5, { message: "Rating must be between 0 and 5" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  quantity: z.coerce
    .number()
    .int()
    .nonnegative({ message: "Quantity must be a non-negative integer" }),
  details: z
    .string()
    .min(10, { message: "Details must be at least 10 characters" }),
  color: z.string().min(1, { message: "Color is required" }),
  size: z.string().min(1, { message: "Size is required" }),
  manufacturer: z.string().min(1, { message: "Manufacturer is required" }),
  productTypes: z.string().min(1, { message: "Product type is required" }),
  images: z
    .array(z.string().url({ message: "Invalid URL" }))
    .min(1, { message: "At least one image is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  status: z.string().min(1, { message: "Status is required" }),
});

// Categories
const categories = [
  "Laptop",
  "Smartphone",
  "Tablet",
  "Desktop",
  "Monitor",
  "Keyboard",
  "Mouse",
  "Headphone",
  "Camera",
  "Speaker",
  "Printer",
  "Storage",
  "Networking",
  "Accessories",
  "Other",
];

// Availability options
const availabilityOptions = [
  "In stock",
  "Low stock",
  "Out of stock",
  "Pre-order",
  "Discontinued",
];

// Product types
const productTypes = [
  "Laptop",
  "Desktop",
  "Smartphone",
  "Tablet",
  "Accessories",
  "Peripherals",
  "Components",
  "Other",
];

// Status options
const statusOptions = ["accept", "pending", "rejected"];

export default function ProductsPage() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedAvailability, setSelectedAvailability] = useState<string>("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [editImageUrls, setEditImageUrls] = useState<string[]>([]);
  const [editNewImageUrl, setEditNewImageUrl] = useState("");

  // Create form
  const createForm = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      productName: "",
      category: "",
      price: 0,
      availability: "In stock",
      rating: 0,
      description: "",
      quantity: 0,
      details: "",
      color: "",
      size: "",
      manufacturer: "",
      productTypes: "",
      images: [],
      email: "",
      phoneNumber: "",
      address: "",
      status: "pending",
    },
  });

  // Edit form
  const editForm = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      productName: "",
      category: "",
      price: 0,
      availability: "",
      rating: 0,
      description: "",
      quantity: 0,
      details: "",
      color: "",
      size: "",
      manufacturer: "",
      productTypes: "",
      images: [],
      email: "",
      phoneNumber: "",
      address: "",
      status: "",
    },
  });

  // Fetch products on component mount and when filter conditions change
  useEffect(() => {
    fetchProducts();
  }, [
    currentPage,
    productsPerPage,
    searchTerm,
    selectedCategory,
    selectedAvailability,
  ]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = `/api/products?page=${currentPage}&limit=${productsPerPage}`;

      if (searchTerm) {
        url += `&search=${encodeURIComponent(searchTerm)}`;
      }

      if (selectedCategory) {
        url += `&category=${encodeURIComponent(selectedCategory)}`;
      }

      if (selectedAvailability) {
        url += `&availability=${encodeURIComponent(selectedAvailability)}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setProducts(data.data);
        setTotalProducts(data.total);
      } else {
        toast("Error", {
          description: data.message || "Failed to fetch products",
        });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast("Error", {
        description: "An unexpected error occurred while fetching products",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle create product form submission
  const onCreateSubmit = async (values: z.infer<typeof productFormSchema>) => {
    setLoading(true);
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.success) {
        toast("Success", {
          description: "Product created successfully",
        });
        setIsCreateDialogOpen(false);
        createForm.reset();
        setImageUrls([]);
        fetchProducts();
      } else {
        toast("Error", {
          description: data.message || "Failed to create product",
        });
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast("Error", {
        description: "An unexpected error occurred while creating the product",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle edit product form submission
  const onEditSubmit = async (values: z.infer<typeof productFormSchema>) => {
    if (!currentProduct?._id) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/products/${currentProduct._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.success) {
        toast("Success", {
          description: "Product updated successfully",
        });
        setIsEditDialogOpen(false);
        editForm.reset();
        setEditImageUrls([]);
        fetchProducts();
      } else {
        toast("Error", {
          description: data.message || "Failed to update product",
        });
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast("Error", {
        description: "An unexpected error occurred while updating the product",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle delete product
  const handleDeleteProduct = async () => {
    if (!currentProduct?._id) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/products/${currentProduct._id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        toast("Success", {
          description: "Product deleted successfully",
        });
        setIsDeleteDialogOpen(false);
        fetchProducts();
      } else {
        toast("Error", {
          description: data.message || "Failed to delete product",
        });
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast("Error", {
        description: "An unexpected error occurred while deleting the product",
      });
    } finally {
      setLoading(false);
    }
  };

  // Open edit dialog and populate form
  const openEditDialog = (product: Product) => {
    setCurrentProduct(product);
    setEditImageUrls(product.images || []);

    editForm.reset({
      productName: product.productName,
      category: product.category,
      price: product.price,
      availability: product.availability,
      rating: product.rating,
      description: product.description,
      quantity: product.quantity,
      details: product.details,
      color: product.color,
      size: product.size,
      manufacturer: product.manufacturer,
      productTypes: product.productTypes,
      images: product.images,
      email: product.email,
      phoneNumber: product.phoneNumber,
      address: product.address,
      status: product.status,
    });

    setIsEditDialogOpen(true);
  };

  // Open delete dialog
  const openDeleteDialog = (product: Product) => {
    setCurrentProduct(product);
    setIsDeleteDialogOpen(true);
  };

  // Open view dialog
  const openViewDialog = (product: Product) => {
    setCurrentProduct(product);
    setIsViewDialogOpen(true);
  };

  // Handle adding image URL to form
  const handleAddImageUrl = () => {
    if (newImageUrl && newImageUrl.trim() !== "") {
      const updatedUrls = [...imageUrls, newImageUrl];
      setImageUrls(updatedUrls);
      createForm.setValue("images", updatedUrls);
      setNewImageUrl("");
    }
  };

  // Handle removing image URL from form
  const handleRemoveImageUrl = (index: number) => {
    const updatedUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(updatedUrls);
    createForm.setValue("images", updatedUrls);
  };

  // Handle adding image URL to edit form
  const handleAddEditImageUrl = () => {
    if (editNewImageUrl && editNewImageUrl.trim() !== "") {
      const updatedUrls = [...editImageUrls, editNewImageUrl];
      setEditImageUrls(updatedUrls);
      editForm.setValue("images", updatedUrls);
      setEditNewImageUrl("");
    }
  };

  // Handle removing image URL from edit form
  const handleRemoveEditImageUrl = (index: number) => {
    const updatedUrls = editImageUrls.filter((_, i) => i !== index);
    setEditImageUrls(updatedUrls);
    editForm.setValue("images", updatedUrls);
  };

  // Calculate pagination info
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startItem = (currentPage - 1) * productsPerPage + 1;
  const endItem = Math.min(currentPage * productsPerPage, totalProducts);

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Products Management
          </h1>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add New Product
          </Button>
        </div>

        <Separator />

        {/* Filters and search */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full md:w-[200px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <span>{selectedCategory || "Category"}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedAvailability}
                onValueChange={setSelectedAvailability}
              >
                <SelectTrigger className="w-full md:w-[200px]">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <span>{selectedAvailability || "Availability"}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Availability</SelectItem>
                  {availabilityOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Products table */}
        <Card>
          <CardHeader>
            <CardTitle>Products ({totalProducts})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading && products.length === 0 ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Availability</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={7}
                            className="text-center py-8 text-muted-foreground"
                          >
                            No products found
                          </TableCell>
                        </TableRow>
                      ) : (
                        products.map((product) => (
                          <TableRow key={product._id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-3">
                                {product.images && product.images.length > 0 ? (
                                  <Avatar className="h-9 w-9 rounded-sm">
                                    <Image
                                      src={
                                        product.images[0] || "/placeholder.svg"
                                      }
                                      alt={product.productName}
                                      width={40}
                                      height={40}
                                      className="object-cover"
                                      onError={(e) => {
                                        const target =
                                          e.target as HTMLImageElement;
                                        target.src =
                                          "/placeholder.svg?height=36&width=36";
                                      }}
                                    />
                                  </Avatar>
                                ) : (
                                  <Avatar className="h-9 w-9 rounded-sm">
                                    <ImageIcon className="h-5 w-5" />
                                  </Avatar>
                                )}
                                <span className="truncate max-w-[200px]">
                                  {product.productName}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>${product.price.toFixed(2)}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  product.availability === "In stock"
                                    ? "default"
                                    : product.availability === "Low stock"
                                    ? "outline"
                                    : product.availability === "Out of stock"
                                    ? "destructive"
                                    : "secondary"
                                }
                              >
                                {product.availability}
                              </Badge>
                            </TableCell>
                            <TableCell>{product.quantity}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  product.status === "accept"
                                    ? "default"
                                    : product.status === "pending"
                                    ? "outline"
                                    : "destructive"
                                }
                              >
                                {product.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Open menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() => openViewDialog(product)}
                                  >
                                    <Eye className="mr-2 h-4 w-4" /> View
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => openEditDialog(product)}
                                  >
                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-destructive focus:text-destructive"
                                    onClick={() => openDeleteDialog(product)}
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
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

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-muted-foreground">
                      Showing {startItem} to {endItem} of {totalProducts}{" "}
                      products
                    </p>
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() =>
                              setCurrentPage((prev) => Math.max(prev - 1, 1))
                            }
                            className={
                              currentPage <= 1
                                ? "pointer-events-none opacity-50"
                                : ""
                            }
                          />
                        </PaginationItem>

                        {Array.from({ length: Math.min(totalPages, 5) }).map(
                          (_, i) => {
                            let pageNumber: number;

                            // Calculate which page numbers to show
                            if (totalPages <= 5) {
                              pageNumber = i + 1;
                            } else if (currentPage <= 3) {
                              pageNumber = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                              pageNumber = totalPages - 4 + i;
                            } else {
                              pageNumber = currentPage - 2 + i;
                            }

                            return (
                              <PaginationItem key={i}>
                                <PaginationLink
                                  onClick={() => setCurrentPage(pageNumber)}
                                  isActive={currentPage === pageNumber}
                                >
                                  {pageNumber}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          }
                        )}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() =>
                              setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                              )
                            }
                            className={
                              currentPage >= totalPages
                                ? "pointer-events-none opacity-50"
                                : ""
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Create product dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new product. All fields marked
                with * are required.
              </DialogDescription>
            </DialogHeader>

            <Form {...createForm}>
              <form
                onSubmit={createForm.handleSubmit(onCreateSubmit)}
                className="space-y-6"
              >
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="images">Images & Contact</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={createForm.control}
                        name="productName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Name *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter product name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={createForm.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category *</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category} value={category}>
                                    {category}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={createForm.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price ($) *</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                step="0.01"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={createForm.control}
                        name="availability"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Availability *</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select availability" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {availabilityOptions.map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={createForm.control}
                        name="quantity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quantity *</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={createForm.control}
                        name="rating"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rating (0-5) *</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                max="5"
                                step="0.1"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={createForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter product description"
                              className="min-h-24"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  <TabsContent value="details" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={createForm.control}
                        name="productTypes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Type *</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select product type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {productTypes.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={createForm.control}
                        name="manufacturer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Manufacturer *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter manufacturer"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={createForm.control}
                        name="color"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Color *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter color" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={createForm.control}
                        name="size"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Size *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter size" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={createForm.control}
                      name="details"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Detailed Specifications *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter detailed product specifications"
                              className="min-h-32"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={createForm.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status *</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {statusOptions.map((status) => (
                                <SelectItem key={status} value={status}>
                                  {status}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  <TabsContent value="images" className="space-y-4">
                    <div className="space-y-4">
                      <FormItem>
                        <FormLabel>Product Images *</FormLabel>
                        <FormDescription>
                          Add image URLs for your product. At least one image is
                          required.
                        </FormDescription>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter image URL"
                            value={newImageUrl}
                            onChange={(e) => setNewImageUrl(e.target.value)}
                          />
                          <Button type="button" onClick={handleAddImageUrl}>
                            Add
                          </Button>
                        </div>

                        {imageUrls.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                            {imageUrls.map((url, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 p-2 border rounded-md"
                              >
                                <Image
                                  src={url || "/placeholder.svg"}
                                  alt={`Product image ${index + 1}`}
                                  className="h-10 w-10 object-cover rounded-sm"
                                  width={40}
                                  height={40}
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src =
                                      "/placeholder.svg?height=40&width=40";
                                  }}
                                />
                                <span className="text-xs truncate flex-1">
                                  {url}
                                </span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleRemoveImageUrl(index)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground mt-2">
                            No images added yet
                          </p>
                        )}
                        {createForm.formState.errors.images && (
                          <p className="text-sm font-medium text-destructive">
                            {createForm.formState.errors.images.message}
                          </p>
                        )}
                      </FormItem>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={createForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contact Email *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter contact email"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={createForm.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter phone number"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={createForm.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter address"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Create Product
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Edit product dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
              <DialogDescription>
                Update the product details. All fields marked with * are
                required.
              </DialogDescription>
            </DialogHeader>

            <Form {...editForm}>
              <form
                onSubmit={editForm.handleSubmit(onEditSubmit)}
                className="space-y-6"
              >
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="images">Images & Contact</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={editForm.control}
                        name="productName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Name *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter product name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={editForm.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category *</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category} value={category}>
                                    {category}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={editForm.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price ($) *</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                step="0.01"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={editForm.control}
                        name="availability"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Availability *</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select availability" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {availabilityOptions.map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={editForm.control}
                        name="quantity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quantity *</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={editForm.control}
                        name="rating"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rating (0-5) *</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                max="5"
                                step="0.1"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={editForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter product description"
                              className="min-h-24"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  <TabsContent value="details" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={editForm.control}
                        name="productTypes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Type *</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select product type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {productTypes.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={editForm.control}
                        name="manufacturer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Manufacturer *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter manufacturer"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={editForm.control}
                        name="color"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Color *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter color" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={editForm.control}
                        name="size"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Size *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter size" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={editForm.control}
                      name="details"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Detailed Specifications *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter detailed product specifications"
                              className="min-h-32"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={editForm.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status *</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {statusOptions.map((status) => (
                                <SelectItem key={status} value={status}>
                                  {status}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  <TabsContent value="images" className="space-y-4">
                    <div className="space-y-4">
                      <FormItem>
                        <FormLabel>Product Images *</FormLabel>
                        <FormDescription>
                          Add image URLs for your product. At least one image is
                          required.
                        </FormDescription>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter image URL"
                            value={editNewImageUrl}
                            onChange={(e) => setEditNewImageUrl(e.target.value)}
                          />
                          <Button type="button" onClick={handleAddEditImageUrl}>
                            Add
                          </Button>
                        </div>

                        {editImageUrls.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                            {editImageUrls.map((url, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 p-2 border rounded-md"
                              >
                                <Image
                                  src={url || "/placeholder.svg"}
                                  width={40}
                                  height={40}
                                  alt={`Product image ${index + 1}`}
                                  className="h-10 w-10 object-cover rounded-sm"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src =
                                      "/placeholder.svg?height=40&width=40";
                                  }}
                                />
                                <span className="text-xs truncate flex-1">
                                  {url}
                                </span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                    handleRemoveEditImageUrl(index)
                                  }
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground mt-2">
                            No images added yet
                          </p>
                        )}
                        {editForm.formState.errors.images && (
                          <p className="text-sm font-medium text-destructive">
                            {editForm.formState.errors.images.message}
                          </p>
                        )}
                      </FormItem>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={editForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contact Email *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter contact email"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={editForm.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter phone number"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={editForm.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter address"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Update Product
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Delete product dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Product</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this product? This action cannot
                be undone.
              </DialogDescription>
            </DialogHeader>

            {currentProduct && (
              <div className="flex items-center gap-3 py-2">
                {currentProduct.images && currentProduct.images.length > 0 ? (
                  <Avatar className="h-12 w-12 rounded-sm">
                    <Image
                      src={currentProduct.images[0] || "/placeholder.svg"}
                      alt={currentProduct.productName}
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg?height=48&width=48";
                      }}
                    />
                  </Avatar>
                ) : (
                  <Avatar className="h-12 w-12 rounded-sm">
                    <ImageIcon className="h-6 w-6" />
                  </Avatar>
                )}
                <div className="space-y-1">
                  <h4 className="text-sm font-medium leading-none">
                    {currentProduct.productName}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {currentProduct.category} · $
                    {currentProduct.price.toFixed(2)}
                  </p>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteProduct}
                disabled={loading}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View product dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Product Details</DialogTitle>
            </DialogHeader>

            {currentProduct && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    {/* Product Images */}
                    <div className="rounded-md border overflow-hidden">
                      {currentProduct.images &&
                      currentProduct.images.length > 0 ? (
                        <Image
                          src={currentProduct.images[0] || "/placeholder.svg"}
                          alt={currentProduct.productName}
                          width={40}
                          height={40}
                          className="w-full h-64 object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src =
                              "/placeholder.svg?height=256&width=384";
                          }}
                        />
                      ) : (
                        <div className="w-full h-64 bg-muted flex items-center justify-center">
                          <ImageIcon className="h-16 w-16 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Thumbnail gallery */}
                    {currentProduct.images &&
                      currentProduct.images.length > 1 && (
                        <div className="grid grid-cols-4 gap-2 mt-2">
                          {currentProduct.images
                            .slice(0, 4)
                            .map((img, index) => (
                              <div
                                key={index}
                                className="rounded-md border overflow-hidden"
                              >
                                <Image
                                  src={img || "/placeholder.svg"}
                                  alt={`${currentProduct.productName} ${
                                    index + 1
                                  }`}
                                  width={40}
                                  height={40}
                                  className="w-full h-16 object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src =
                                      "/placeholder.svg?height=64&width=64";
                                  }}
                                />
                              </div>
                            ))}
                        </div>
                      )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold">
                        {currentProduct.productName}
                      </h2>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge>{currentProduct.category}</Badge>
                        <Badge
                          variant={
                            currentProduct.availability === "In stock"
                              ? "default"
                              : currentProduct.availability === "Low stock"
                              ? "outline"
                              : currentProduct.availability === "Out of stock"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {currentProduct.availability}
                        </Badge>
                        <Badge variant="outline">
                          {currentProduct.rating} ★
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-3xl font-bold">
                        ${currentProduct.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Quantity in stock: {currentProduct.quantity}
                      </p>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <h3 className="font-medium">Description</h3>
                      <p className="text-sm">{currentProduct.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      <div>
                        <p className="text-sm font-medium">Manufacturer</p>
                        <p className="text-sm">{currentProduct.manufacturer}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Product Type</p>
                        <p className="text-sm">{currentProduct.productTypes}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Color</p>
                        <p className="text-sm">{currentProduct.color}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Size</p>
                        <p className="text-sm">{currentProduct.size}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Detailed Specifications</h3>
                  <p className="text-sm whitespace-pre-line">
                    {currentProduct.details}
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="font-medium">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm">{currentProduct.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm">{currentProduct.phoneNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Address</p>
                      <p className="text-sm">{currentProduct.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </SidebarProvider>
  );
}
