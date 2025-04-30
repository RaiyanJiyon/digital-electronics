"use client";

import { Heart, ShoppingCart, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { IoIosGitCompare, IoMdCheckmark } from "react-icons/io";
import { Product } from "@/app/types/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface ImageSliderProps {
  product: Product;
  onAddToCart?: (product: Product, quantity: number) => void;
  onAddToWishlist?: (product: Product) => void;
  onAddToCompare?: (product: Product) => void;
}

const ImageSlider = ({
  product,
  onAddToCompare,
}: ImageSliderProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { data: session } = useSession();
  const userId = session?.user.id;

  const handleThumbnailClick = (index: number) => setActiveImageIndex(index);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setQuantity(Math.max(1, value));
    }
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar
          key={`full-${i}`}
          className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400"
        />
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <FaStarHalfAlt
          key="half"
          className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400"
        />
      );
    }

    // Empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaRegStar
          key={`empty-${i}`}
          className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300"
        />
      );
    }

    return stars;
  };

  const handleWishlist = async (
    productId: string,
    productName: string,
    productImage: string
  ) => {
    if (!session?.user) return;
    console.log(productId);

    try {
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, productName, productImage, userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to wishlist");
      }

      // Show success message
      toast.success("Product added to wishlist");

      console.log("Successfully added to wishlist!");
      // Optional: Show toast notification
    } catch (error) {
      console.error("Wishlist error:", error);
      // Show error message
      toast.success("Product failed to add in wishlist");
    }
  };

  const handleAddToCart = async (
    productId: string,
    quantity: number,
    productName: string,
    productImage: string,
    price: number
  ) => {
    if (!session?.user) {
      toast.error("Please login to add items to cart");
      return;
    }
  
    try {
      const response = await fetch("/api/carts", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          quantity,
          productName,
          productImage,
          productPrice: price,
          userId: session.user.id,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Failed to add to cart");
      }
  
      toast.success(`${productName} added to cart`);
      console.log("Cart item:", data);
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error(
        error instanceof Error 
          ? error.message 
          : "Failed to add item to cart"
      );
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
      {/* Image Gallery */}
      <div className="space-y-4">
        <div className="border border-gray-300 rounded-lg p-4 bg-white">
          <div className="relative aspect-square">
            <Image
              src={product.images[activeImageIndex] || "/placeholder.svg"}
              alt={product.productName}
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {product.images.map((image, index) => (
            <button
              key={index}
              className={`border rounded-md p-2 cursor-pointer transition ${
                index === activeImageIndex
                  ? "border-2 border-red-500"
                  : "border-gray-300 hover:border-red-500"
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <div className="relative aspect-square">
                <Image
                  src={image}
                  alt={`${product.productName} thumbnail ${index + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{product.productName}</h1>
        <div className="text-xl font-semibold text-red-500">
          ${product.price.toFixed(2)}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex">{renderStars(product.rating)}</div>
          <span className="text-sm text-gray-600">1 Review</span>
          <button className="text-sm text-blue-600 hover:underline">
            Add Your Review
          </button>
        </div>

        <div className="flex items-center gap-2 text-blue-500 font-medium text-sm">
          <IoMdCheckmark className="w-5 h-5" />
          {product.availability}
        </div>

        <p className="text-sm text-gray-700">{product.description}</p>
        <div className="border-b border-gray-300 my-3"></div>

        {/* Add to Cart Section */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="font-medium">Qty</span>
            <div className="flex border border-gray-300 rounded-md">
              <button
                onClick={decrementQuantity}
                className="px-2 py-1 border-r border-gray-300 hover:bg-gray-100"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-16 py-1 text-center focus:outline-none"
                min="1"
              />
              <button
                onClick={incrementQuantity}
                className="px-2 py-1 border-l border-gray-300 hover:bg-gray-100"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <button
            onClick={() => handleAddToCart(product._id, quantity, product.productName, product.images[0], product.price)}
            className="flex items-center gap-2 px-6 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() =>
                    handleWishlist(
                      product._id,
                      product.productName,
                      product.images[0]
                    )
                  }
                  className={`p-2 border rounded-md transition ${
                    session?.user
                      ? "border-gray-300 hover:bg-red-500 hover:text-white"
                      : "border-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!session?.user}
                >
                  <Heart className="w-5 h-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {session?.user
                    ? "Add to wishlist"
                    : "Login to add to wishlist"}
                </p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onAddToCompare?.(product)}
                  className="p-2 border border-gray-300 rounded-md hover:bg-red-500 hover:text-white transition"
                >
                  <IoIosGitCompare className="w-5 h-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to compare</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
