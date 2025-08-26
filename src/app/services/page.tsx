export const metadata = {
  title: "Our Services | Digital Electronics",
  description:
    "Explore our services: fast delivery, certified installations, warranty & repairs, trade-in, expert support, and easy returns at Digital Electronics.",
};

export default function ServicesPage() {
  const services = [
    {
      title: "Fast & Free Delivery",
      desc: "Free shipping on qualified orders with real‑time tracking and delivery updates.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l6 6"/><path d="M3 12l6 6"/><path d="M3 7l6 6"/><path d="M3 2l6 6"/><path d="M9 22h10a2 2 0 0 0 2-2v-7H9z"/><path d="M14 9h7l-3-5h-4z"/></svg>
      )
    },
    {
      title: "Certified Installation",
      desc: "Home/office setup by certified technicians for TVs, audio systems and smart devices.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l4 7-4 4-4-4 4-7z"/><path d="M5 22h14"/><path d="M9 13v9"/><path d="M15 13v9"/></svg>
      )
    },
    {
      title: "Warranty & Repairs",
      desc: "Genuine parts and authorized service with pickup & return options.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-8"/><path d="M4 21v-8"/><path d="M12 3l7 4v4c0 5-3.5 9-7 9s-7-4-7-9V7l7-4z"/></svg>
      )
    },
    {
      title: "Trade‑In & Upgrade",
      desc: "Trade in old devices for instant credit towards your next purchase.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7h5l-2-2m2 2L6 9"/><path d="M21 17h-5l2 2m-2-2l2-2"/><path d="M8 7h8v10H8z"/></svg>
      )
    },
    {
      title: "Expert Tech Support",
      desc: "Get help via chat, call, or in‑store—setup, troubleshooting, and tutorials.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a4 4 0 0 1-4 4h-3l-4 3v-3H7a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/></svg>
      )
    },
    {
      title: "Easy Returns",
      desc: "Hassle‑free 7‑day returns and exchanges with instant status updates.",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
      )
    },
  ];

  const values = [
    { title: "Genuine Products", desc: "We source directly from brands and authorized distributors." },
    { title: "Transparent Pricing", desc: "No hidden fees—clear, competitive prices you can trust." },
    { title: "Secure Payments", desc: "PCI‑compliant checkout with multiple payment options." },
  ];

  const faqs = [
    {
      q: "Do you offer same‑day delivery?",
      a: "Same‑day delivery is available in select city areas for eligible items at checkout.",
    },
    {
      q: "How do I book an installation?",
      a: "Choose \"Add Installation\" during checkout or contact support to schedule a visit.",
    },
    {
      q: "What is your return policy?",
      a: "Most products can be returned within 7 days if unused and in original packaging.",
    },
    {
      q: "Can I trade in any device?",
      a: "We accept most popular smartphones, laptops, and wearables—valuation is shown instantly.",
    },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <section className="w-11/12 max-w-[1920px] mx-auto pt-12 pb-10">
        <div className="text-center">
          <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Our Services</span>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">Everything you need—before and after you buy</h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">From fast delivery to expert setup and long‑term support, we make technology effortless.</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="w-11/12 max-w-[1920px] mx-auto pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="group bg-white rounded-xl border border-gray-200 p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1 hover:border-red-200">
              <div className="w-10 h-10 rounded bg-red-50 text-red-600 grid place-items-center mb-3 transition-colors duration-200 group-hover:bg-red-100 group-hover:text-red-700">
                {s.icon}
              </div>
              <h3 className="font-semibold text-lg">{s.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Value Props */}
      <section className="w-11/12 max-w-[1920px] mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v) => (
            <div key={v.title} className="bg-white rounded-xl p-5 border border-gray-200 transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-gray-300">
              <h4 className="font-semibold">{v.title}</h4>
              <p className="text-gray-600 text-sm mt-1">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="w-11/12 max-w-[1920px] mx-auto py-10">
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="divide-y divide-gray-200 bg-white rounded-lg border">
          {faqs.map((f, i) => (
            <details key={i} className="p-4 group">
              <summary className="cursor-pointer list-none font-medium flex items-center justify-between">
                <span>{f.q}</span>
                <span className="text-gray-400 group-open:rotate-180 transition">⌄</span>
              </summary>
              <p className="text-gray-600 text-sm mt-2 pl-1">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="w-11/12 max-w-[1920px] mx-auto py-12">
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 md:p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold">Need help choosing the right product?</h3>
            <p className="text-red-100 mt-1">Talk to our experts for personalized recommendations and setup advice.</p>
          </div>
          <a href="/contact" className="inline-block bg-white text-red-600 font-medium px-5 py-2 rounded-md hover:bg-red-50">Contact Us</a>
        </div>
      </section>
    </div>
  );
}
