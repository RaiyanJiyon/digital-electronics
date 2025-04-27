"use client"
import TopBar from "./top-bar";
import HeaderNav from "./header-nav";
import SearchBar from "./search-bar";
import MainNav from "./main-nav";
import MobileNav from "./mobile-nav";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

    // Hide Navbar for dashboard pages
    if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin") || pathname.startsWith("/buyer")) {
      return null;
    }
  return (
    <div>
      <div className="lg:hidden">
        <MobileNav />
      </div>
      <div className="hidden lg:flex">
        <TopBar />
      </div>
      <div>
        <div className="lg:hidden">
          <SearchBar />
        </div>
        <div className="hidden lg:block">
          <HeaderNav />
        </div>
        <div className="hidden lg:block">
          <MainNav />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
