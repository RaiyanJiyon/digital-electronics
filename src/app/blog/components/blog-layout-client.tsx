"use client";

import React from "react";
import BlogCard from "@/app/blog/components/blog-card";
import SearchWidget from "@/app/blog/components/search-widget";
import { Blog } from "@/app/types/types";

type Props = {
  blogs: Blog[];
  children?: React.ReactNode; // sidebar widgets below the search
};

export default function BlogLayoutClient({ blogs, children }: Props) {
  const [query, setQuery] = React.useState("");

  const normalized = (s: string) => s.toLowerCase();
  const filtered = React.useMemo(() => {
    const q = normalized(query).trim();
    if (!q) return blogs;
    return blogs.filter((b) => {
      const inTitle = normalized(b.title).includes(q);
      const inExcerpt = normalized(b.excerpt ?? "").includes(q);
      const inAuthor = normalized(b.author ?? "").includes(q);
      const inCategory = normalized(b.category ?? "").includes(q);
      const inTags = (b.tags ?? []).some((t) => normalized(t).includes(q));
      return inTitle || inExcerpt || inAuthor || inCategory || inTags;
    });
  }, [blogs, query]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 container px-4 mx-auto my-14">
      {/* Blog Cards Section */}
      <div className="grid col-span-1 lg:col-span-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filtered.length > 0 ? (
          filtered.map((blog) => <BlogCard key={blog._id} blog={blog} />)
        ) : (
          <div className="col-span-full text-center text-gray-500 py-10 border rounded-md">
            No posts found for &quot;{query}&quot;.
          </div>
        )}
      </div>

      {/* Sidebar Section */}
      <div className="space-y-6">
        <SearchWidget value={query} onChange={setQuery} onSubmit={() => {}} />
        {children}
      </div>
    </div>
  );
}
