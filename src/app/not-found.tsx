"use client"

import Link from "next/link"
import Image from "next/image"
import { Search, Home, ShoppingBag, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-3xl w-full bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-red-600 h-2 w-full"></div>

          <div className="p-6 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* 404 Image/Illustration */}
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="relative w-64 h-64">
                  <Image
                    src="/assets/images/not_found.jpg"
                    alt="Page not found"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Oops! Page Not Found</h1>
                <p className="text-gray-600 mb-6">
                  We can&apos;t seem to find the page you&apos;re looking for. It might have been moved, deleted, or never
                  existed.
                </p>

                {/* Search */}
                <div className="mb-6">
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Search for products..."
                      className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <button className="bg-red-600 text-white px-4 py-2 rounded-r-md hover:bg-green-700 transition-colors">
                      <Search className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Navigation Options */}
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <Link
                    href="/"
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </Link>

                  <Link
                    href="/shop"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>Shop</span>
                  </Link>

                  <button
                    onClick={() => window.history.back()}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Go Back</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
