import HeroSection from "@/components/about-page/HeroSection";
import PageCover from "@/components/shared/PageCover";
import React from "react";

const AboutPage: React.FC = () => {
    return (
        <div>
            <div className="mt-12">
                <PageCover prev="Home" next="About Us" />
            </div>
            <div>
                <HeroSection />
            </div>
        </div>
    );
};

export default AboutPage;