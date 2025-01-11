"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import React from "react";

const swiperModules = [Autoplay]; // Define the Autoplay module

export default function HomePage() {
  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-white text-black overflow-x-hidden">
      <div className="flex flex-col mt-8 p-4 rounded-md w-5/6 max-w-full m-0">
        <div className="flex flex-row w-full m-0">
          <div className="text-8xl font-bold mb-8 text-left w-2/3 whitespace-nowrap">
            <p>Plan smart.</p>
            <p>Balance better.</p>
            <p>Stress less.</p>
          </div>
          <div className="flex flex-col items-center justify-center w-1/2">
            <div className="flex flex-col items-center justify-center w-1/2 overflow-x-hidden">
              <Swiper
                modules={swiperModules}
                spaceBetween={50}
                slidesPerView={1}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
              >
                <SwiperSlide>
                  <Image src="/chopped-chin-chopped.gif" alt="Slide 1" width={300} height={100} />
                </SwiperSlide>
                <SwiperSlide>
                  <Image src="/logo.png" alt="Slide 2" width={250} height={150} />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
        <div className="w-full mt-5">
          <p className="text-3xl text-left">
            Juggle helps students balance academics and extracurriculars.
            <br />
            Stay organized, prioritize tasks,
            <br />
            and manage your schedule with ease!
          </p>
        </div>
      </div>
    </div>
  );
}