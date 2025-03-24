"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User } from "lucide-react";

// Sample blog data
const blogs = [
  {
    _id: "67d6e4fe29a825b76cff4b91",
    title: "Join Millions of Others in the World of Digital Electronics",
    date: "June 17, 2019",
    author: "admin",
    description:
      "Egestas mus a mus rhoncus adipiscing iaculis facilisis a eu nunc varius a per parturient vestibulum suspendisse aenean semper velit aliquam",
    image: "https://i.ibb.co.com/RpvFHCWk/8.png",
  },
  {
    _id: "67d6e4fe29a825b76cff4b92",
    title: "The Future of Smart Home Technology Is Here",
    date: "July 23, 2019",
    author: "admin",
    description:
      "Smart home technology has evolved rapidly in recent years, transforming the way we interact with our living spaces. From voice-controlled assistants to automated lighting systems...",
    image: "https://i.ibb.co.com/RpvFHCWk/7.png",
  },
  {
    _id: "67d6e4fe29a825b76cff4b93",
    title: "5 Tech Gadgets You Need for Your Next Adventure",
    date: "August 5, 2019",
    author: "admin",
    description:
      "Planning your next outdoor adventure? Don't forget to pack these essential tech gadgets that will enhance your experience and keep you connected even in the most remote locations...",
    image: "https://i.ibb.co.com/RpvFHCWk/6.png",
  },
];

const LatestBlogs: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Function to navigate to a specific slide
  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-red-500 text-white py-3 px-4 font-bold">LATEST BLOGS</div>

      {/* Content Wrapper */}
      <div className="p-4 px-2 bg-white">
        {/* Blog Slides Container */}
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {/* Map each blog post to a slide */}
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="w-full p-4 flex-shrink-0"
            >
              {/* Blog Image */}
              <Link href={`/blog/${blog._id}`}>
                <div className="relative w-full h-48 mb-3 overflow-hidden rounded-md">
                  <Image
                    src={blog.image || "/placeholder.svg?height=192&width=384"}
                    alt={blog.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>

              {/* Blog Title */}
              <Link href={`/blog/${blog._id}`}>
                <h3 className="font-semibold text-gray-800 hover:text-red-500 transition-colors line-clamp-2 mb-2">
                  {blog.title}
                </h3>
              </Link>

              {/* Blog Meta */}
              <div className="flex items-center text-sm text-gray-500 mb-2 space-x-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{blog.date}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span className="text-red-500">{blog.author}</span>
                </div>
              </div>

              {/* Blog Excerpt */}
              <p className="text-gray-600 text-sm line-clamp-3">{blog.description}</p>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center space-x-2">
          {blogs.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                index === activeIndex ? "bg-red-500" : "bg-gray-300"
              }`}
              aria-label={`Go to blog ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestBlogs;