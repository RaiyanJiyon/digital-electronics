"use client";
import { ShoppingBag } from "lucide-react";
import { GiHamburgerMenu } from "react-icons/gi";
import Image from "next/image";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import MobileNavTabs from "./mobile-nav-tabs";
import { DialogTitle } from "@radix-ui/react-dialog";

const MobileNav = () => {
  return (
    <div className="flex justify-between items-center bg-red-500 p-3">
      <div>
        <Sheet>
          <SheetTrigger asChild>
            <button>
              <GiHamburgerMenu className="w-10 h-10 text-white" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <DialogTitle></DialogTitle>
            <MobileNavTabs
              onClose={() =>
                document
                  .querySelector<HTMLButtonElement>(".sheet-close")
                  ?.click()
              }
            />
          </SheetContent>
        </Sheet>
      </div>
      {/* Logo */}
      <Link href="/" className="flex-shrink-0">
        <div className="flex items-center">
          <Image
            src="https://i.ibb.co.com/SwS2s1v2/logo-mobile.png"
            alt="Digital Electronics"
            width={100}
            height={60}
            className="h-14 w-auto"
          />
        </div>
      </Link>
      <div>
        <Link href="/cart" aria-label="Open cart" className="inline-flex">
          <ShoppingBag className="w-10 h-10 text-white" />
        </Link>
      </div>
    </div>
  );
};

export default MobileNav;

