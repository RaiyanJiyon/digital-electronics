import PageCover from "@/components/shared/page-cover";
import { Product } from "../types/types";
import ProductCard from "@/components/shared/product-card";

// Fetch Smartphones data from the API
const fetchSmartphones = async (): Promise<Product[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/smartphones`,
    {
      cache: "no-store", // Disable caching for fresh data
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch smartphones data");
  }

  const data: Product[] = await response.json();
  return data;
};

export default async function SmartphonesPage() {
  // Fetch smartphones data during server render
  const smartphones = await fetchSmartphones();
  return (
    <div>
      {/* Page Cover */}
      <PageCover prev="Shop" next="Smartphones" />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 container px-4 mx-auto my-14">
        {smartphones.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
