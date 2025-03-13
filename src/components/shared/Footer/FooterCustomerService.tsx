import Link from "next/link";

const FooterCustomerService = () => {
  return (
    <div>
      <h3 className="text-white font-bold mb-2">CUSTOMER SERVICE</h3>
      <div className="w-10 h-1 bg-red-500 mb-6"></div>
      <ul className="space-y-3">
        {["Customer Service", "Shipping & Returns", "Track Your Order", "Help Center", "Store Location", "Customer Feedback"].map((item) => (
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

export default FooterCustomerService;
