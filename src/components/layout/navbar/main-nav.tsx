"use client";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { usePathname } from "next/navigation";

const MainNavigation = () => {
  const pathname = usePathname();

  const categories = [
    { label: "Laptop", slug: "laptop" },
    { label: "Digital Cameras", slug: "digital-cameras" },
    { label: "Smartphones", slug: "smartphones" },
    { label: "Smart Televisions", slug: "smart-televisions" },
    { label: "Audio Theaters", slug: "audio-theaters" },
    { label: "Smart Watches", slug: "smart-watches" },
    { label: "All accessories", slug: "all-accessories" },
    { label: "Men's Watches", slug: "mens-watches" },
  ];

  const navLinks = [
    { name: "Shop", href: "/shop" },
    { name: "Smartphones", href: "/smartphones" },
    { name: "Compare Products", href: "/compare" },
    { name: "Blog", href: "/blog" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  const isActive = (path: string) => {
    return pathname === path ? "text-red-500" : "";
  };

  return (
    <nav className="border-b border-gray-300 bg-white py-2">
      <div className="max-w-[1920px] mx-auto flex items-center justify-between">
        {/* Categories Dropdown (Desktop) */}
        <div className="relative group">
          <div className="flex items-center gap-2 py-4 px-4 cursor-pointer select-none">
            <span className="font-medium">Shop By Categories</span>
          </div>
          {/* Dropdown panel */}
          <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-150 absolute left-0 top-full z-30 mt-0 w-64 bg-white border border-gray-200 rounded-md shadow-lg p-2">
            <ul className="max-h-[70vh] overflow-auto">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/shop?category=${encodeURIComponent(c.slug)}&page=1`}
                    className="block px-3 py-2 text-sm text-gray-700 rounded hover:bg-red-50 hover:text-red-600"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
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
