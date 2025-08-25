"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { useSession, signOut } from "next-auth/react";

const HeaderNav = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const { data: session, status } = useSession();
  const [cartCount, setCartCount] = useState<number>(0);
  const [wishlistCount, setWishlistCount] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Fetch counts for cart and wishlist
  useEffect(() => {
    const userId = session?.user?.id;
    if (!userId) {
      setCartCount(0);
      setWishlistCount(0);
      return;
    }

    const fetchCounts = async () => {
      try {
        // Cart count
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

      try {
        // Wishlist count
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

    fetchCounts();

    // Listen for updates triggered elsewhere in the app
    const onCartUpdated = () => fetchCounts();
    const onWishlistUpdated = () => fetchCounts();
    window.addEventListener("cartUpdated", onCartUpdated as EventListener);
    window.addEventListener("wishlistUpdated", onWishlistUpdated as EventListener);

    // Refresh on tab focus as well
    window.addEventListener("focus", fetchCounts);

    return () => {
      window.removeEventListener(
        "cartUpdated",
        onCartUpdated as EventListener
      );
      window.removeEventListener(
        "wishlistUpdated",
        onWishlistUpdated as EventListener
      );
      window.removeEventListener("focus", fetchCounts);
    };
  }, [session?.user?.id]);

  const categories = [
    "All Categories",
    "Smartphones",
    "Laptops",
    "Accessories",
    "Audio",
    "Cameras",
  ];

  // Handle search functionality
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    const searchParams = new URLSearchParams();
    searchParams.set("search", searchQuery.trim());
    
    if (selectedCategory !== "All Categories") {
      searchParams.set("category", selectedCategory);
    }
    
    router.push(`/shop?${searchParams.toString()}`);
  };

  // Handle Enter key press in search input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="bg-[#1a1a1a] py-3 px-4">
      <div className="max-w-[1920px] mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <div className="flex items-center">
            <Image
              src="https://i.ibb.co.com/zWC4rqvy/logo.png"
              alt="Digital Electronics"
              width={100}
              height={60}
              className="h-14 w-auto"
            />
          </div>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-md flex bg-white rounded-sm py-1">
          <Input
            type="text"
            placeholder="Enter keywords to search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-transparent focus:border-none"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="rounded-none border-transparent bg-white hover:bg-gray-50 text-gray-700 font-normal"
              >
                {selectedCategory} <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button 
            className="bg-red-500 hover:bg-red-600 mr-1"
            onClick={handleSearch}
          >
            <IoSearch className="h-4 w-4" />
            <span className="ml-2 hidden sm:inline">Search</span>
          </Button>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-6 text-white">
          {/* Login/Logout/Register */}
          <div className="flex items-center gap-2">
            <FaRegUser className="h-5 w-5" />
            <div className="hidden sm:block space-x-2">
              {status === "loading" ? (
                <div className="flex items-center space-x-2 ">
                  <span className="sr-only">Loading...</span>
                  <div className="h-2 w-2 bg-red-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 bg-red-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 bg-red-500 rounded-full animate-bounce"></div>
                </div>
              ) : session?.user ? (
                <>
                  <Link
                    href={`${
                      session.user.role === "admin"
                        ? "/dashboard/admin"
                        : "/profile"
                    }`}
                    className="text-sm whitespace-nowrap hover:text-red-500 hover:font-medium"
                  >
                    {session.user.role === "admin" ? "Dashboard" : "Profile"}
                  </Link>
                  <span className="text-sm whitespace-nowrap">/</span>
                  <button
                    onClick={() => signOut()}
                    className="text-sm whitespace-nowrap hover:text-red-500 hover:font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm whitespace-nowrap hover:text-red-500 hover:font-medium"
                  >
                    LOGIN
                  </Link>
                  <span className="text-sm whitespace-nowrap">/</span>
                  <Link
                    href="/register"
                    className="text-sm whitespace-nowrap hover:text-red-500 hover:font-medium"
                  >
                    REGISTER
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="hidden xl:flex items-center gap-2 hover:text-red-500 relative"
          >
            <div className="relative mr-1">
              <FaRegHeart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            </div>
            <div className="hidden xl:block">
              <span className="text-sm whitespace-nowrap">MY WISHLIST</span>
            </div>
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="flex items-center gap-2 hover:text-red-500"
          >
            <div className="relative mr-1">
              <FiShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            </div>
            <div className="hidden sm:block">
              <span className="text-sm whitespace-nowrap">MY CART</span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderNav;
