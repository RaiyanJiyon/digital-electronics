"use client";

import { Product } from "@/lib/types";
import Link from "next/link";
import ImageSlider from "@/components/shared/products/image-slider";
import TabSection from "@/components/shared/products/tab-section";
import CompareProducts from "@/components/shared/products/compare-products";
import BestSellersWidget from "@/components/shared/products/best-sellers-widget";
import { use, useEffect, useState } from "react";

const ProductDetailsPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const resolvePath = use(params);
  const { id } = resolvePath;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products//${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }

        const data = await response.json();
        setProduct(data.data);
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
      <div className="w-11/12 max-w-[1920px] mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Invalid Product ID</h1>
        <p className="mt-4">Please provide a valid product identifier.</p>
        <Link
          href="/shop"
          className="mt-6 inline-block px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-11/12 max-w-[1920px] mx-auto px-4 py-16 text-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-11/12 max-w-[1920px] mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Error</h1>
        <p className="mt-4">{error}</p>
        <Link
          href="/shop"
          className="mt-6 inline-block px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-11/12 max-w-[1920px] mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="mt-4">
          The product you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-block px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse lg:flex-row justify-between gap-16 lg:gap-14 w-11/12 lg:w-[96%] max-w-[1920px] mx-auto my-14">
      <div className="lg:w-[20%] space-y-10">
        <BestSellersWidget />
        <CompareProducts />
      </div>
      <div className="lg:w-[80%]">
        <ImageSlider product={product} />
        {/* Tabs Section */}
        <TabSection product={product} />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
