export const dynamic = "force-dynamic";

import PageCover from "@/components/shared/page-cover";
import BlogLayoutClient from "@/app/blog/components/blog-layout-client";
import CategoriesList from "@/app/blog/components/categories-list";
import ArchiveSection from "@/app/blog/components/archive-section";
import RecentPosts from "@/app/blog/components/recent-posts";
import { Blog } from "../types/types";

// Fetch blogs data from the API
const fetchBlogs = async (): Promise<Blog[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`, {
    cache: "no-store", // Disable caching for fresh data
  });

  if (!response.ok) {
    throw new Error("Failed to fetch blogs data");
  }

  const { data }: { data: Blog[] } = await response.json();
  return data;
};

const BlogPage = async () => {
  // Fetch blogs data during server render
  const blogs = await fetchBlogs();

  return (
    <div>
      <div className="mt-12">
        <PageCover prev="Smart Phones" next="Blogs" />
      </div>
      <BlogLayoutClient blogs={blogs}>
        <CategoriesList />
        <RecentPosts blogs={blogs} />
        <ArchiveSection />
      </BlogLayoutClient>
    </div>
  );
};

export default BlogPage;
