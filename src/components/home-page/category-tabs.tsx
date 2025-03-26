"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import ProductCard from "../shared/ProductCard";

interface CategoryTabsProps {
  title?: string;
  categories: string[];
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
  className?: string;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  title = "New Arrivals",
  categories = [
    "SMARTPHONES",
    "LAPTOP",
    "COMPUTER",
    "SMART TELEVISIONS",
    "DIGITAL CAMERAS",
  ],
  activeCategory,
  onCategoryChange,
  className,
}) => {
  const [active, setActive] = useState(activeCategory || categories[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const handleCategoryChange = (category: string) => {
    setActive(category);
    setIsOpen(false);
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/products?page=1&limit=6`
      );
      if (!res.ok) {
        return null;
      }
      const data = await res.json();
      setProducts(data.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(products);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex xl:flex-row xl:items-center justify-between">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4 xl:mb-0">
          {title}
        </h2>

        {/* Mobile Dropdown (visible on small/medium screens) */}
        <div className="relative xl:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between border border-gray-300 rounded-md px-4 py-2 bg-white"
          >
            <span className="font-medium">{active}</span>
            <ChevronDown
              className={`h-5 w-5 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                    category === active ? "font-semibold" : ""
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Tabs (visible on large screens) */}
        <div className="hidden xl:flex border-b border-gray-200 w-full xl:w-auto xl:border-none">
          <div className="flex space-x-1">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-md font-medium text-xs 2xl:text-sm transition-colors ${
                  category === active
                    ? "bg-red-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal line (visible on all screens) */}
      <div className="w-full h-px bg-gray-200 mt-4"></div>
      {/* Render Filtered Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {products.filter(
          (product) => product.category?.toLowerCase() === active.toLowerCase()
        ).length > 0 ? (
          products
            .filter(
              (product) =>
                product.category?.toLowerCase() === active.toLowerCase()
            )
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        ) : (
          <div className="text-center text-gray-500 col-span-full">
            No products available for this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryTabs;
