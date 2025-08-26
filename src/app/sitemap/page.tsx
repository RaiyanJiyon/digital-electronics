import Link from "next/link";

export const metadata = {
  title: "HTML Sitemap | Digital Electronics",
  description:
    "Browse the full list of pages across Digital Electronics: shop, blog, services, policy, contact and more.",
};

export default function HtmlSitemapPage() {
  const groups: Array<{ title: string; links: Array<{ href: string; label: string }> }> = [
    {
      title: "General",
      links: [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
        { href: "/services", label: "Services" },
        { href: "/policy", label: "Privacy Policy" },
        { href: "/sitemap", label: "HTML Sitemap" },
      ],
    },
    {
      title: "Shop",
      links: [
        { href: "/shop", label: "All Products" },
        { href: "/compare", label: "Compare" },
        // Category landing pages can be added here if available, e.g. /shop/category/phones
      ],
    },
    {
      title: "Blog",
      links: [
        { href: "/blog", label: "Blog Home" },
        // Individual posts are dynamic at /blog/[id]
      ],
    },
    {
      title: "Account & Orders",
      links: [
        { href: "/orders", label: "Orders & Returns" },
        // Add /auth/login etc. if present in the project
      ],
    },
  ];

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <section className="w-11/12 max-w-[1920px] mx-auto pt-12 pb-8">
        <div className="text-center">
          <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Sitemap</span>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">Site Index</h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Quick access to every main page across the site. For products and posts, visit the respective listings.
          </p>
        </div>
      </section>

      {/* Links */}
      <section className="w-11/12 max-w-[1920px] mx-auto pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((g) => (
            <div key={g.title} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">{g.title}</h2>
              <ul className="mt-3 space-y-2">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-red-600 hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
