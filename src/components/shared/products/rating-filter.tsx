"use client";

import { Star } from "lucide-react";

interface RatingFilterProps {
  selectedRating: string;
  onChange: (rating: string) => void;
}

const RatingFilter = ({ selectedRating, onChange }: RatingFilterProps) => {
  const ratings = [5, 4, 3, 2, 1];

  return (
    <div className="space-y-2">
      {ratings.map((rating) => (
        <div key={rating} className="flex items-center">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="rating"
              value={rating}
              checked={selectedRating === rating.toString()}
              onChange={() => onChange(rating.toString())}
              className="sr-only"
            />
            <span
              className={`flex items-center ${
                selectedRating === rating.toString()
                  ? "text-amber-500"
                  : "text-gray-400"
              }`}
            >
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < rating ? "fill-current" : "fill-none"
                    }`}
                  />
                ))}
              <span className="ml-2 text-sm text-gray-600">& Up</span>
            </span>
          </label>
        </div>
      ))}
      {selectedRating && (
        <button
          onClick={() => onChange("")}
          className="text-xs text-red-600 hover:text-red-700 mt-1"
        >
          Clear rating filter
        </button>
      )}
    </div>
  );
};

export default RatingFilter;
