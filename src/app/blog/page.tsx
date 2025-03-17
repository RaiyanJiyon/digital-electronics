import PageCover from "@/components/shared/PageCover";
import BlogCard from "@/components/blog-page/BlogCard";
import SearchWidget from "@/components/blog-page/SearchWidget";
import CategoriesList from "@/components/blog-page/CategoriesList";

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
      <div className="grid grid-cols-4 gap-6 w-11/12 max-w-[1902px] mx-auto my-14">
      <div className="grid col-span-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {blogs.map((blog, _id) => (
          <BlogCard key={_id} blog={blog} />
        ))}
      </div>
      <div className="space-y-6">
        <SearchWidget />
        <CategoriesList />
      </div>

      </div>
    </div>
  );
};

export default BlogPage;
