"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import ProductCard from "@/components/shared/product-card";
import Loading from "../loading";
import { Product } from "../types/types";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function FeaturePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState("featured");
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Fetch featured products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/feature");

        if (!response.ok) {
          throw new Error("Failed to fetch featured products");
        }

        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Sort products based on selected option
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "name":
        return a.productName.localeCompare(b.productName);
      default:
        return 0; // Keep original order for "featured"
    }
  });

  // Handle sort option change
  const handleSortChange = (option: string) => {
    setSortOption(option);
    setIsSortOpen(false);
  };

  // Render loading state
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with title and sort dropdown */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-2xl font-bold">Top Rated Products</h1>

        {/* Sort Dropdown */}
        <div className="relative mt-4 sm:mt-0">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white"
          >
            <span>
              Sort by:{" "}
              <span className="font-medium">
                {sortOption === "featured" && "Featured"}
                {sortOption === "price-low" && "Price: Low to High"}
                {sortOption === "price-high" && "Price: High to Low"}
                {sortOption === "rating" && "Highest Rated"}
                {sortOption === "name" && "Name"}
              </span>
            </span>
            <ChevronDown
              className={`h-5 w-5 transition-transform ${
                isSortOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isSortOpen && (
            <div className="absolute right-0 z-10 mt-1 w-56 bg-white border border-gray-300 rounded-md shadow-lg">
              <button
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                  sortOption === "featured" ? "font-semibold bg-gray-50" : ""
                }`}
                onClick={() => handleSortChange("featured")}
              >
                Featured
              </button>
              <button
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                  sortOption === "price-low" ? "font-semibold bg-gray-50" : ""
                }`}
                onClick={() => handleSortChange("price-low")}
              >
                Price: Low to High
              </button>
              <button
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                  sortOption === "price-high" ? "font-semibold bg-gray-50" : ""
                }`}
                onClick={() => handleSortChange("price-high")}
              >
                Price: High to Low
              </button>
              <button
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                  sortOption === "rating" ? "font-semibold bg-gray-50" : ""
                }`}
                onClick={() => handleSortChange("rating")}
              >
                Highest Rated
              </button>
              <button
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                  sortOption === "name" ? "font-semibold bg-gray-50" : ""
                }`}
                onClick={() => handleSortChange("name")}
              >
                Name
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Horizontal line */}
      <Separator className="mb-8" />

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="p-6 bg-gray-50 border border-gray-200 rounded-md text-center">
          <p className="text-gray-500">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {/* Featured Banner */}
      <div className="mt-12 relative rounded-lg overflow-hidden">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/80 to-red-700/80 z-10"></div>

        {/* Content Container with Fixed Height */}
        <div className="relative z-20 flex flex-col justify-center items-center text-white h-[200px] p-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Special Offers
          </h2>
          <p className="text-center max-w-md mb-4">
            Discover amazing deals on our featured products. Limited time offers
            available now!
          </p>
          <Link href={"/shop"}>
            <button className="px-6 py-2 bg-white text-red-500 font-medium rounded-md hover:bg-gray-100">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
