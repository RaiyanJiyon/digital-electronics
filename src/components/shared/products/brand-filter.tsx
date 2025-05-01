"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface BrandFilterProps {
  brands: string[];
  selectedBrand: string;
  onChange: (brand: string) => void;
}

const BrandFilter = ({ brands, selectedBrand, onChange }: BrandFilterProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBrands = brands.filter((brand) =>
    brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search brands..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8 h-8 text-sm"
        />
      </div>

      <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
        {filteredBrands.length > 0 ? (
          filteredBrands.map((brand) => (
            <div key={brand} className="flex items-center">
              <input
                type="radio"
                id={`brand-${brand}`}
                name="brand"
                value={brand}
                checked={selectedBrand === brand}
                onChange={() => onChange(brand)}
                className="h-4 w-4 text-red-600 focus:ring-red-500"
              />
              <label
                htmlFor={`brand-${brand}`}
                className="ml-2 text-sm text-gray-700 cursor-pointer truncate"
              >
                {brand}
              </label>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No brands found</p>
        )}
      </div>

      {selectedBrand && (
        <button
          onClick={() => onChange("")}
          className="text-xs text-red-600 hover:text-red-700"
        >
          Clear brand filter
        </button>
      )}
    </div>
  );
};

export default BrandFilter;
