"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface WishlistContextType {
  wishlistCount: number;
  refreshWishlistCount: () => Promise<void>;
  incrementWishlistCount: () => void;
  decrementWishlistCount: () => void;
  setWishlistCount: (count: number) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [wishlistCount, setWishlistCount] = useState<number>(0);
  const { data: session } = useSession();

  const refreshWishlistCount = async () => {
    const userId = session?.user?.id;
    if (!userId) {
      setWishlistCount(0);
      return;
    }

    try {
      const wishRes = await fetch(`/api/wishlist/${userId}`);
      if (wishRes.ok) {
        const wish = await wishRes.json();
        setWishlistCount(Array.isArray(wish) ? wish.length : 0);
      } else if (wishRes.status === 404) {
        setWishlistCount(0);
      }
    } catch {
      // ignore network errors for badge UI
    }
  };

  const incrementWishlistCount = () => {
    setWishlistCount(prev => prev + 1);
  };

  const decrementWishlistCount = () => {
    setWishlistCount(prev => Math.max(0, prev - 1));
  };

  // Initial load and session changes
  useEffect(() => {
    refreshWishlistCount();
  }, [session?.user?.id]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistCount,
        refreshWishlistCount,
        incrementWishlistCount,
        decrementWishlistCount,
        setWishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
