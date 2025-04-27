"use client"

import type { Product } from "@/lib/types"
import type React from "react"
import { useState } from "react"

interface TabSectionProps {
  product: Product
}

const TabSection: React.FC<TabSectionProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState("details")

  const tabs = [
    { id: "details", label: "Details" },
    { id: "moreInfo", label: "More Information" },
    { id: "reviews", label: "Reviews (1)" },
    { id: "custom", label: "Custom Tabs" },
  ]

  return (
    <div className="mt-8 md:mt-12">
      {/* Mobile Tabs (Vertical) */}
      <div className="md:hidden">
        <div className="grid grid-cols-1 gap-2 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-3 text-left rounded-md transition-colors ${
                activeTab === tab.id
                  ? "bg-red-500 text-white font-medium"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Tabs (Horizontal) */}
      <div className="hidden md:block border-b border-gray-200">
        <div className="flex flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-6 py-3 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-red-500 font-bold text-red-500"
                  : "border-transparent font-bold text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="py-4 md:py-6">
      {activeTab === "details" && (
  <div className="space-y-4">
    <p className="text-sm md:text-base text-gray-700 leading-relaxed word-break break-words overflow-hidden max-h-48 overflow-y-auto">
      {product.details}
    </p>
  </div>
)}

        {activeTab === "moreInfo" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-base md:text-lg">Specifications:</h3>
                <div className="space-y-2 text-sm md:text-base">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-semibold text-gray-800">Category:</span>
                    <span className="text-gray-700">{product.category}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-semibold text-gray-800">Product Type:</span>
                    <span className="text-gray-700">{product.product_types}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-semibold text-gray-800">Size:</span>
                    <span className="text-gray-700">{product.size}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-semibold text-gray-800">Color:</span>
                    <span className="text-gray-700">{product.color}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-semibold text-gray-800">Manufacturer:</span>
                    <span className="text-gray-700">{product.manufacturer}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-base md:text-lg">Contact Information:</h3>
                <div className="space-y-2 text-sm md:text-base">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-semibold text-gray-800">Email:</span>
                    <span className="text-gray-700 break-all">{product.email}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-semibold text-gray-800">Phone:</span>
                    <span className="text-gray-700">{product.phone_number}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-semibold text-gray-800">Address:</span>
                    <span className="text-gray-700">{product.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md text-sm md:text-base">
              <p className="text-gray-700">No reviews yet. Be the first to review this product!</p>
              <button className="mt-2 text-red-500 font-medium hover:underline">Write a Review</button>
            </div>
          </div>
        )}

        {activeTab === "custom" && (
          <div className="space-y-4">
            <p className="text-sm md:text-base text-gray-700">
              This tab can be customized to show additional product information, videos, manuals, or any other content
              you'd like to include.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TabSection

