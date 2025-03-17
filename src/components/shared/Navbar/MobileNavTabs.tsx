import { useState } from "react";
import type React from "react";

import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

type TabType = "MENU" | "ACCOUNT" | "SETTING";

interface MobileNavTabsProps {
  onClose?: () => void;
}

const MobileNavTabs: React.FC<MobileNavTabsProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>("MENU");

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  const menuItems = [
    { name: "HOME", href: "/" },
    { name: "FEATURES", href: "/features" },
    { name: "SHOP", href: "/shop" },
    { name: "SMARTPHONES", href: "/smartphones" },
    { name: "BLOG", href: "/blog" },
    { name: "ABOUT US", href: "/about" },
    { name: "CONTACT US", href: "/contact" },
  ];

  const accountItems = [
    { name: "login", href: "/login" },
    { name: "Register", href: "/register" },
  ];

  const languageItems = [
    { flag: "https://i.ibb.co.com/9kSHG23g/english.png", language: "English" },
    { flag: "https://i.ibb.co.com/xtX00L2J/french.png", language: "French" },
    { flag: "https://i.ibb.co.com/mVqdGdcX/german.png", language: "German" },
    { flag: "https://i.ibb.co.com/r2ZrJG70/belgium.png", language: "Belgium" },
    {
      flag: "https://i.ibb.co.com/d0ZJbFcz/honduras.png",
      language: "Honduras",
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="flex border-b">
        <button
          className={cn(
            "flex-1 py-4 font-bold text-gray-700 relative",
            activeTab === "MENU" && "text-black"
          )}
          onClick={() => handleTabChange("MENU")}
        >
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm">MENU</span>
          </div>
          {activeTab === "MENU" && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></div>
          )}
        </button>
        <button
          className={cn(
            "flex-1 py-4 font-bold text-gray-700 relative",
            activeTab === "ACCOUNT" && "text-black"
          )}
          onClick={() => handleTabChange("ACCOUNT")}
        >
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm">ACCOUNT</span>
          </div>
          {activeTab === "ACCOUNT" && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></div>
          )}
        </button>
        <button
          className={cn(
            "flex-1 py-4 font-bold text-gray-700 relative",
            activeTab === "SETTING" && "text-black"
          )}
          onClick={() => handleTabChange("SETTING")}
        >
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm">SETTING</span>
          </div>
          {activeTab === "SETTING" && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></div>
          )}
        </button>
      </div>

      {/* Content based on active tab */}
      <div className="flex-1 overflow-y-auto py-4">
        {activeTab === "MENU" && (
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li key={item.name} className="px-4">
                <Link
                  href={item.href}
                  className="block hover:text-red-500"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default behavior
                    handleLinkClick(); // Close the menu
                    window.location.href = item.href; // Navigate manually
                  }}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {activeTab === "ACCOUNT" && (
          <ul className="space-y-4">
            {accountItems.map((item) => (
              <li key={item.name} className="px-4">
                <Link
                  href={item.href}
                  className="flex items-center justify-between text-black uppercase"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default behavior
                    handleLinkClick(); // Close the menu
                    window.location.href = item.href; // Navigate manually
                  }}
                >
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {activeTab === "SETTING" && (
          <div className="px-4">
            <h2 className="text-sm font-bold mb-4">Language</h2>
            <ul className="space-y-4">
              {languageItems.map((item) => (
                <li key={item.language} className="flex items-center gap-2">
                  <Image
                    src={item.flag}
                    width={20}
                    height={10}
                    alt={`${item.language} image`}
                    className="cursor-pointer"
                    onClick={handleLinkClick} // Close the menu when an image is clicked
                  />
                  <span className="text-sm">{item.language}</span>
                </li>
              ))}
            </ul>

            <div className="space-y-2 mt-6 mb-10">
              <h2 className="text-sm font-bold mb-2">Currency</h2>
              <h2 className="text-sm font-bold mb-2">USD</h2>
              <h2 className="text-sm">EUR - Euro</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileNavTabs;
