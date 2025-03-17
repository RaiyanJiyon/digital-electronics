"use client";

import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search entire store here...",
  className = "",
  onSearch,
}) => {
  const [query, setQuery] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className={`${className}`}>
      <form onSubmit={handleSubmit} className="bg-white relative m-4">
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full py-2 px-4 pr-12 border border-gray-300 rounded-md text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label="Search"
        >
          <Search className="h-6 w-6" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
