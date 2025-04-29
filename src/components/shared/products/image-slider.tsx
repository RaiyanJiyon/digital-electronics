"use client"

import { Heart, ShoppingCart, Minus, Plus } from "lucide-react"
import Image from "next/image"
import type React from "react"
import { useState } from "react"
import { FaStar } from "react-icons/fa"
import { IoIosGitCompare, IoMdCheckmark } from "react-icons/io"
import { FaRegStar, FaRegStarHalfStroke } from "react-icons/fa6"
import { Product } from "@/app/types/types"

interface ImageSliderProps {
  product: Product
  onAddToCart?: (product: Product, quantity: number) => void
  onAddToWishlist?: (product: Product) => void
  onAddToCompare?: (product: Product) => void
}

const ImageSlider: React.FC<ImageSliderProps> = ({ product, onAddToCart, onAddToWishlist, onAddToCompare }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const handleThumbnailClick = (index: number) => {
    setActiveImageIndex(index)
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value > 0) {
      setQuantity(value)
    }
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  // Generate full stars, half stars, and empty stars based on rating
  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />)
    }

    // Half star
    if (hasHalfStar) {
      stars.push(<FaRegStarHalfStroke key="half-star" className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />)
    }

    // Empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />)
    }

    return stars
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
      {/* Left Column - Images */}
      <div className="space-y-4 md:space-y-6">
        {/* Main Image */}
        <div className="border border-gray-300 rounded-lg p-2 sm:p-4 bg-white">
          <div className="relative w-full aspect-square">
            <Image
              src={product.images[activeImageIndex] || "/placeholder.svg"}
              alt={product.product_name}
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Thumbnail Images */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {product.images.map((image, index) => (
            <div
              key={index}
              className={`border ${
                index === activeImageIndex ? "border-2 border-red-500" : "border-gray-300"
              } rounded-md p-1 sm:p-2 cursor-pointer hover:border-red-500 transition`}
              onClick={() => handleThumbnailClick(index)}
            >
              <div className="relative aspect-square">
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
      <div className="space-y-6 sm:space-y-4">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold">{product.product_name}</h1>

        <div className="text-lg sm:text-xl font-semibold text-red-500">${product.price.toFixed(2)}</div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <div className="flex">{renderStars(product.rating)}</div>
          <span className="text-xs sm:text-sm text-gray-600">1 Review</span>
          <span className="text-xs sm:text-sm text-blue-600 cursor-pointer hover:underline">Add Your Review</span>
        </div>

        <div className="flex items-center gap-2 text-blue-500 font-medium text-xs sm:text-sm">
          <IoMdCheckmark className="w-4 h-4 sm:w-5 sm:h-5" />
          {product.availability}
        </div>

        <div className="text-xs sm:text-sm text-gray-500">
          <span className="text-black font-semibold">SKU:</span>{" "}
          {product._id?.substring(product._id.length - 8).toUpperCase() || "N/A"}
        </div>

        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{product.description}</p>

        <div className="border-b border-gray-300 my-2 sm:my-3"></div>

        {/* Add to Cart Section */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-6 sm:mt-4">
          {/* Quantity Input */}
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-sm font-medium">Qty</span>
            <div className="flex border border-gray-300 rounded-md">
              <button onClick={decrementQuantity} className="px-2 py-1 border-r border-gray-300 hover:bg-gray-100">
                <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="py-1 w-10 sm:w-16 text-center text-sm focus:outline-none"
                min="1"
              />
              <button onClick={incrementQuantity} className="px-2 py-1 border-l border-gray-300 hover:bg-gray-100">
                <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 bg-red-500 text-white text-xs sm:text-sm font-medium rounded-md hover:bg-red-600 transition"
            onClick={() => onAddToCart && onAddToCart(product, quantity)}
          >
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
            Add to Cart
          </button>

          {/* Wishlist Button */}
          <button
            className="p-2 border border-gray-300 rounded-md hover:bg-red-500 hover:text-white transition"
            onClick={() => onAddToWishlist && onAddToWishlist(product)}
          >
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 hover:text-white" />
          </button>

          {/* Compare Button */}
          <button
            className="p-2 border border-gray-300 rounded-md hover:bg-red-500 hover:text-white transition"
            onClick={() => onAddToCompare && onAddToCompare(product)}
          >
            <IoIosGitCompare className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 hover:text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImageSlider

