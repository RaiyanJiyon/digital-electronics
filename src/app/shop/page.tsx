import PageCover from "@/components/shared/PageCover";
import ProductCard from "@/components/shared/ProductCard";
import { Product } from "@/lib/types";

const fetchProducts = async (): Promise<Product[]> => {
    const res = await fetch(`${process.env.BASE_URL}/api/products?page=1&limit=10`);
    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }
    const { data: products }: { data: Product[] } = await res.json();
    return products;
}

const ShopPage = async () => {
    const products = await fetchProducts(); // This is now an array of products
    console.log(products);

    return (
        <div>
            <PageCover prev="Features" next="Shop" />

            <div className="grid grid-cols-4 gap-6 my-20">
                <div>
                    <h1>Left contents</h1>
                </div>
                <div className="grid col-span-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};
export default ShopPage;