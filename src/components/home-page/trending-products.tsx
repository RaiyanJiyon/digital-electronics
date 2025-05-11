"use client";

import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Product } from "@/app/types/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { IoIosGitCompare } from "react-icons/io";

// Hardcoded products
const products: Product[] = [
  {
    _id: "6812f05307083ab29f6c5a27",
    productName: "Hisense U8H Quantum Dot",
    category: "Smart Televisions",
    price: 1800,
    availability: "In stock",
    rating: 4.5,
    description:
      "The Hisense U8H is a high-performance smart TV with Quantum Dot technology and Full Array Local Dimming for enhanced brightness and contrast. Its 65-inch screen makes it ideal for home entertainment.",
    quantity: 14,
    details:
      "This TV features a 65-inch ULED display with Dolby Vision and Dolby Atmos support. The VIDAA U7 interface provides access to popular streaming services, while the AI Scene Recognition adjusts settings for optimal viewing based on content type.",
    color: "Slate Grey",
    size: "65 inches",
    manufacturer: "Hisense",
    productTypes: "Smart TV",
    images: ["https://i.ibb.co.com/Jwy7kxnH/Hisense-U8-H-Quantum-Dot-1.webp "],
    email: "support@hisensestore.com",
    phoneNumber: "+8801987654321",
    address: "90 Mobile Plaza, Dhaka, Bangladesh",
    status: "accept",
  },
  {
    _id: "6812ef6507083ab29f6c5a01",
    productName: "Apple iMac M2 (24-inch)",
    category: "Computers",
    price: 1300,
    availability: "In stock",
    rating: 4.9,
    description:
      "The Apple iMac M2 is a sleek all-in-one desktop computer with a vibrant Retina display and powerful M2 chip. Its compact design and advanced performance make it ideal for creative professionals and everyday users.",
    quantity: 15,
    details:
      "This 24-inch iMac features a 4.5K Retina display with True Tone technology for stunning visuals. The M2 chip ensures fast processing, while the 8GB RAM and 256GB SSD provide ample storage and multitasking capabilities. It includes macOS Ventura and supports Wi-Fi 6.",
    color: "Blue",
    size: "24 inches",
    manufacturer: "Apple",
    productTypes: "All-in-One Desktop",
    images: ["https://i.ibb.co.com/PGJr91f5/Apple-i-Mac-M2-24-inch-1.webp"],
    email: "support@applestore.com",
    phoneNumber: "+8801987654321",
    address: "12 Tech Plaza, Dhaka, Bangladesh",
    status: "accept",
  },
  {
    _id: "681337ce07083ab29f6c5c3c",
    productName: "Sony PlayStation 5",
    category: "Gaming Consoles",
    price: 500,
    availability: "In stock",
    rating: 4.9,
    description:
      "The Sony PlayStation 5 is a next-gen gaming console with ultra-fast SSD, ray tracing, and 3D audio support. Perfect for immersive gaming experiences.",
    quantity: 20,
    details:
      "Features an AMD Zen 2 CPU, RDNA 2 GPU, and 825GB SSD. Includes DualSense wireless controller with haptic feedback and adaptive triggers. Supports 4K gaming and backward compatibility with PS4 games.",
    color: "White/Black",
    size: "Standard",
    manufacturer: "Sony",
    productTypes: "Gaming Console",
    images: ["https://i.ibb.co.com/VcSf4tnr/Sony-Play-Station-5-1.jpg"],
    email: "support@sonystore.com",
    phoneNumber: "+8801987654321",
    address: "12 Tech Plaza, Dhaka, Bangladesh",
    status: "accept",
  },
  {
    _id: "681198ae07083ab29f6c42b1",
    productName: "Apple iPhone 15 Pro",
    category: "Smartphones",
    price: 1300,
    availability: "Pre-order",
    rating: 4.9,
    description:
      "The Apple iPhone 15 Pro is a premium smartphone with cutting-edge tech…",
    quantity: 15,
    details:
      "Featuring a 6.1-inch Super Retina XDR display, the iPhone 15 Pro offer…",
    color: "Titanium Gold",
    size: "6.1 inches",
    manufacturer: "Apple",
    productTypes: "Smartphone",
    images: ["https://i.ibb.co.com/gbN1YJzx/Apple-i-Phone-15-Pro-2.jpg"],
    email: "sales@applestore.com",
    phoneNumber: "+8801239876543",
    address: "34 Innovation Road, Dhaka, Bangladesh",
    status: "accept",
  },
  {
    _id: "6813008407083ab29f6c5b41",
    productName: "KEF LS50 Wireless II",
    category: "Audio Theaters",
    price: 2800,
    availability: "In stock",
    rating: 4.6,
    description:
      "The KEF LS50 Wireless II is a high-end active speaker system with advanced Uni-Q driver technology for precise sound reproduction.",
    quantity: 12,
    details:
      "Supports streaming via Wi-Fi, Bluetooth, and AirPlay 2. Includes HDMI input and MQA decoding for high-resolution audio.",
    color: "Matte White",
    size: "Wireless Speaker",
    manufacturer: "KEF",
    productTypes: "Wireless Speaker",
    images: ["https://i.ibb.co.com/S7d84W6Z/KEF-LS50-Wireless-II-1.png"],
    email: "info@kefstore.com",
    phoneNumber: "+8801765432109",
    address: "56 Tech Avenue, Dhaka, Bangladesh",
    status: "accept",
  },
  {
    _id: "6813190707083ab29f6c5bb8",
    productName: "Apple Watch Ultra",
    category: "Smart Watches",
    price: 800,
    availability: "In stock",
    rating: 4.9,
    description:
      "The Apple Watch Ultra is designed for extreme conditions with a rugged build, precision GPS, and up to 36 hours of battery life. Perfect for adventurers and athletes.",
    quantity: 25,
    details:
      "Features a titanium case, sapphire crystal display, and advanced health tracking. Includes Action Button for quick access to apps and supports LTE connectivity.",
    color: "Titanium",
    size: "49mm",
    manufacturer: "Apple",
    productTypes: "Smartwatch",
    images: ["https://i.ibb.co.com/Jj1m1btS/Apple-Watch-Ultra-1.jpg"],
    email: "support@applestore.com",
    phoneNumber: "+8801987654321",
    address: "12 Tech Plaza, Dhaka, Bangladesh",
    status: "accept",
  },
];

