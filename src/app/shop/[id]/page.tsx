import { Product } from "@/lib/types";
import Link from "next/link";
import ImageSlider from "@/components/shared/products/ImageSlider";
import TabSection from "@/components/shared/products/TabSection";
import CompareProducts from "@/components/shared/products/CompareProducts";
import BestSellersWidget from "@/components/shared/products/BestSellersWidget";

const fetchProductDetails = async (id: string) => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/products/${id}`, {
      cache: "no-store", // Disable caching for fresh data
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch product: ${res.statusText}`);
    }

    const { data: product }: { data: Product } = await res.json();
    return product;
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
};

const ProductDetailsPage = async ({ params }: { params: { id: string } }) => {
  if (!params?.id) {
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

  const product = await fetchProductDetails(params.id);

  if (!product) {
    return (
      <div className="w-11/12 max-w-[1920px] mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="mt-4">
          The product you're looking for doesn't exist or has been removed.
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
