"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getLocalWishlistCount } from "@/lib/localStorage";

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
  const { data: session, status } = useSession();

  const refreshWishlistCount = async () => {
    const userId = session?.user?.id;
    if (!userId) {
      setWishlistCount(getLocalWishlistCount());
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
    if (status === "loading") return;
    refreshWishlistCount();
  }, [status, session?.user?.id]);

  useEffect(() => {
    const onWishlistUpdated = () => refreshWishlistCount();
    if (typeof window !== "undefined") {
      window.addEventListener("wishlistUpdated", onWishlistUpdated as EventListener);
      window.addEventListener("focus", onWishlistUpdated as EventListener);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("wishlistUpdated", onWishlistUpdated as EventListener);
        window.removeEventListener("focus", onWishlistUpdated as EventListener);
      }
    };
  }, [status, session?.user?.id]);

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
