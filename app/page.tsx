"use client";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

export default function HomePage() {
	// Example slides data
	const slides = [
		{ image: "/logo.gif", alt: "Slide 1", isBig: false },
		{ image: "/img_dashboard.png", alt: "Slide 2", isBig: true },
		{ image: "/chopped-chin-chopped.gif", alt: "Slide 3", isBig: false },
		// Add more slides as needed
	];

	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-4 pt-8 bg-white text-black ml-20">
			<div className="flex flex-col items-center justify-center mt-16 p-4 rounded-md w-full max-w-full m-0">
				<div className="flex flex-row w-full m-0">
					<div className="w-full">
						<p className="text-7xl font-bold text-left w-full whitespace-nowrap">
							Plan smart.
						</p>
						<p className="text-7xl font-bold text-left w-full whitespace-nowrap">
							Balance better.
						</p>
						<p className="text-7xl font-bold text-left w-full whitespace-nowrap">
							Stress less.
						</p>
						<div className="flex flex-col mt-8">
							<p className="text-2xl">
								Juggle helps students balance academics and extracurriculars.
								Stay organized, prioritize tasks, and manage your schedule with
								ease!
							</p>
						</div>
					</div>
					<div className="flex flex-col items-center justify-center w-full">
						<div className="flex flex-col items-center justify-between w-full overflow-x-hidden">
							<Carousel
								className="w-full max-w-xs"
								opts={{ loop: true }}
								plugins={[
									Autoplay({
										delay: 2500,
									}),
								]}
							>
								<CarouselContent>
									{slides.map((slide, index) => (
										<CarouselItem key={index}>
											<div className="p-1 flex justify-center items-center">
												<Image
													src={slide.image}
													alt={slide.alt}
													width={slide.isBig ? 400 : 300} // Bigger width for Slide 2
													height={slide.isBig ? 150 : 100} // Bigger height for Slide 2
													className={`${slide.isBig ? "scale-105 mt-20" : ""}`} // Shift Slide 2 down
												/>
											</div>
										</CarouselItem>
									))}
								</CarouselContent>
							</Carousel>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}