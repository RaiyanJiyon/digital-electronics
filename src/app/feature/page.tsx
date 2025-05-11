import PageCover from "@/components/shared/page-cover";
import FeatureProducts from "./components/feature-product";

export const dynamic = "force-dynamic";

export default async function FeaturePage() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/feature`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) throw new Error("Failed to fetch");

  const { data: products } = await response.json();

  return (
    <>
    {/* Page Cover */}
      <PageCover prev="Home" next="Feature" />
      <FeatureProducts initialProducts={products} />;
    </>
  );
}
