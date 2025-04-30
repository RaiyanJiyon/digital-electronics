"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/app/types/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  // Render star rating
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <span
        key={i}
        className={`text-xl ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="border border-gray-200 rounded-md p-4 transition-all duration-300 hover:shadow-md">
      {/* Product Image */}
      <Link href={`/shop/${product._id}`}>
        <div className="relative h-64 mb-4 cursor-pointer">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.productName}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
        </div>
      </Link>

      {/* Product Information */}
      <div>
        <h3 className="text-gray-800 font-medium mb-4 truncate">
          {product.productName}
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