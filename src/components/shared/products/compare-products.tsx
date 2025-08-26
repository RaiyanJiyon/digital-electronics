"use client";

import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";

const CompareProducts = () => {
  return (
    <div className="w-full border border-gray-300 rounded-md overflow-hidden">
      <div className="bg-red-500 text-white text-sm font-bold py-3 px-4 uppercase">
        Compare Products
      </div>
      <div className="p-4 space-y-3">
        <p className="text-sm text-black">Select any product and click &quot;Add to Compare&quot; to start.</p>
        <Link href="/compare">
          <Button className="w-full bg-red-500 hover:bg-red-600 text-white text-sm py-2">
            <Eye className="w-4 h-4 mr-2" />
            Open Compare Page
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CompareProducts;
