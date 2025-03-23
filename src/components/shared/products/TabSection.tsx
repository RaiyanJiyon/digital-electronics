"use client";

import { Product } from "@/lib/types";
import React, { useState } from "react";

interface TabSectionProps {
  product: Product;
}

const TabSection: React.FC<TabSectionProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="mt-12">
      <div className="border-b border-gray-200">
        <div className="flex">
          {["details", "moreInfo", "reviews", "custom"].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-3 border-b-2 ${
                activeTab === tab
                  ? "border-red-500 font-bold text-red-500"
                  : "font-bold hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "details"
                ? "Details"
                : tab === "moreInfo"
                ? "More Information"
                : tab === "reviews"
                ? "Reviews (1)"
                : "Custom Tabs"}
            </button>
          ))}
        </div>
      </div>

      <div className="py-6">
        {activeTab === "details" && (
          <p className="text-gray-700 leading-relaxed">{product.details}</p>
        )}
        {activeTab === "moreInfo" && (
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-lg">Specifications:</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>
                  <span className="font-semibold text-black">Category:</span>{" "}
                  {product.category}
                </li>
                <li>
                  <span className="font-semibold text-black">
                    Product Type:
                  </span>{" "}
                  {product.product_types}
                </li>
                <li>
                  <span className="font-semibold text-black">Size:</span>{" "}
                  {product.size}
                </li>
                <li>
                  <span className="font-semibold text-black">Color:</span>{" "}
                  {product.color}
                </li>
                <li>
                  <span className="font-semibold text-black">Manufacture:</span>{" "}
                  {product.manufacturer}
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-lg">
                Contact Information:
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>
                  <span className="font-semibold text-black">Email:</span>{" "}
                  {product.email}
                </li>
                <li>
                  <span className="font-semibold text-black">Phone:</span>{" "}
                  {product.phone_number}
                </li>
                <li>
                  <span className="font-semibold text-black">Address:</span>{" "}
                  {product.address}
                </li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === "reviews" && (
          <p className="text-gray-700">Reviews will be shown here.</p>
        )}
        {activeTab === "custom" && (
          <p className="text-gray-700">Custom tab content here.</p>
        )}
      </div>
    </div>
  );
};

export default TabSection;
