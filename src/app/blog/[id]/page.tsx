// app/blog/[id]/page.tsx

import { notFound } from "next/navigation";
import Image from "next/image";

// Define the Blog type
interface Blog {
  _id: string;
  title: string;
  date: string;
  author: string;
  description: string;
  image: string;
}

// Fetch blog details by ID
const fetchBlogDetails = async (id: string): Promise<Blog | null> => {
  const res = await fetch(`${process.env.BASE_URL}/blog/api/${id}`, {
    cache: "no-store", // Disable caching for fresh data
  });

  if (!res.ok) {
    return null; // Handle API errors
  }

  const { data: blog }: { data: Blog } = await res.json();
  return blog;
};

const BlogDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  // Fetch the blog details
  const blog = await fetchBlogDetails(id);

  if (!blog) {
    notFound(); // Show a 404 page if the blog is not found
  }

  return (
    <div className="w-11/12 max-w-[1920px] mx-auto p-6">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900">{blog.title}</h1>
        <p className="text-gray-600 text-sm mt-2">By {blog.author} | {blog.date}</p>
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
        <ul className="list-disc list-inside text-gray-700 mt-2">
          <li>Understand the basics of IoT and smart home devices.</li>
          <li>Choose the right components for your project.</li>
          <li>Follow step-by-step tutorials for better learning.</li>
          <li>Enhance home automation with smart devices.</li>
        </ul>
      </section>

      {/* Related Articles */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-900">Related Articles</h2>
        <div className="mt-4 space-y-4">
          <div className="border-l-4 border-red-500 pl-4">
            <h3 className="text-lg font-medium">Getting Started with Raspberry Pi</h3>
            <p className="text-sm text-gray-600">Learn how to set up and use Raspberry Pi for IoT projects.</p>
          </div>
          <div className="border-l-4 border-red-500 pl-4">
            <h3 className="text-lg font-medium">Top 5 Smart Devices for Beginners</h3>
            <p className="text-sm text-gray-600">Explore the best smart devices to start your home automation journey.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetailsPage;