"use client";

import { Search } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

const SearchWidget = ({ value, onChange, onSubmit }: Props) => {
  return (
    <div className="bg-[#f7f7f7] p-4 border border-gray-200 rounded-md">
      <form
        className="flex"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <Input
          type="text"
          placeholder="Search posts here..."
          className="rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <Button
          type="submit"
          className="bg-black hover:bg-gray-800 rounded-l-none px-3"
        >
          <Search className="w-4 h-4 text-white" />
        </Button>
      </form>
    </div>
  );
};

export default SearchWidget;
