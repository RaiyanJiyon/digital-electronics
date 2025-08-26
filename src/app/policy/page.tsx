export const metadata = {
  title: "Privacy Policy | Digital Electronics",
  description:
    "Learn how Digital Electronics collects, uses, and protects your information. Read our privacy, cookies, and data security practices.",
};

export default function PolicyPage() {
  const sections = [
    {
      title: "Information We Collect",
      items: [
        "Account details (name, email, phone, shipping address)",
        "Order information (items purchased, payment method, invoices)",
        "Device & usage data (pages visited, interactions, IP, browser)",
        "Communications (support chats, emails, call logs)",
      ],
    },
    {
      title: "How We Use Your Information",
      items: [
        "Process orders, payments, deliveries, and returns",
        "Provide customer support and service updates",
        "Personalize product recommendations and offers",
        "Improve site performance, security, and user experience",
        "Comply with legal requirements and prevent fraud",
      ],
    },
    {
      title: "Sharing & Disclosure",
      items: [
        "Logistics partners for shipping and delivery",
        "Payment gateways for secure processing — we never store full card details",
        "Authorized service centers for warranty and repairs",
        "Analytics and security vendors to maintain platform reliability",
        "Legal authorities if required by applicable law",
      ],
    },
    {
      title: "Cookies & Tracking",
      items: [
        "Essential cookies to keep the site working (cart, login, preferences)",
        "Analytics cookies to understand usage and improve features",
        "Marketing cookies for relevant promotions (you can opt out)",
      ],
    },
    {
      title: "Data Security",
      items: [
        "Encryption in transit (HTTPS) and industry‑standard safeguards",
        "Role‑based access controls and routine security reviews",
        "Vendor due diligence for data processing partners",
      ],
    },
    {
      title: "Your Rights",
      items: [
        "Access, update, or delete your personal data",
        "Opt out of marketing communications at any time",
        "Withdraw consent where processing is based on consent",
      ],
    },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <section className="w-11/12 max-w-[1920px] mx-auto pt-12 pb-6">
        <div className="text-center">
          <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Policy</span>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">Privacy & Cookies</h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">Your privacy matters. This policy explains what we collect, how we use it, and the choices you have.</p>
        </div>
      </section>

      {/* Content */}
      <section className="w-11/12 max-w-[1920px] mx-auto pb-12">
        <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
          <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
          <div className="mt-6 space-y-8">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="text-xl font-semibold text-gray-900">{s.title}</h2>
                <ul className="mt-3 list-disc list-inside text-gray-700 space-y-1">
                  {s.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Contact Us</h2>
              <p className="mt-3 text-gray-700">
                For privacy inquiries or data requests, contact us at
                {" "}
                <a href="mailto:support@digitalelectronics.com" className="text-red-600 hover:underline">support@digitalelectronics.com</a>
                {" "}or visit our {" "}
                <a href="/contact" className="text-red-600 hover:underline">Contact page</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
