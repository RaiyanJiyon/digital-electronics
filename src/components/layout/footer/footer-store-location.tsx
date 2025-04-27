import Link from "next/link";

const FooterStoreLocation = () => {
  return (
    <div>
      <h3 className="text-white font-bold mb-2">STORE LOCATION</h3>
      <div className="w-10 h-1 bg-red-500 mb-6"></div>
      <ul className="space-y-3">
        {["Los Angeles - USA", "New York - USA", "California - USA", "Bangkok - Thailand", "Paris - France", "London - England"].map((item) => (
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

export default FooterStoreLocation;
