"use client";

import type React from "react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaRegLightbulb, FaTruck } from "react-icons/fa";

const TopBar = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const languages = ["English", "FRENCH", "GERMAN", "BELGIUM", "HONDURAS"];
  const currencies = ["USD", "EUR", "GBP", "CAD"];

  return (
    <div className="w-full bg-white text-gray-600 py-4 px-4 border-b ">
      <div className="max-w-[1920px] mx-auto flex flex-wrap justify-between items-center">
        <div className="flex items-center gap-2">
          <FaRegLightbulb className="h-5 w-5 text-red-500" />
          <span className="text-lg">
            Get up to{" "}
            <span className="text-red-500 font-semibold">35% Off</span> cashback
            on First Order
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FaTruck className="h-4 w-4 text-red-500" />
            <Link href="/track-order" className="hover:text-red-500">
              Track Your Order
            </Link>
          </div>
          <span className="text-gray-600">|</span>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              {selectedLanguage} <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                >
                  {lang}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <span className="text-gray-600">|</span>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              {selectedCurrency} <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {currencies.map((currency) => (
                <DropdownMenuItem
                  key={currency}
                  onClick={() => setSelectedCurrency(currency)}
                >
                  {currency}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
