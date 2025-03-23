"use client"
import TopBar from "./TopBar";
import HeaderNav from "./HeaderNav";
import SearchBar from "./SearchBar";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";
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
