"use client";

import Link from "next/link";
import ImageSlider from "@/components/shared/products/image-slider";
import TabSection from "@/components/shared/products/tab-section";
import CompareProducts from "@/components/shared/products/compare-products";
import BestSellersWidget from "@/components/shared/products/best-sellers-widget";
import { use, useEffect, useState } from "react";
import { Product } from "@/app/types/types";
import Loading from "@/app/loading";
import ProductCard from "@/components/shared/product-card";
import { useRouter } from "next/navigation";

const relatedProducts: Product[] = [
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

const ProductDetailsPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const resolvePath = use(params);
  const { id } = resolvePath;

  const handleAddToCompare = (product: Product) => {
    router.push(`/compare?left=${product._id}`);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }

        const data = await response.json();

        setProduct(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    } else {
      setLoading(false);
    }
  }, [id]);

  if (!id) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Invalid Product ID</h1>
        <p className="mt-4">Please provide a valid product identifier.</p>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-md bg-red-500 px-6 py-2 text-white hover:bg-red-600"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Error</h1>
        <p className="mt-4">{error}</p>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-md bg-red-500 px-6 py-2 text-white hover:bg-red-600"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="mt-4">
          The product you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-md bg-red-500 px-6 py-2 text-white hover:bg-red-600"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* Main Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col-reverse lg:flex-row gap-12">
          {/* Sidebar Widgets */}
          <div className="lg:w-1/4 space-y-8">
            <BestSellersWidget />
            <CompareProducts />
          </div>

          {/* Product Details Area */}
          <div className="lg:w-3/4">
            <ImageSlider product={product} onAddToCompare={handleAddToCompare} />
            <TabSection product={product} />
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="container mx-auto px-4 py-12 border-t border-gray-200">
        <h2 className="mb-6 text-xl font-semibold">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
