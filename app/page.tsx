"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import React from "react";
import Image from "next/image"; // Added missing import

const swiperModules = [Autoplay]; // Define the Autoplay module

export default function HomePage() {
  // Example slides data
  const slides = [
    { image: "/chopped-chin-chopped.gif", alt: "Slide 1" },
    { image: "/logo.png", alt: "Slide 2" },
    // Add more slides as needed
  ];

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-white text-black overflow-x-hidden">
      <div className="flex flex-col mt-16 p-4 rounded-md w-5/6 max-w-full m-0">
        <div className="flex flex-row w-full m-0">
          <div className="text-7xl font-bold mb-8 text-left w-2/3 whitespace-nowrap">
            <p>Plan smart.</p>
            <p>Balance better.</p>
            <p>Stress less.</p>
          </div>
          <div className="flex flex-col items-center justify-center w-full"> {/* Fixed width issue */}
            <div className="flex flex-col items-center justify-between w-full overflow-x-hidden">
              <Carousel 
                className="w-full max-w-xs"
                opts={{loop: true}}
              >
                <CarouselContent>
                  {slides.map((slide, index) => ( // Replaced dummy array with actual data
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Image
                          src={slide.image}
                          alt={slide.alt}
                          width={300}
                          height={100}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </div>
        <div className="w-full">
          <p className="text-3xl text-left">
            Juggle helps students balance academics and
            <br />
            extracurriculars. Stay organized, prioritize tasks,
            <br />
            and manage your schedule with ease!
          </p>
        </div>
      </div>
    </div>
  );
}