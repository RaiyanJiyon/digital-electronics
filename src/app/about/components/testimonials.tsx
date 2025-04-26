"use client";

import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import Image from "next/image";
import { Quote } from "lucide-react";

const testimonials = [
  {
    image: "/assets/images/user-1.jpg",
    name: "Jane Doe",
    role: "Software Engineer",
    quote:
      "I had a fantastic experience shopping at Tech Haven. The range of gadgets is impressive and the prices are unbeatable.",
  },
  {
    image: "/assets/images/user-3.jpg",
    name: "John Smith",
    role: "Product Manager",
    quote:
      "The customer service at Tech Haven is top-notch. They helped me find the perfect device and even provided great after-sales support.",
  },
  {
    image: "/assets/images/user-2.jpg",
    name: "Emily Johnson",
    role: "UX Designer",
    quote:
      "Tech Haven offers a seamless shopping experience with their user-friendly platform. Highly recommended for all tech enthusiasts.",
  },
  {
    image: "/assets/images/user-1.jpg",
    name: "Michael Brown",
    role: "IT Specialist",
    quote:
      "I was impressed with the quality and variety of products available at Tech Haven. Their secure payment options make shopping worry-free.",
  },
];

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  imageUrl: string;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  quote,
  imageUrl,
  className = "",
}) => {
  return (
    <div
      className={`relative max-w-2xl mx-auto bg-red-500 rounded-bl-4xl ${className}`}
    >
      {/* Red curved accent */}
      {/* <div className="absolute top-0 left-0 right-0 h-16 " /> */}

      {/* Main card */}
      <div className="relative bg-gray-50 rounded-3xl pt-16 pb-20 px-8">
        {/* Quote mark */}
        <div className="absolute left-8 top-8">
          <Quote className="h-16 w-16 text-gray-200 rotate-180" />
        </div>

        {/* Content */}
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-900">{name}</h3>
          <p className="text-gray-400 uppercase tracking-wider text-sm">
            {role}
          </p>
          <p className="text-gray-600 leading-relaxed">{quote}</p>
        </div>

        {/* Profile Image */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-white">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={name}
              width={96}
              height={96}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <div className="w-11/12 max-w-[1920px] mx-auto">
      <Swiper
        className="mySwiper"
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <TestimonialCard
              name={testimonial.name}
              role={testimonial.role}
              quote={testimonial.quote}
              imageUrl={testimonial.image}
              className="mb-8"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
