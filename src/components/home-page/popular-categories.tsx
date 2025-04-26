"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Image from "next/image";

const categories = [
  {
    name: "Laptop",
    image: "https://i.ibb.co/1fbwFk2t/laptop-category.png",
  },
  {
    name: "Digital Cameras",
    image: "https://i.ibb.co/JN4MKGq/digital-cameras-category.png",
  },
  {
    name: "Smartphones",
    image: "https://i.ibb.co/Zpbbwpmb/smartphones-category.png",
  },
  {
    name: "Smart Televisions",
    image: "https://i.ibb.co/v7hmbwY/smart-televisions-category.png",
  },
  {
    name: "Audio Theaters",
    image: "https://i.ibb.co/HL1t6WXG/audio-theaters-category.png",
  },
  {
    name: "Smart Watches",
    image: "https://i.ibb.co/B2f8pys2/smart-watches-category.png",
  },
  {
    name: "All accessories",
    image: "https://i.ibb.co/k61Hz25m/all-accessories-category.png",
  },
  {
    name: "Men's Watches",
    image: "https://i.ibb.co/Vc8mjHvG/mens-watches-category.png",
  },
];

const PopularCategories = () => {
  return (
    <div>
      <div className="flex justify-center items-center mb-10">
        <h1 className="text-2xl font-bold">Popular Categories</h1>
        <div className="flex-grow border-b-2 border-gray-300 ml-4 mt-1"></div>
      </div>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        breakpoints={{
          // When window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          // When window width is >= 480px
          480: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          // When window width is >= 768px
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          // When window width is >= 1024px
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          // When window width is >= 1280px
          1280: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index}>
            <div className="bg-[#f5f5f5] flex flex-col justify-center items-center p-4 rounded-sm">
              <Image
                src={`${category.image}`}
                alt={`${category.name} image`}
                width={145}
                height={135}
                unoptimized
              />
              <h2 className="text-sm mt-2">{category.name}</h2>
              <p className="text-xs text-gray-500">11 Devices</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularCategories;
