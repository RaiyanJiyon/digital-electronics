import Image from "next/image";
import Banner from "./Banner";
import CantFind from "./cant-find";
import BestsellersWidget from "../shared/products/BestSellersWidget";
import ServiceHighlights from "./service-highlights";
import Testimonials from "../about-page/Testimonials";
import TestimonialSlider from "./testimonial-slider";

const HomePage = () => {
    return (
        <div>
            <Banner />

            <div className="flex flex-col lg:flex-row justify-between items-center gap-6 container mx-auto mt-16 px-4">
                <div className="w-full lg:w-[20%]">
                    <CantFind />
                    <div className="w-full mt-4 mb-8">
                        <Image 
                        src={"https://i.ibb.co.com/5XZ4jp63/item-3-1.jpg"}
                        alt=""
                        width={300}
                        height={50}
                        />
                    </div>
                    <BestsellersWidget />
                    <div className="w-full mt-6 mb-8">
                        <Image 
                        src={"https://i.ibb.co.com/LdT55pf3/item-4.jpg"}
                        alt=""
                        width={300}
                        height={50}
                        />
                    </div>
                    <ServiceHighlights />
                    <div className="mt-6">
                        <TestimonialSlider />
                    </div>
                </div>
                <div className="w-full lg:w-[80%]">
                    hello
                </div>
            </div>
        </div>
    );
};

export default HomePage;