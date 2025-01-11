import React from "react";

export default function PlaceholderTable({ rows = 2, columns = 3 }) {
	return (
		<div
			className={`w-full grid gap-4`}
			style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
		>
			{Array.from({ length: rows * columns }).map((_, index) => (
				<div
					key={index}
					className="flex items-center justify-between p-2 border border-gray-700 rounded-lg h-72"
				></div>
			))}
		</div>
	);
}
