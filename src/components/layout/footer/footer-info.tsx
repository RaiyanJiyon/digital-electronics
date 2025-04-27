import Link from "next/link";

const FooterInfo = () => {
  return (
    <div>
      <h3 className="text-white font-bold mb-2">INFORMATION</h3>
      <div className="w-10 h-1 bg-red-500 mb-6"></div>
      <ul className="space-y-3">
        {["Caps & Hats", "Hoodies & Sweatshirts", "Jacket & Coats", "Jumpers & Cardigans", "Shoes, Boots & Trainers", "Underwear & Socks"].map((item) => (
          <li key={item}>
            <Link href="#" className="text-gray-400 hover:text-white">
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterInfo;
