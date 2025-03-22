"use client"

import { BarChart2, Eye, Heart, ShoppingCart } from 'lucide-react';
import Image from "next/image";
import { useState } from "react";

interface Product {
  _id: string;
  product_name: string;
  price: number;
  images: string[];
  rating: number;
}

interface ProductCardProps {
  product: Product; // Accept a single product object
  onAddToCart?: (id: string) => void;
  onAddToWishlist?: (id: string) => void;
  onCompare?: (id: string) => void;
  onQuickView?: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onAddToWishlist,
  onCompare,
  onQuickView,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeIcon, setActiveIcon] = useState<string | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setActiveIcon(null);
  };

  const handleIconMouseEnter = (icon: string, e: React.MouseEvent) => {
    // Stop propagation to prevent parent handlers from firing
    e.stopPropagation();
    setActiveIcon(icon);
  };

  const handleIconMouseLeave = (e: React.MouseEvent) => {
    // Stop propagation to prevent parent handlers from firing
    e.stopPropagation();
    setActiveIcon(null);
  };

  const handleIconClick = (callback?: (id: string) => void, e: React.MouseEvent) => {
    e.stopPropagation();
    if (callback) {
      callback(product._id);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-xl ${i <= rating ? "text-yellow-400" : "text-gray-300"}`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  // Button labels
  const buttonLabels = {
    cart: "Add To Cart",
    wishlist: "Add To Wishlist",
    compare: "Compare",
    quickview: "Quick View"
  };

  return (
    <div
      className="relative border border-gray-200 rounded-md p-4 transition-all duration-300 hover:shadow-md"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative">
        {/* Product Image */}
        <div className="relative h-48 mb-4">
          <Image
            src={product.images[0] || "/placeholder.svg"} // Use the first image URL
            alt={product.product_name}
            fill
            className="object-contain"
          />
        </div>

        {/* Action Icons - Only visible on hover */}
        {isHovered && (
          <div className="absolute left-0 top-0 flex flex-col gap-2">
            {/* Cart Button */}
            <div
              className={`flex items-center overflow-hidden ${
                activeIcon === "cart"
                  ? "bg-red-500 text-white rounded-md"
                  : "bg-white border border-gray-200 rounded-md"
              }`}
              onMouseEnter={(e) => handleIconMouseEnter("cart", e)}
              onMouseLeave={handleIconMouseLeave}
              onClick={(e) => handleIconClick(onAddToCart, e)}
              style={{
                width: activeIcon === "cart" ? "auto" : "36px",
                height: "36px",
                transition: "all 0.3s ease-in-out"
              }}
            >
              <div className="flex items-center p-2 whitespace-nowrap">
                <ShoppingCart className="h-5 w-5 flex-shrink-0" />
                <div 
                  className="ml-2 overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    maxWidth: activeIcon === "cart" ? "150px" : "0",
                    opacity: activeIcon === "cart" ? 1 : 0,
                    transition: "max-width 0.3s ease-in-out, opacity 0.2s ease-in-out"
                  }}
                >
                  {buttonLabels.cart}
                </div>
              </div>
            </div>

            {/* Wishlist Button */}
            <div
              className={`flex items-center overflow-hidden ${
                activeIcon === "wishlist"
                  ? "bg-red-500 text-white rounded-md"
                  : "bg-white border border-gray-200 rounded-md"
              }`}
              onMouseEnter={(e) => handleIconMouseEnter("wishlist", e)}
              onMouseLeave={handleIconMouseLeave}
              onClick={(e) => handleIconClick(onAddToWishlist, e)}
              style={{
                width: activeIcon === "wishlist" ? "auto" : "36px",
                height: "36px",
                transition: "all 0.3s ease-in-out"
              }}
            >
              <div className="flex items-center p-2 whitespace-nowrap">
                <Heart className="h-5 w-5 flex-shrink-0" />
                <div 
                  className="ml-2 overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    maxWidth: activeIcon === "wishlist" ? "150px" : "0",
                    opacity: activeIcon === "wishlist" ? 1 : 0,
                    transition: "max-width 0.3s ease-in-out, opacity 0.2s ease-in-out"
                  }}
                >
                  {buttonLabels.wishlist}
                </div>
              </div>
            </div>

            {/* Compare Button */}
            <div
              className={`flex items-center overflow-hidden ${
                activeIcon === "compare"
                  ? "bg-red-500 text-white rounded-md"
                  : "bg-white border border-gray-200 rounded-md"
              }`}
              onMouseEnter={(e) => handleIconMouseEnter("compare", e)}
              onMouseLeave={handleIconMouseLeave}
              onClick={(e) => handleIconClick(onCompare, e)}
              style={{
                width: activeIcon === "compare" ? "auto" : "36px",
                height: "36px",
                transition: "all 0.3s ease-in-out"
              }}
            >
              <div className="flex items-center p-2 whitespace-nowrap">
                <BarChart2 className="h-5 w-5 flex-shrink-0" />
                <div 
                  className="ml-2 overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    maxWidth: activeIcon === "compare" ? "150px" : "0",
                    opacity: activeIcon === "compare" ? 1 : 0,
                    transition: "max-width 0.3s ease-in-out, opacity 0.2s ease-in-out"
                  }}
                >
                  {buttonLabels.compare}
                </div>
              </div>
            </div>

            {/* Quick View Button */}
            <div
              className={`flex items-center overflow-hidden ${
                activeIcon === "quickview"
                  ? "bg-red-500 text-white rounded-md"
                  : "bg-white border border-gray-200 rounded-md"
              }`}
              onMouseEnter={(e) => handleIconMouseEnter("quickview", e)}
              onMouseLeave={handleIconMouseLeave}
              onClick={(e) => handleIconClick(onQuickView, e)}
              style={{
                width: activeIcon === "quickview" ? "auto" : "36px",
                height: "36px",
                transition: "all 0.3s ease-in-out"
              }}
            >
              <div className="flex items-center p-2 whitespace-nowrap">
                <Eye className="h-5 w-5 flex-shrink-0" />
                <div 
                  className="ml-2 overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    maxWidth: activeIcon === "quickview" ? "150px" : "0",
                    opacity: activeIcon === "quickview" ? 1 : 0,
                    transition: "max-width 0.3s ease-in-out, opacity 0.2s ease-in-out"
                  }}
                >
                  {buttonLabels.quickview}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div>
        <h3 className="text-gray-800 font-medium mb-4 truncate">
          {product.product_name}
        </h3>
        <div className="border-t border-gray-300 pt-2 mt-2"></div>
        <div className="flex justify-between items-center">
          <span className="text-red-500 font-semibold">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex">{renderStars(product.rating)}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
