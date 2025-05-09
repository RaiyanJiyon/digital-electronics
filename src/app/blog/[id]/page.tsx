// app/blog/[id]/page.tsx

import { Blog } from "@/app/types/types";
import Image from "next/image";
import Link from "next/link";

// Mock list of related articles
const blogPosts: Blog[] = [
  {
    _id: "681e228d13b75bf0abda873c",
    title: "How to Choose the Best Laptop for Your Needs in 2025",
    excerpt:
      "Whether you're a student, gamer, or professional, our guide helps you pick the perfect laptop based on performance, budget, and portability.",
    author: "Sarah Lee",
    date: "2025-03-28",
    category: "Laptops",
    tags: ["laptops", "buying guide", "technology"],
    coverImage: "https://i.ibb.co.com/FLNSDQmk/Laptop.jpg ",
    content:
      "When choosing a laptop in 2025, it's important to consider... [Full article content here]",
    readTime: "6 min read",
    status: "published",
  },
  {
    _id: "681e228d13b75bf0abda873d",
    title: "The Rise of Foldable Phones: Are They Worth It?",
    excerpt:
      "Foldable phones are no longer a novelty. Discover their pros and cons and whether they’re right for your lifestyle.",
    author: "Michael Chen",
    date: "2025-03-20",
    category: "Mobile Tech",
    tags: ["foldable phones", "mobile tech", "innovation"],
    coverImage: "https://i.ibb.co.com/zTYwTfkd/Foldable-Phones.jpg ",
    content:
      "Foldable smartphones have taken a giant leap forward in design and durability... [Full article content here]",
    readTime: "7 min read",
    status: "published",
  },
  {
    _id: "681e228d13b75bf0abda873e",
    title: "Why You Should Upgrade to Wireless Earbuds in 2025",
    excerpt:
      "Wireless earbuds offer more than just convenience. Learn how they enhance sound quality, battery life, and daily usability.",
    author: "Emily Zhang",
    date: "2025-03-15",
    category: "Accessories",
    tags: ["wireless earbuds", "audio tech", "gadgets"],
    coverImage: "https://i.ibb.co.com/8g9h3qRc/Wireless-Earbuds.jpg ",
    content:
      "With new Bluetooth versions and active noise cancellation... [Full article content here]",
    readTime: "4 min read",
    status: "published",
  },
];

// Server-side async component
const BlogDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  // Simulate fetching data from an API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load blog post");
  }

  const blog: Blog = await res.json();

  return (
    <div className="w-11/12 max-w-[1920px] mx-auto p-6">
      {/* Header */}
      <header className="text-center mb-6">
        <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
          {blog.category}
        </span>
        <h1 className="text-4xl font-bold text-gray-900">{blog.title}</h1>
        <p className="text-gray-600 text-sm mt-2">
          By {blog.author} | {blog.date} | {blog.readTime}
        </p>
      </header>

      {/* Featured Image */}
      <div className="rounded-lg overflow-hidden shadow-md mb-6">
        <Image
          src={blog.coverImage.trim()}
          alt={blog.title}
          width={1200}
          height={600}
          className="w-full h-80 object-cover"
        />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {blog.tags?.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Article Content */}
      <article className="mt-6 text-gray-700 leading-relaxed text-lg">
        <p className="mb-6">{blog.excerpt}</p>
        <p>{blog.content}</p>
      </article>

      {/* Key Takeaways */}
      <section className="mt-10 bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900">Key Takeaways</h2>
        <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
          <li>Modern gaming laptops offer near-desktop-level performance.</li>
          <li>New thermal designs allow for thinner and quieter machines.</li>
          <li>OLED and high-refresh displays enhance visuals significantly.</li>
          <li>
            Battery life has improved dramatically despite increased power.
          </li>
        </ul>
      </section>

      {/* Related Articles */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          You Might Also Like
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts
            .filter((post) => post._id !== blog._id)
            .slice(0, 2)
            .map((relatedPost) => (
              <Link
                href={`/blog/${relatedPost._id}`}
                key={relatedPost._id}
                className="block group"
              >
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow">
                  <div className="relative h-40">
                    <Image
                      src={relatedPost.coverImage.trim()}
                      alt={relatedPost.title}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {relatedPost.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg group-hover:text-blue-600 transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <div className="mt-3 flex justify-between items-center text-xs text-gray-500">
                      <span>{relatedPost.date}</span>
                      <span>{relatedPost.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
};

export default BlogDetailsPage;
