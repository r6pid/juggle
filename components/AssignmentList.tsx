import React from "react";

export default function PlaceholderTable({ rows = 7, columns = 2 }) {
	return (
		<div
			className="w-full grid gap-4"
			style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
		>
			{Array.from({ length: rows * columns }).map((_, index) => (
				<div
					key={index}
					className="flex shadow-md items-center justify-between p-2 border border-gray-700 rounded-lg h-12"
				>
					{/* Text Placeholder */}
					<div className="w-3/5 h-4 bg-gray-700 rounded"></div>
					{/* Circle Placeholder */}
					<div className="w-4 h-4 rounded-full bg-gray-700"></div>
				</div>
			))}
		</div>
	);
}
