"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, ShoppingBag, Loader2, ArrowRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import Loading from "../loading";
import { Cart } from "../types/types";

// Initialize Stripe
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_key"
);

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<Cart[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [removingItems, setRemovingItems] = useState<Record<string, boolean>>(
    {}
  );
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const { data: session, status } = useSession();
  const userId = session?.user.id;

  useEffect(() => {
    const fetchCartItems = async () => {
      setIsLoading(true);

      if (status === "loading") return;

      try {
        const response = await fetch(`/api/carts/${userId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }

        const data = await response.json();
        setCartItems(data);
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCartItems();
  }, [status, userId]);

  const removeFromCart = async (cartItemId: string) => {
    setRemovingItems((prev) => ({ ...prev, [cartItemId]: true }));

    try {
      const response = await fetch(`/api/carts/${cartItemId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }

      setCartItems((prev) => prev.filter((item) => item._id !== cartItemId));
      toast("Item removed", {
        description: "The item has been removed from your cart.",
      });
    } catch (err) {
      console.error("Error removing from cart:", err);
      toast("Error", {
        description: "Failed to remove item from cart. Please try again.",
      });
    } finally {
      setRemovingItems((prev) => ({ ...prev, [cartItemId]: false }));
    }
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);

    try {
      const lineItems = cartItems.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.productName,
            images: [item.productImage],
          },
          unit_amount: item.productPrice * 100,
        },
        quantity: item.quantity,
      }));

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          lineItems,
          success_url: `${window.location.origin}/checkout/success`,
          cancel_url: `${window.location.origin}/cart`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { sessionId } = await response.json();

      const stripe = await stripePromise;
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          throw new Error(error.message);
        }
      }
    } catch (err) {
      console.error("Error during checkout:", err);
      toast("Checkout Error", {
        description:
          "There was a problem processing your checkout. Please try again.",
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  // Calculate cart totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.productPrice * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const shipping = subtotal > 0 ? 15 : 0;
  const total = subtotal + tax + shipping;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <ShoppingBag className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Looks like you haven&apos;t added any products to your cart yet.
          </p>
          <Button
            onClick={() => router.push("/shop")}
            className="bg-red-600 hover:bg-red-700"
          >
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col sm:flex-row py-6 border-b last:border-0 last:pb-0"
                  >
                    <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0 mb-4 sm:mb-0">
                      <Image
                        src={item.productImage || "/placeholder.svg"}
                        alt={item.productName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="sm:ml-4 flex-1">
                      <Link href={`/products/${item.productId}`}>
                        <h3 className="font-medium hover:text-red-600 transition-colors">
                          {item.productName}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formatCurrency(item.productPrice)} each
                      </p>

                      <div className="flex items-center justify-between mt-4">
                        <div>
                          <span className="font-medium">
                            Qty: {item.quantity}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-medium">
                            {formatCurrency(item.productPrice * item.quantity)}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => removeFromCart(item._id)}
                            disabled={removingItems[item._id]}
                          >
                            {removingItems[item._id] ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{formatCurrency(shipping)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                  </div>

                  <Button
                    className="w-full mt-6 bg-red-600 hover:bg-red-700"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Checkout <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <div className="mt-4">
                    <p className="text-xs text-center text-muted-foreground">
                      Secure checkout powered by Stripe
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push("/shop")}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
