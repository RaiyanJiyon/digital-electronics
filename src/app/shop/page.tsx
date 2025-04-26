"use client";

import PageCover from "@/components/shared/PageCover";
import ProductCard from "@/components/shared/product-card";
import { Product } from "@/lib/types";
import { useEffect, useState } from "react";

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState<string | null>(null); // Add error state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products?page=1&limit=10");

        if (!response.ok) {
          throw new Error("Failed to fetch products data");
        }

        const data = await response.json();

        // Ensure we're setting the correct data structure
        setProducts(data.data || []);
      } catch (err) {
        setError((err as Error).message); // Handle errors
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {/* Page Cover */}
      <PageCover prev="Features" next="Shop" />

      {/* Main Content */}
      <div className="grid sm:grid-cols-4 gap-6 my-20">
        {/* Left Sidebar */}
        <div>
          <h1>Left contents</h1>
        </div>

        {/* Products Grid */}
        <div className="grid col-span-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {loading && (
            <p className="text-center col-span-full">Loading products...</p>
          )}

          {error && (
            <p className="text-red-500 text-center col-span-full">
              Error: {error}
            </p>
          )}

          {!loading && !error && products.length === 0 && (
            <p className="text-gray-500 text-center col-span-full">
              No products available.
            </p>
          )}

          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;