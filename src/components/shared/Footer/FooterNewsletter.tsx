import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const FooterNewsletter = () => {
  return (
    <div>
      <h3 className="text-white font-bold mb-2">NEWSLETTER SUBSCRIBE</h3>
      <div className="w-10 h-1 bg-red-500 mb-6"></div>
      <p className="text-gray-400 mb-4">
        Get all the best deals, sales and offers from the best online shopping store in UAE. Sign up now!
      </p>

      <div className="flex mb-6">
        <Input type="email" placeholder="Your email address" className="bg-gray-700 border-gray-600 text-white rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0" />
        <Button className="bg-red-500 hover:bg-red-600 rounded-l-none">SUBSCRIBE</Button>
      </div>

      <div className="flex space-x-2">
        <Link href="#">
          <Image src="/assets/images/footer-images/app-store.png" alt="App Store" width={120} height={40} className="h-10" />
        </Link>
        <Link href="#">
          <Image src="/assets/images/footer-images/google-play.png" alt="Google Play" width={120} height={40} className="h-10" />
        </Link>
      </div>
    </div>
  );
};

export default FooterNewsletter;
