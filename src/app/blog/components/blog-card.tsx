import { Blog } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BlogCardTypes {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardTypes> = ({ blog }) => {
  return (
    <div className="bg-white">
      <Link href={`/blog/${blog._id}`}>
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
  );
};

export default BlogCard;
