"use client";

import AboutCard from "@/app/about/components/about-card";
import FeaturesSection from "@/app/about/components/features-section";
import HeroSection from "@/app/about/components/hero-section";
import Testimonials from "@/app/about/components/testimonials";
import PageCover from "@/components/shared/page-cover";
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
      <div>
        <AboutCard />
      </div>
      <div className="mt-10">
        <FeaturesSection />
      </div>
      <div className="my-10">
        <Testimonials />
      </div>
    </div>
  );
};

export default AboutPage;
