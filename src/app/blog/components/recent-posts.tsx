import { Blog } from "@/app/types/types";
import Link from "next/link";

interface BlogsProps {
  blogs: Blog[];
}

const RecentPosts = ({ blogs }: BlogsProps) => {
  return (
    <div className="border border-gray-200 rounded-md overflow-hidden">
      <div className="bg-red-500 text-white text-sm font-bold py-3 px-4 uppercase">
        Recent Posts
      </div>
      <div className="p-4">
        <ul className="px-4 pl-6">
          {blogs.map((blog) => (
            <li key={blog._id} className="list-disc">
              <Link
                href={`/blog/${blog._id}`}
                className="block py-3 text-sm text-gray-800 hover:text-red-500 transition-colors"
              >
                {blog.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecentPosts;
