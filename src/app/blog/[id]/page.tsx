// app/blog/[id]/page.tsx

import { Blog } from "@/app/types/types";
import Image from "next/image";
import Link from "next/link";

// Mock list of related articles (could also be fetched from API or CMS)
const blogPosts: Blog[] = [
  {
    _id: "raspberry-pi",
    title: "Getting Started with Raspberry Pi",
    description: "Learn how to set up and use Raspberry Pi for IoT projects.",
    date: "2025-04-01",
    author: "Jane Doe",
    image: "/placeholder.svg?text=Raspberry+Pi",
  },
  {
    _id: "smart-devices",
    title: "Top 5 Smart Devices for Beginners",
    description:
      "Explore the best smart devices to start your home automation journey.",
    date: "2025-03-28",
    author: "Alex Smith",
    image: "/placeholder.svg?text=Smart+Devices",
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
  const res = await fetch(`http://localhost:3000/api/blogs/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load blog post");
  }

  const blog: Blog = await res.json();

  return (
    <div className="w-11/12 max-w-[1920px] mx-auto p-6">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900">{blog.title}</h1>
        <p className="text-gray-600 text-sm mt-2">
          By {blog.author} | {blog.date}
        </p>
      </header>

      {/* Featured Image */}
      <Image
        src={blog.image}
        alt={blog.title}
        width={800}
        height={400}
        className="w-full h-80 object-cover rounded-lg shadow-md"
      />

      {/* Article Content */}
      <article className="mt-6 text-gray-700 leading-relaxed text-lg">
        <p>{blog.description}</p>
      </article>

      {/* Key Takeaways */}
      <section className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900">Key Takeaways</h2>
        <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
          <li>Understand the basics of IoT and smart home devices.</li>
          <li>Choose the right components for your project.</li>
          <li>Follow step-by-step tutorials for better learning.</li>
          <li>Enhance home automation with smart devices.</li>
        </ul>
      </section>

      {/* Related Articles */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-900">
          Related Articles
        </h2>
        <div className="mt-4 space-y-4">
          {blogPosts
            .filter((post) => post._id !== blog._id)
            .slice(0, 2)
            .map((relatedPost) => (
              <Link href={`/blog/${relatedPost._id}`} key={relatedPost._id}>
                <div className="border-l-4 border-red-500 pl-4 hover:bg-gray-50 transition p-2 rounded">
                  <h3 className="text-lg font-medium">{relatedPost.title}</h3>
                  <p className="text-sm text-gray-600">
                    {relatedPost.description}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
};

export default BlogDetailsPage;
