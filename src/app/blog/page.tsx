// "use client";
import Link from "next/link";
import PageCover from "@/components/shared/PageCover";
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

// Fetch blogs with proper typing
const fetchBlogs = async (): Promise<Blog[]> => {
  const res = await fetch(`${process.env.BASE_URL}/blog/api`);
  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }
  const { data: blogs }: { data: Blog[] } = await res.json();
  return blogs;
};

const BlogPage = async () => {
  const blogs = await fetchBlogs();

  return (
    <div>
      <div className="mt-12">
        <PageCover prev="Smart Phones" next="Blogs" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-11/12 max-w-[1902px] mx-auto my-14">
        {blogs.map((blog, _id) => (
          <div key={_id} className="bg-white">
            <Link href={`${process.env.BASE_URL}/blog/${blog._id}`}>
              <Image
                className="rounded-sm"
                src={blog?.image}
                alt={`${blog.title} image`}
                layout="intrinsic"
                width={400}
                height={200}
              />
            </Link>
            <div className="py-5">
              <div>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 h-28">
                  {blog?.title}
                </h5>
              </div>
              <p className="mb-3 font-normal text-gray-500">
                {blog?.description.split(" ").slice(0, 20).join(" ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
