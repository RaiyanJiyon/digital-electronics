"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";

const HeaderNav = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const categories = [
    "All Categories",
    "Smartphones",
    "Laptops",
    "Accessories",
    "Audio",
    "Cameras",
  ];

  return (
    <header className="bg-[#1a1a1a] py-3 px-4">
      <div className="max-w-[1920px] mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <div className="flex items-center">
            <Image
              src="https://i.ibb.co.com/zWC4rqvy/logo.png"
              alt="Digital Electronics"
              width={100}
              height={60}
              className="h-14 w-auto"
            />
          </div>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-md flex bg-white rounded-sm py-1">
          <Input
            type="text"
            placeholder="Enter keywords to search..."
            className="rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-transparent focus:border-none"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="rounded-none border-transparent border-l-1 border-l-gray-300 border-r-0 bg-white hover:bg-gray-50 text-gray-700 font-normal"
              >
                {selectedCategory} <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="bg-red-500 hover:bg-red-600 mr-1">
            <IoSearch className="h-4 w-4" />
            <span className="ml-2 hidden sm:inline">Search</span>
          </Button>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-6 text-white">
          <div
            className="flex items-center gap-2"
          >
            <FaRegUser className="h-5 w-5" />
            <div className="hidden sm:block space-x-2">
              <Link href={'/login'} className="text-sm whitespace-nowrap hover:text-red-500 hover:font-medium">LOGIN</Link>
              <span className="text-sm whitespace-nowrap">/</span>
              <Link href={'/register'} className="text-sm whitespace-nowrap hover:text-red-500 hover:font-medium">REGISTER</Link>
            </div>
          </div>

          <Link
            href="/wishlist"
            className="hidden xl:flex items-center gap-2 hover:text-red-500 relative"
          >
            <div className="relative mr-1">
              <FaRegHeart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </div>
            <div className="hidden xl:block">
              <span className="text-sm whitespace-nowrap">MY WISHLIST</span>
            </div>
          </Link>

          <Link
            href="/cart"
            className="flex items-center gap-2 hover:text-red-500"
          >
            <div className="relative mr-1">
              <FiShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </div>
            <div className="hidden sm:block">
              <span className="text-sm whitespace-nowrap">
                MY CART- <span className="text-red-500 font-bold">$0.00</span>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderNav;
