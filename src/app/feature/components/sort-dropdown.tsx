"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface SortDropdownProps {
  option: string;
  setOption: (value: string) => void;
}

const options = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "name", label: "Name" },
];

export default function SortDropdown({ option, setOption }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    setOption(value);
    setIsOpen(false);
  };

  const currentLabel =
    options.find((opt) => opt.value === option)?.label || "Sort";

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white"
      >
        <span className="font-medium">Sort by: {currentLabel}</span>
        <ChevronDown
          className={`h-5 w-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-56 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                option === opt.value ? "font-semibold bg-gray-50" : ""
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
