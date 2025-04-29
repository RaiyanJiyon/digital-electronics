import PageCover from "@/components/shared/PageCover";
import BlogCard from "@/app/blog/components/blog-card";
import SearchWidget from "@/app/blog/components/search-widget";
import CategoriesList from "@/app/blog/components/categories-list";
import ArchiveSection from "@/app/blog/components/archive-section";
import RecentPosts from "@/app/blog/components/recent-posts";
import { Blog } from "../types/types";

// Fetch blogs data from the API
const fetchBlogs = async (): Promise<Blog[]> => {
  const response = await fetch(`${process.env.BASE_URL}/api/blogs`, {
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
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 w-11/12 max-w-[1902px] mx-auto my-14">
        {/* Blog Cards Section */}
        <div className="grid col-span-1 lg:col-span-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
        {/* Sidebar Section */}
        <div className="space-y-6">
          <SearchWidget />
          <CategoriesList />
          <RecentPosts blogs={blogs} />
          <ArchiveSection />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
