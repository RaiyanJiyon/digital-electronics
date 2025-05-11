import Image from "next/image";
import Banner from "./banner";
import CantFind from "./cant-find";
import BestSellersWidget from "../shared/products/best-sellers-widget";
import ServiceHighlights from "./service-highlights";
import TestimonialSlider from "./testimonial-slider";
import LatestBlogs from "./latest-blogs";
import CategoryTabs from "./category-tabs";
import PopularCategories from "./popular-categories";
import FeatureProducts from "./feature-products";
import TrendingProducts from "./trending-products";

export default function HomePage() {
    return (
        <div>
            {/* Main Banner */}
            <Banner />

            {/* Main Content Section */}
            <div className="flex flex-col lg:flex-row justify-between gap-6 w-[98%] max-w-[1920px] mx-auto mt-16 px-4">
                {/* Left Sidebar (20% width on large screens) */}
                <div className="w-full lg:w-[20%] space-y-8">
                    {/* CantFind Component */}
                    <div className="mb-4">
                        <CantFind />
                    </div>

                    {/* Left Sidebar Images (Visible only on large screens) */}
                    <div className="hidden lg:flex w-full mb-8">
                        <Image
                            src={"https://i.ibb.co.com/5XZ4jp63/item-3-1.jpg"}
                            alt="Sidebar Ad 1"
                            className="w-full object-cover"
                            width={300}
                            height={100} // Adjusted height for better aspect ratio
                        />
                    </div>

                    {/* Best Sellers Widget */}
                    <BestSellersWidget />

                    {/* Another Sidebar Image (Visible only on large screens) */}
                    <div className="hidden lg:flex w-full mt-6 mb-8">
                        <Image
                            src={"https://i.ibb.co.com/LdT55pf3/item-4.jpg"}
                            alt="Sidebar Ad 2"
                            className="w-full object-cover"
                            width={300}
                            height={100} // Adjusted height for better aspect ratio
                        />
                    </div>

                    {/* Service Highlights */}
                    <ServiceHighlights />

                    {/* Testimonials */}
                    <div className="my-10">
                        <TestimonialSlider />
                    </div>

                    {/* Latest Blogs */}
                    <div className="mb-20">
                        <LatestBlogs />
                    </div>
                </div>

                {/* Right Main Content (80% width on large screens) */}
                <div className="w-full lg:w-[80%] space-y-14">
                    {/* Category Tabs */}
                    <CategoryTabs />

                    {/* Popular Categories */}
                    <PopularCategories />

                    {/* Trending Products */}
                    <TrendingProducts />

                    {/* Promotional Images */}
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                        <Image
                            src={"/assets/images/item-1.jpg"}
                            alt="Promotional Image 1"
                            className="w-full object-cover"
                            width={640}
                            height={228}
                        />
                        <Image
                            src={"/assets/images/item-2.jpg"}
                            alt="Promotional Image 2"
                            className="w-full object-cover"
                            width={640}
                            height={228}
                        />
                    </div>

                    {/* Featured Products */}
                    <div className="mb-16">
                        <FeatureProducts />
                    </div>
                </div>
            </div>
        </div>
    );
};