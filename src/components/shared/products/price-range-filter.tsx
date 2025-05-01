"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PriceRangeFilterProps {
  minPrice: string;
  maxPrice: string;
  onApply: (min: string, max: string) => void;
}

const PriceRangeFilter = ({
  minPrice,
  maxPrice,
  onApply,
}: PriceRangeFilterProps) => {
  const [min, setMin] = useState(minPrice);
  const [max, setMax] = useState(maxPrice);

  useEffect(() => {
    setMin(minPrice);
    setMax(maxPrice);
  }, [minPrice, maxPrice]);

  const handleApply = () => {
    onApply(min, max);
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label
            htmlFor="min-price"
            className="text-xs text-gray-500 mb-1 block"
          >
            Min ($)
          </label>
          <Input
            id="min-price"
            type="number"
            min="0"
            placeholder="Min"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            className="h-8 text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="max-price"
            className="text-xs text-gray-500 mb-1 block"
          >
            Max ($)
          </label>
          <Input
            id="max-price"
            type="number"
            min="0"
            placeholder="Max"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            className="h-8 text-sm"
          />
        </div>
      </div>
      <Button
        onClick={handleApply}
        size="sm"
        className="w-full bg-red-600 hover:bg-red-700"
      >
        Apply
      </Button>
    </div>
  );
};

export default PriceRangeFilter;
