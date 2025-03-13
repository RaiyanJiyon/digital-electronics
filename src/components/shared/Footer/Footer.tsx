"use client";
import type React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUp,
} from "lucide-react";
import FooterInfo from "./FooterInfo";
import FooterCustomerService from "./FooterCustomerService";
import FooterStoreLocation from "./FooterStoreLocation";
import FooterContact from "./FooterContact";
import FooterNewsletter from "./FooterNewsletter";

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* Main Footer */}
      <div className="w-11/12 mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <FooterInfo />
          <FooterCustomerService />
          <FooterStoreLocation />
          <FooterContact />
          <FooterNewsletter />
        </div>
      </div>

      {/* Trust Badges */}
      <div className="border-t border-gray-500 py-6">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="flex flex-wrap justify-center gap-4">
            <Image
              src="/assets/images/footer-images/item-1.png"
              alt="BBB"
              width={130}
              height={50}
            />
            <Image
              src="/assets/images/footer-images/item-2.png"
              alt="TrustWave"
              width={130}
              height={50}
            />
            <Image
              src="/assets/images/footer-images/item-3.png"
              alt="Norton"
              width={130}
              height={50}
            />
            <Image
              src="/assets/images/footer-images/item-4.png"
              alt="TRUSTe"
              width={130}
              height={50}
            />
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 text-sm mb-6">
            <Link href="#" className="text-gray-400 hover:text-white">
              ABOUT US
            </Link>
            <span className="text-gray-600">|</span>
            <Link href="#" className="text-gray-400 hover:text-white">
              CUSTOMER SERVICE
            </Link>
            <span className="text-gray-600">|</span>
            <Link href="#" className="text-gray-400 hover:text-white">
              PRIVACY POLICY
            </Link>
            <span className="text-gray-600">|</span>
            <Link href="#" className="text-gray-400 hover:text-white">
              SITE MAP
            </Link>
            <span className="text-gray-600">|</span>
            <Link href="#" className="text-gray-400 hover:text-white">
              ORDERS AND RETURNS
            </Link>
            <span className="text-gray-600">|</span>
            <Link href="#" className="text-gray-400 hover:text-white">
              CONTACT US
            </Link>
          </div>

          <p className="text-gray-400 text-center text-sm mb-6">
            **$50 off orders $350+ with the code BOO50. $75 off orders $500+
            with the code BOO75. $150 off orders $1000+ with the code BOO150.
            Valid from October 28, 2016 to October 31, 2016. Offer may not be
            combined with any other offers or promotions, is non-exchangeable
            and non-refundable. Offer valid within the US only.
          </p>

          <div className="flex justify-center">
            <Image
              src="/assets/images/footer-images/payment-footer.png"
              alt="payment footer"
              width={400}
              height={200}
            />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-500 py-4 mt-6">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          SM Digital © 2019 Demo Store. All Rights Reserved. Designed by
          <Link href="#" className="text-red-500 ml-1 font-bold">
            MagenTech.Com
          </Link>
        </div>
      </div>

      {/* Back to top button */}
      <Link
        href="#"
        className="fixed bottom-6 right-6 bg-gray-700 p-3 rounded-md hover:bg-gray-600 transition-colors"
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </Link>
    </footer>
  );
};

export default Footer;
