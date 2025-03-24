"use client";

import type React from "react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

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
    "COMPUTER & LAPTOP",
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

  const handleCategoryChange = (category: string) => {
    setActive(category);
    setIsOpen(false);
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };

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
    </div>
  );
};

export default CategoryTabs;
