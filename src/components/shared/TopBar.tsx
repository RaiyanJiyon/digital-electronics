"use client"

import type React from "react"
import { useState } from "react"
import { MapPin, Truck, ChevronDown } from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const TopBar = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English")
  const [selectedCurrency, setSelectedCurrency] = useState("USD")

  const languages = ["English", "FRENCH", "GERMAN", "BELGIUM", "HONDURAS"]
  const currencies = ["USD", "EUR", "GBP", "CAD"]

  return (
    <div className="hidden md:flex bg-white text-gray-600 py-4 px-4 border-b ">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-red-500" />
          <span className="text-lg">
            Get up to <span className="text-red-500 font-semibold">35% Off</span> cashback on First Order
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-red-500" />
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
                <DropdownMenuItem key={lang} onClick={() => setSelectedLanguage(lang)}>
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
                <DropdownMenuItem key={currency} onClick={() => setSelectedCurrency(currency)}>
                  {currency}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default TopBar

