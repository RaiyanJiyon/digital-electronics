"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface CartContextType {
  cartCount: number;
  refreshCartCount: () => Promise<void>;
  incrementCartCount: () => void;
  decrementCartCount: () => void;
  setCartCount: (count: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartCount, setCartCount] = useState<number>(0);
  const { data: session } = useSession();

  const refreshCartCount = async () => {
    const userId = session?.user?.id;
    if (!userId) {
      setCartCount(0);
      return;
    }

    try {
      const cartRes = await fetch(`/api/carts/${userId}`);
      if (cartRes.ok) {
        const cart = await cartRes.json();
        setCartCount(Array.isArray(cart) ? cart.length : 0);
      } else if (cartRes.status === 404) {
        setCartCount(0);
      }
    } catch {
      // ignore network errors for badge UI
    }
  };

  const incrementCartCount = () => {
    setCartCount(prev => prev + 1);
  };

  const decrementCartCount = () => {
    setCartCount(prev => Math.max(0, prev - 1));
  };

  // Initial load and session changes
  useEffect(() => {
    refreshCartCount();
  }, [session?.user?.id, refreshCartCount]);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        refreshCartCount,
        incrementCartCount,
        decrementCartCount,
        setCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
