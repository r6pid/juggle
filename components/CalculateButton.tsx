"use client";
import React from "react";
import { Button } from "./ui/button"; // Assuming you have a Button component
import { Checkbox } from "@/components/ui/checkbox";

export default function CalculateButton({
	children,
	variant,
}: {
	children: React.ReactNode;
	variant?:
		| "default"
		| "destructive"
		| "outline"
		| "secondary"
		| null
		| undefined;
}) {
	return (
		<div className="flex flex-row items-center gap-2 ml-auto">
			<div className="p-1 px-2 h-9 flex flex-row items-center justify-center gap-2 border border-muted1 rounded-md">
				<Checkbox id="terms" />
				<p>Keep Assignments?</p>
			</div>
			<Button
				variant={variant} // You can pass a variant for button styles (e.g., outline)
			>
				{children}
			</Button>
		</div>
	);
}
