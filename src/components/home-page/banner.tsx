"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

const Banner = () => {
    const bannerImages = [
        "https://i.ibb.co/21mjyx2m/item-1.jpg",
        "https://i.ibb.co/8nWs3qWb/item-2.jpg",
        "https://i.ibb.co/F488jxgv/item-3.jpg"
    ];

    return (
        <div>
            <Swiper
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 3000, // Auto slide every 3 seconds
                    disableOnInteraction: false, // Keep autoplay running after user interaction
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
            >
                {
                    bannerImages.map((bannerImage, index) => (
                        <SwiperSlide key={index}>
                            <Image 
                                src={bannerImage} 
                                alt={`Banner image ${index + 1}`} 
                                layout="responsive" 
                                width={2000} 
                                height={200} 
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
};

export default Banner;
