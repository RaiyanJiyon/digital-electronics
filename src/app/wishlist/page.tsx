"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, Trash2, ShoppingCart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Wishlist } from "../types/types";
import { useSession } from "next-auth/react";
import Loading from "../loading";

export default function WishlistPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [wishlistItems, setWishlistItems] = useState<Wishlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [removingItems, setRemovingItems] = useState<Record<string, boolean>>(
    {}
  );
  const [addingToCart, setAddingToCart] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchWishlistItems = async () => {
      if (status === "loading") return; // Wait until session is loaded
      if (!session?.user?.id) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const response = await fetch(`/api/wishlist/${session.user.id}`);

        if (!response.ok) {
          throw new Error(response.statusText || "Failed to fetch wishlist");
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received");
        }

        setWishlistItems(data);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlistItems();
  }, [session, status]);

  const removeFromWishlist = async (wishlistItemId: string) => {
    if (!session?.user?.id) return;

    setRemovingItems((prev) => ({ ...prev, [wishlistItemId]: true }));

    try {
      const response = await fetch(`/api/wishlist/${wishlistItemId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      setWishlistItems((prev) =>
        prev.filter((item) => item._id !== wishlistItemId)
      );
      toast.success("Item removed from wishlist");
    } catch (err) {
      console.error("Error removing from wishlist:", err);
      toast.error("Failed to remove item from wishlist");
    } finally {
      setRemovingItems((prev) => ({ ...prev, [wishlistItemId]: false }));
    }
  };

  const addToCart = async (productId: string, productName: string) => {
    if (!session?.user?.id) {
      toast.error("Please login to add items to cart");
      return;
    }

    setAddingToCart((prev) => ({ ...prev, [productId]: true }));

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
          userId: session.user.id,
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      toast.success(`${productName} added to cart`);
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add item to cart");
    } finally {
      setAddingToCart((prev) => ({ ...prev, [productId]: false }));
    }
  };

  if (status === "loading" || isLoading) {
    return <Loading />;
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <Heart className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6">
            Items added to your wishlist will appear here.
          </p>
          <Button onClick={() => router.push("/shop")}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <Card key={item._id} className="overflow-hidden">
            <Link href={`/shop/${item.productId}`}>
              <div className="relative h-64 mb-4 cursor-pointer">
                <Image
                  src={item.productImage || "/placeholder.svg"}
                  alt={item.productName}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                />
              </div>
            </Link>
            <CardContent className="p-4">
              <Link href={`/products/${item.productId}`}>
                <h3 className="text-lg font-semibold mb-2 hover:text-red-600 transition-colors">
                  {item.productName}
                </h3>
              </Link>
              <div className="flex gap-2 mt-4">
                <Button
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  onClick={() => addToCart(item.productId, item.productName)}
                  disabled={addingToCart[item.productId]}
                >
                  {addingToCart[item.productId] ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <ShoppingCart className="h-4 w-4 mr-2" />
                  )}
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => removeFromWishlist(item._id)}
                  disabled={removingItems[item._id]}
                >
                  {removingItems[item._id] ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4 mr-2" />
                  )}
                  Remove
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
