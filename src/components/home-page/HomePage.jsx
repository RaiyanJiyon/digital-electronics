import Image from "next/image";
import Banner from "./Banner";
import CantFind from "./cant-find";
import BestSellersWidget from "../shared/products/BestSellersWidget";
import ServiceHighlights from "./service-highlights";
import TestimonialSlider from "./testimonial-slider";
import LatestBlogs from "./latest-blogs";
import CategoryTabs from "./category-tabs";
import PopularCategories from "./popular-categories";
import FeatureProducts from "./feature-products";


const HomePage = () => {
    return (
        <div>
            <Banner />
            <div className="flex flex-col lg:flex-row justify-between gap-6 w-[98%] max-w-[1920px] mx-auto mt-16 px-4">
                <div className="w-full lg:w-[20%]">
                    <div className="mb-4">
                        <CantFind />

                    </div>
                    <div className="hidden lg:flex w-full mb-8">
                        <Image
                            src={"https://i.ibb.co.com/5XZ4jp63/item-3-1.jpg"}
                            alt=""
                            className="w-full"
                            width={300}
                            height={50}
                        />
                    </div>
                    <BestSellersWidget />
                    <div className="hidden lg:flex w-full mt-6 mb-8">
                        <Image
                            src={"https://i.ibb.co.com/LdT55pf3/item-4.jpg"}
                            alt=""
                            className="w-full"
                            width={300}
                            height={50}
                        />
                    </div>
                    <ServiceHighlights />
                    <div className="my-10">
                        <TestimonialSlider />
                    </div>
                    <div className="mb-20">
                        <LatestBlogs />
                    </div>
                </div>
                <div className="w-full lg:w-[80%] space-y-14">
                    <CategoryTabs />
                    <PopularCategories />
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                        <Image 
                        src={"/assets/images/item-1.jpg"}
                        alt="item 1"
                        width={640}
                        height={228}
                        />
                        <Image 
                        src={"/assets/images/item-2.jpg"}
                        alt="item 1"
                        width={640}
                        height={228}
                        />
                    </div>
                    <div className="mb-16 lg:mb-0">
                    <FeatureProducts />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
