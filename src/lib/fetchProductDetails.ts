import { Product } from "./types";

export const fetchProductDetails = async (id: string) => {
    const res = await fetch(`${process.env.BASE_URL}/api/products/${id}`, {
        cache: "no-store", // Disable caching for fresh data
    });

    if (!res.ok) {
        return null;
    }

    const { data: product }: { data: Product } = await res.json();
    return product;
};