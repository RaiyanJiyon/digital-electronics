"use client";

import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { usePathname } from "next/navigation";

const MainNavigation = () => {
  const pathname = usePathname();

  // const categories = [
  //     "Smartphones",
  //     "Laptops & Computers",
  //     "Audio & Headphones",
  //     "Cameras & Photography",
  //     "Smart Watches",
  //     "Gaming",
  //     "TV & Home Entertainment",
  //     "Accessories",
  // ]

  const navLinks = [
    { name: "Feature", href: "/feature" },
    { name: "Shop", href: "/shop" },
    { name: "Smartphones", href: "/smartphones" },
    { name: "Blog", href: "/blog" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  const isActive = (path: string) => {
    return pathname === path ? "text-red-500" : "";
  };

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-[1920px] mx-auto flex items-center justify-between">
        {/* Mobile Menu Trigger */}
        <div className="flex items-center">
          <button className="flex items-center gap-2 py-4 px-4">
            <IoMdMenu className="h-5 w-5 hover:text-red-500" />
            <span className="font-medium">Shop By Categories</span>
          </button>
        </div>

        {/* Main Navigation Links */}
        <div className="flex items-center">
          <Link
            href="/"
            className={`flex items-center gap-1 py-4 px-4 font-medium whitespace-nowrap ${isActive(
              "/"
            )}`}
          >
            <FaHome className="h-4 w-4" />
            <span>Home</span>
          </Link>

          {navLinks.map((navLink, index) => (
            <Link
              key={index}
              href={`${navLink.href}`}
              className={`py-4 px-4 hover:text-red-500 font-medium whitespace-nowrap ${isActive(
                navLink.href
              )}`}
            >
              {navLink.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;
