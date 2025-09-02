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
import { addToLocalCart, addToLocalWishlist } from "@/lib/localStorage";

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
    if (!session?.user) {
      // Add to localStorage for guest users
      const success = addToLocalWishlist({
        productId,
        productName,
        productImage,
        productPrice: product.price,
      });
      
      if (success) {
        toast.success("Product added to wishlist");
        // Notify listeners that wishlist has changed
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("wishlistUpdated"));
        }
      } else {
        toast.error("Product already in wishlist");
      }
      return;
    }

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
      // Notify listeners that wishlist has changed
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("wishlistUpdated"));
      }
    } catch (error) {
      console.error("Wishlist error:", error);
      // Show error message
      toast.error("Failed to add product to wishlist");
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
      // Add to localStorage for guest users
      addToLocalCart({
        productId,
        quantity,
        productName,
        productImage,
        productPrice: price,
      });
      
      toast.success(`${productName} added to cart`);
      // Notify listeners that cart has changed
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("cartUpdated"));
      }
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
      // Notify listeners that cart has changed
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("cartUpdated"));
      }
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
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          {/* Add to Cart button first on mobile for prominence */}
          <button
            onClick={() =>
              handleAddToCart(
                product._id,
                quantity,
                product.productName,
                product.images[0],
                product.price
              )
            }
            className="order-1 sm:order-2 w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 text-base bg-red-500 text-white font-semibold rounded-lg shadow-sm hover:bg-red-600 active:scale-[0.99] transition"
            aria-label="Add to Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>

          {/* Quantity selector */}
          <div className="order-2 sm:order-1 flex items-center gap-2">
            <span className="font-medium">Qty</span>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={decrementQuantity}
                className="grid place-items-center h-10 w-10 border-r border-gray-300 hover:bg-gray-100 active:bg-gray-200"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-14 h-10 text-center focus:outline-none"
                min="1"
                aria-label="Quantity"
              />
              <button
                onClick={incrementQuantity}
                className="grid place-items-center h-10 w-10 border-l border-gray-300 hover:bg-gray-100 active:bg-gray-200"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Wishlist and Compare */}
          <TooltipProvider>
            <div className="order-3 flex items-center gap-2 sm:ml-1">
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
                    className="h-10 w-10 grid place-items-center rounded-lg border border-gray-300 hover:bg-red-500 hover:text-white transition"
                    aria-label="Add to wishlist"
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to wishlist</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onAddToCompare?.(product)}
                    className="h-10 w-10 grid place-items-center rounded-lg border border-gray-300 hover:bg-red-500 hover:text-white transition"
                    aria-label="Add to compare"
                  >
                    <IoIosGitCompare className="w-5 h-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to compare</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
