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
		{ image: "/chopped-chin-chopped.gif", alt: "Slide 1" },
		{ image: "/logo.gif", alt: "Slide 2" },
		// Add more slides as needed
	];

	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-4 pt-8 bg-white text-black ml-20">
			<div className="flex flex-col items-center justify-center mt-16 p-4 rounded-md w-full max-w-full m-0">
				<div className="flex flex-row w-full m-0">
					<div className="text-7xl font-bold mb-8 text-left w-full whitespace-nowrap">
						<p>Plan smart.</p>
						<p>Balance better.</p>
						<p>Stress less.</p>
					</div>
					<div className="flex flex-col items-center justify-center w-full">
						<div className="flex flex-col items-center justify-between w-full overflow-x-hidden">
							<Carousel
								className="w-full max-w-xs"
								opts={{ loop: true }}
								plugins={[
									Autoplay({
										delay: 3000,
									}),
								]}
							>
								<CarouselContent>
									{slides.map((slide, index) => (
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
