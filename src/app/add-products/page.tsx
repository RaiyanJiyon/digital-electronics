"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { Trash2, Upload, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/new-york-v4/ui/select";
import { useSession } from "next-auth/react";

// Form validation schema
const productSchema = z.object({
  product_name: z.string().min(3, "Product name must be at least 3 characters"),
  category: z.string().min(1, "Please select a category"),
  price: z.coerce.number().positive("Price must be positive"),
  availability: z.string().min(1, "Please select availability"),
  rating: z.coerce.number().min(0).max(5, "Rating must be between 0 and 5"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  quantity: z.coerce.number().int().positive("Quantity must be a positive integer"),
  details: z.string().min(20, "Details must be at least 20 characters"),
  color: z.string().min(1, "Color is required"),
  size: z.string().min(1, "Size is required"),
  manufacturer: z.string().min(1, "Manufacturer is required"),
  product_types: z.string().min(1, "Product type is required"),
  email: z.string().email("Please enter a valid email"),
  phone_number: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(5, "Address is required"),
});

type ProductFormValues = z.infer<typeof productSchema>;

// imgBB API key
const API_KEY = "4f7db5cb8e27c23cd113273a96ce039c";

export default function AddProductPage() {
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Initialize form with default values
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      product_name: "",
      category: "",
      price: 0,
      availability: "In stock",
      rating: 0,
      description: "",
      quantity: 1,
      details: "",
      color: "",
      size: "",
      manufacturer: "",
      product_types: "",
      email: "",
      phone_number: "",
      address: "",
    },
  });

  // Upload image to imgBB
  const uploadToImgBB = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("key", API_KEY);

    try {
      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      const data = await response.json();
      return data.data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      const fileArray = Array.from(files);
      const totalFiles = fileArray.length;
      const uploadedUrls: string[] = [];

      for (let i = 0; i < fileArray.length; i++) {
        const file = fileArray[i];
        
        // Update progress
        setUploadProgress(Math.round(((i) / totalFiles) * 100));
        
        // Upload to imgBB
        const imageUrl = await uploadToImgBB(file);
        uploadedUrls.push(imageUrl);
        
        // Update images state after each successful upload
        setImages(prev => [...prev, imageUrl]);
      }

      setUploadProgress(100);
      toast.success(`Successfully uploaded ${uploadedUrls.length} images`);
    } catch (error) {
      console.error("Error in image upload:", error);
      toast.error("Failed to upload one or more images. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // Remove image
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Form submission handler
  const onSubmit = async (data: ProductFormValues) => {
    if (images.length === 0) {
      toast.error("Please upload at least one product image");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create the complete product object
      const productData = {
        ...data,
        images,
      };

      const res = await fetch(`http://localhost:3000/api/products`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(productData)
      })

      if (!res.ok) {
        console.error("Response is not okay")
      toast.error("Response failure. Please try again.")
      }

      // Here you would typically send this data to your API
      console.log("Product data to submit:", productData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Product added successfully!");
      
      // Reset form and images
      form.reset();
      setImages([]);
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Categories for dropdown
  const categories = [
    "Laptops",
    "Smartphones",
    "Tablets",
    "Desktops",
    "Monitors",
    "Accessories",
    "Audio",
    "Cameras",
    "Gaming",
    "Networking",
    "Storage",
    "Wearables",
  ];

  // Availability options
  const availabilityOptions = ["In stock", "Out of stock", "Pre-order", "Discontinued"];

  const { data: session, status } = useSession();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Add New Product</h1>
          <p className="text-gray-600 mt-2">
            Fill in the details below to add a new product to your inventory
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information Section */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="product_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name*</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter product name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category*</FormLabel>
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
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price ($)*</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="availability"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Availability*</FormLabel>
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
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity*</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating (0-5)*</FormLabel>
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

              <div className="mt-6">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Description*</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter a brief product description"
                          className="resize-none"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        A short summary that appears in product listings
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-6">
                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Details*</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter detailed product information"
                          className="resize-none"
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Comprehensive product details, specifications, and features
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Product Specifications */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Product Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color*</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Black, Silver, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Size*</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 14 inches, Medium, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="manufacturer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Manufacturer*</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Dell, Apple, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="product_types"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Type*</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Laptop, Smartphone, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email*</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="contact@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number*</FormLabel>
                      <FormControl>
                        <Input placeholder="+1234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-6">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address*</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter address"
                          className="resize-none"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Product Images */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Product Images</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Images* (Will be uploaded to imgBB)
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="image-upload"
                    className={`flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {isUploading ? (
                        <>
                          <Loader2 className="w-8 h-8 mb-2 text-gray-500 animate-spin" />
                          <p className="mb-2 text-sm text-gray-500">
                            Uploading... {uploadProgress}%
                          </p>
                        </>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 mb-2 text-gray-500" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG or WEBP (MAX. 5MB per image)
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      id="image-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      disabled={isUploading}
                    />
                  </label>
                </div>
                {images.length === 0 && !isUploading && (
                  <p className="text-sm text-red-500 mt-2">
                    At least one product image is required
                  </p>
                )}
              </div>

              {/* Preview uploaded images */}
              {images.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Uploaded Images ({images.length})
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className="relative group border border-gray-200 rounded-md overflow-hidden"
                      >
                        <div className="aspect-square relative">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Product image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Remove image"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset();
                  setImages([]);
                }}
                disabled={isSubmitting || isUploading}
              >
                Reset
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting || isUploading}
                className="min-w-[150px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add Product"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
