"use client";
import { Input } from "@/components/ui/input";
import { Product } from "@/lib/types";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoIosGitCompare, IoMdCheckmark } from "react-icons/io";
import { FaRegStar, FaRegStarHalfStroke } from "react-icons/fa6";

interface ImageSliderProps {
  product: Product;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ product }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleThumbnailClick = (index: number) => {
    setActiveImageIndex(index);
  };

  // Generate full stars, half stars, and empty stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar
          key={`full-${i}`}
          className="w-5 h-5 fill-yellow-400 text-yellow-400"
        />
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <FaRegStarHalfStroke key="half-star" className="w-5 h-5 text-yellow-400" />
      );
    }

    // Empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaRegStar key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
      {/* Left Column - Images */}
      <div className="space-y-6">
        {/* Main Image */}
        <div className="border border-gray-300 rounded-lg p-4 bg-white">
          <div className="relative h-[400px] md:h-[500px]">
            <Image
              src={product.images[activeImageIndex] || "/placeholder.svg"}
              alt={product.product_name}
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Thumbnail Images */}
        <div className="grid grid-cols-4 gap-3">
          {product.images.map((image, index) => (
            <div
              key={index}
              className={`border ${
                index === activeImageIndex
                  ? "border-2 border-red-500"
                  : "border-gray-300"
              } rounded-md p-2 cursor-pointer hover:border-red-500 transition`}
              onClick={() => handleThumbnailClick(index)}
            >
              <div className="relative h-20">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.product_name} - view ${index + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column - Product Info */}
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">{product.product_name}</h1>

        <div className="text-xl font-semibold text-red-500">
          ${product.price.toFixed(2)}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex">{renderStars(product.rating)}</div>
          <span className="text-sm text-gray-600">1 Review</span>
          <span className="text-sm text-blue-600 cursor-pointer hover:underline">
            Add Your Review
          </span>
        </div>

        <div className="flex items-center gap-2 text-green-600 font-medium">
          <IoMdCheckmark className="w-5 h-5" />
          {product.availability}
        </div>

        <div className="text-gray-500 text-md">
          <span className="text-black font-semibold">SKU:</span>{" "}
          {product._id.substring(product._id.length - 8).toUpperCase()}
        </div>

        <p className="text-gray-700 leading-relaxed">{product.description}</p>

        <div className="border-b border-gray-300"></div>

        {/* Add to Cart Section */}
        <div className="flex flex-wrap items-center gap-6 mt-4">
          {/* Quantity Input */}
          <div className="flex items-center gap-2">
            <span className="font-medium">Qty</span>
            <div className="border border-gray-300 rounded-md">
              <Input type="number" className="py-2 w-20 text-center" />
            </div>
          </div>

          {/* Add to Cart Button */}
          <button className="flex items-center gap-2 px-6 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition">
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>

          {/* Wishlist Button */}
          <button className="p-2 border border-gray-300 rounded-md hover:bg-red-500 hover:text-white transition">
            <Heart className="w-5 h-5 text-gray-500" />
          </button>

          {/* Compare Button */}
          <button className="p-2 border border-gray-300 rounded-md hover:bg-red-500 hover:text-white transition">
            <IoIosGitCompare className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;