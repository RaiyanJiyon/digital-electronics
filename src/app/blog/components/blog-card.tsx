import { Blog } from "@/app/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Update the interface
interface BlogCardTypes {
  blog: Blog; // No more nested `data` field!
}

const BlogCard: React.FC<BlogCardTypes> = ({ blog }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link href={`/blog/${blog._id}`}>
        <Image
          className="rounded-sm hover:scale-105 transition-transform duration-300"
          src={blog?.coverImage.trim() || ""} // Add fallback if needed
          alt={`${blog.title} image`}
          width={400}
          height={200}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>
      <div className="p-5">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 line-clamp-2 hover:text-red-500 transition-colors">
          <Link href={`/blog/${blog._id}`}>{blog?.title}</Link>
        </h5>
        <p className="mb-4 text-sm text-gray-600 line-clamp-3">
          {blog?.excerpt}
        </p>
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>{blog?.date}</span>
          <span>{blog?.readTime}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
