import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";
import Link from "next/link";

const FooterContact = () => {
  return (
    <div>
      <h3 className="text-white font-bold mb-2">CONTACT US</h3>
      <div className="w-10 h-1 bg-red-500 mb-6"></div>
      <ul className="space-y-4">
        <li className="flex items-start">
          <MapPin className="text-red-500 mr-2 h-5 w-5 mt-1 flex-shrink-0" />
          <span className="text-gray-400">4331 Dominion St, Burnaby, BC, Canada</span>
        </li>
        <li className="flex items-center">
          <Phone className="text-red-500 mr-2 h-5 w-5 flex-shrink-0" />
          <span className="text-gray-400">(+80)123 456 789</span>
        </li>
        <li className="flex items-center">
          <Mail className="text-red-500 mr-2 h-5 w-5 flex-shrink-0" />
          <span className="text-gray-400">Support@MagenTech.com</span>
        </li>
      </ul>

      <div className="mt-6 flex space-x-2">
        {[{ icon: Facebook, bg: "#3b5998" }, { icon: Twitter, bg: "#1da1f2" }, { icon: Instagram, bg: "#e1306c" }, { icon: Youtube, bg: "#ff0000" }, { icon: Linkedin, bg: "#0077b5" }].map(({ icon: Icon, bg }, index) => (
          <Link key={index} href="#" className={`p-2 rounded-md hover:opacity-80`} style={{ backgroundColor: bg }}>
            <Icon className="h-5 w-5" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FooterContact;