export default function TrendingProducts() {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const quantity = 1;

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
        error instanceof Error ? error.message : "Failed to add item to cart"
      );
    }
  };

  const renderStarRating = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={cn(
            "text-xl",
            i <= rating ? "text-yellow-400" : "text-gray-300"
          )}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-gray-200">
      {products.map((product) => (
        <div
          key={product._id}
          className="p-4 flex flex-col items-center border border-gray-200 relative"
        >
          <div className="w-full h-48 flex items-center justify-center mb-4">
            <Image
              src={product.images[0].trim() || "/placeholder.svg"}
              alt={product.productName}
              width={150}
              height={150}
              className="max-h-full object-contain"
            />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2 text-center">
            {product.productName}
          </h3>
          <p className="text-xl font-bold text-red-500 mb-2">
            ${product.price.toFixed(2)}
          </p>
          <div className="flex mb-4">{renderStarRating(product.rating)}</div>
          <div className="flex gap-2 w-full">
            <Button
              variant="outline"
              className="flex-1 flex items-center justify-center gap-2 h-10"
              onClick={() =>
                handleAddToCart(
                  product._id,
                  quantity,
                  product.productName,
                  product.images[0],
                  product.price
                )
              }
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
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
                    // onClick={() => onAddToCompare?.(product)}
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
      ))}
    </div>
  );
}
