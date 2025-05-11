"use client";

import { useState } from "react";
import SortDropdown from "./sort-dropdown";
import ProductCard from "@/components/shared/product-card";
import { Product } from "@/app/types/types";

export default function FeatureProducts({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const [sortOption, setSortOption] = useState("featured");

  const sorted = [...initialProducts].sort((a, b) => {
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
        return 0;
    }
  });

  return (
    <>
      <SortDropdown option={sortOption} setOption={setSortOption} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sorted.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </>
  );
}
