import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/app/types/types";

// Define the props for the BestSellersWidget component
interface BestsellersWidgetProps {
  title?: string;
  className?: string;
}

// Mock product data (unchanged)
const products = [
  {
    _id: "1",
    product_name: "Dell Inspiron 14 2-in-1 Laptop",
    category: "Laptops",
    price: 520,
    availability: "In stock",
    rating: 4.5,
    description:
      "A compact and powerful 14-inch convertible laptop with a touch-enabled display, perfect for multitasking and entertainment.",
    quantity: 15,
    details:
      "This Dell Inspiron comes with an Intel Core i5 processor, 8GB RAM, and a 256GB SSD. Its 360-degree hinge allows four usage modes, including tent, stand, laptop, and tablet. It also features a Full HD IPS touchscreen, long battery life, and fast charging.",
    color: "Black",
    size: "14 inches",
    manufacturer: "Dell",
    product_types: "Laptop",
    images: [
      "https://i.ibb.co.com/YFJzh80f/Dell-Inspiron-14-2-in-1-Laptop-1.jpg",
      "https://i.ibb.co.com/LdHVjFd3/Dell-Inspiron-14-2-in-1-Laptop-2.jpg",
      "https://i.ibb.co.com/8D4P0pJr/Dell-Inspiron-14-2-in-1-Laptop-3.jpg",
      "https://i.ibb.co.com/8DXB7jNx/Dell-Inspiron-14-2-in-1-Laptop-4.jpg",
    ],
    email: "info@dellstore.com",
    phone_number: "+8801987654321",
    address: "45 Laptop Avenue, Dhaka, Bangladesh",
    status: "approve",
  },
  {
    _id: "2",
    product_name: "HP Pavilion Gaming Laptop",
    category: "Gaming Laptops",
    price: 750,
    availability: "Limited stock",
    rating: 4.8,
    description:
      "A high-performance gaming laptop with advanced graphics and cooling for a seamless gaming experience.",
    quantity: 8,
    details:
      "Equipped with an AMD Ryzen 5 processor, 16GB DDR4 RAM, and a 512GB SSD. The NVIDIA GTX 1650 graphics card ensures smooth gameplay. Features a 15.6-inch FHD display, RGB keyboard, and enhanced thermal cooling.",
    color: "Shadow Black",
    size: "15.6 inches",
    manufacturer: "HP",
    product_types: "Gaming Laptop",
    images: [
      "https://i.ibb.co.com/fGtGt7cM/HP-Pavilion-Gaming-Laptop-1.jpg",
      "https://i.ibb.co.com/xtSJ3K7X/HP-Pavilion-Gaming-Laptop-2.jpg",
      "https://i.ibb.co.com/TDhscQ8r/HP-Pavilion-Gaming-Laptop-3.jpg",
      "https://i.ibb.co.com/QFXhjK3h/HP-Pavilion-Gaming-Laptop-4.jpg",
    ],
    email: "support@hpstore.com",
    phone_number: "+8801765432109",
    address: "78 Gaming Street, Dhaka, Bangladesh",
    status: "approve",
  },
  {
    _id: "3",
    product_name: "Apple MacBook Air M2",
    category: "Laptops",
    price: 1200,
    availability: "Pre-order",
    rating: 5,
    description:
      "A sleek and ultra-light laptop powered by Apple’s M2 chip for unmatched performance and efficiency.",
    quantity: 5,
    details:
      "Features a 13.3-inch Retina display, 8GB Unified Memory, and a 256GB SSD. The fanless design ensures silent operation, while the M2 chip delivers blazing-fast speed and power efficiency. Includes macOS Monterey and Touch ID for security.",
    color: "Silver",
    size: "13.3 inches",
    manufacturer: "Apple",
    product_types: "Laptop",
    images: [
      "https://i.ibb.co.com/B2cmVC5T/Apple-Mac-Book-Air-M2-1.png",
      "https://i.ibb.co.com/M5NNtygs/Apple-Mac-Book-Air-M2-2.png",
      "https://i.ibb.co.com/cKmFHwf9/Apple-Mac-Book-Air-M2-3.png",
      "https://i.ibb.co.com/0RQ86rdD/Apple-Mac-Book-Air-M2-4.png",
    ],
    email: "sales@applestore.com",
    phone_number: "+8801239876543",
    address: "100 Apple Road, Dhaka, Bangladesh",
    status: "approve",
  },
  {
    _id: "4",
    product_name: "Asus ROG Zephyrus G14",
    category: "Gaming Laptops",
    price: 1350,
    availability: "In stock",
    rating: 4.9,
    description:
      "A compact gaming laptop with cutting-edge technology for esports and content creation.",
    quantity: 7,
    details:
      "Powered by AMD Ryzen 9 and NVIDIA GeForce RTX 3060, this laptop delivers incredible gaming and multitasking performance. Features a 14-inch QHD display with 120Hz refresh rate, 16GB RAM, and 1TB SSD. Includes an AniMe Matrix LED customizable back panel.",
    color: "Moonlight White",
    size: "14 inches",
    manufacturer: "Asus",
    product_types: "Gaming Laptop",
    images: [
      "https://i.ibb.co.com/bxv66CQ/Asus-ROG-Zephyrus-G14-1.jpg",
      "https://i.ibb.co.com/dw2Wt1HR/Asus-ROG-Zephyrus-G14-2.jpg",
      "https://i.ibb.co.com/HDhvPNLN/Asus-ROG-Zephyrus-G14-3.jpg",
      "https://i.ibb.co.com/sprZ83T9/Asus-ROG-Zephyrus-G14-4.jpg",
    ],
    email: "contact@asusstore.com",
    phone_number: "+8801987891234",
    address: "56 Gamer Zone, Dhaka, Bangladesh",
    status: "approve",
  },
];

// Reusable component for rendering a single product
const ProductItem: React.FC<{ product: Product }> = ({ product }) => (
  <div className="p-4 flex items-center gap-4">
    {/* Product Image */}
    <Link href={``} className="flex-shrink-0">
      <div className="relative w-20 h-20 border border-gray-200 rounded-md overflow-hidden">
        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.product_name}
          fill
          className="object-contain"
        />
      </div>
    </Link>

    {/* Product Info */}
    <div className="flex-1">
      <div className="hover:text-red-500">
        <h3 className="font-medium text-gray-800 line-clamp-2">
          {product.product_name}
        </h3>
      </div>
      <div className="mt-1 flex items-center gap-2">
        <span className="text-red-500 font-semibold">
          ${product.price.toFixed(2)}
        </span>
      </div>
    </div>
  </div>
);

// Main BestSellersWidget Component
const BestSellersWidget: React.FC<BestsellersWidgetProps> = () => {
  return (
    <div className="border border-gray-200 rounded-md overflow-hidden">
      {/* Header */}
      <div className="bg-red-500 text-white font-bold py-3 px-4">
        BESTSELLERS
      </div>

      {/* Products List */}
      <div className="divide-y divide-gray-200">
        {products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BestSellersWidget;
