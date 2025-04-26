"use client";

import { useState } from "react";
import Image from "next/image";
import { Quote } from "lucide-react"; // Importing the Quote icon from lucide-react

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
}

// Array of testimonials data
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "UX Designer",
    image: "/assets/images/user-2.jpg",
    quote:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
  },
  {
    id: 2,
    name: "Tom Cerny",
    role: "Web Developer",
    image: "/assets/images/user-1.jpg",
    quote:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "Product Manager",
    image: "/assets/images/user-3.jpg",
    quote:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
  },
];

const TestimonialSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Function to change the active testimonial
  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  const activeTestimonial = testimonials[activeIndex]; // Get the currently active testimonial

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-red-500 text-white py-3 px-4 font-bold text-center">
        TESTIMONIALS
      </div>

      {/* Content */}
      <div className="p-6 bg-white flex flex-col items-center">
        {/* Profile Image */}
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 shadow-sm mb-4">
          <Image
            src={
              activeTestimonial.image || "/placeholder.svg?height=96&width=96"
            }
            alt={activeTestimonial.name}
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name and Role */}
        <h3 className="text-xl font-bold text-gray-800">
          {activeTestimonial.name}
        </h3>
        <p className="text-gray-500 italic mb-6">{activeTestimonial.role}</p>

        {/* Quote */}
        <div className="relative">
          <span className="absolute -left-2 -top-6 text-red-500 text-xl">
            <Quote /> {/* Using the Quote icon from Lucide */}
          </span>
          <p className="text-gray-600 text-sm text-center mb-2">
            {activeTestimonial.quote}
          </p>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center space-x-2 mt-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full ${
                index === activeIndex ? "bg-red-500" : "bg-gray-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
