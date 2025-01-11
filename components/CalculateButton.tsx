"use client";
import React, { useState } from "react";
import { Button } from "./ui/button"; // Assuming you have a Button component
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

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
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const calculateAssignments = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(`/api/calculate/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({}),
			});
			const responseData = await response.json();
			if (!response.ok) {
				toast.error(responseData.error);
			} else {
				toast.success("Succesfully Calculated Assignments");
			}
		} catch (error) {
			toast.error("Something went wrong");
			console.error(error);
		} finally {
			router.refresh();
			setIsLoading(false);
		}
	};
	return (
		<div className="flex flex-row items-center gap-2 ml-auto">
			<Button
				onClick={() => calculateAssignments()}
				variant={variant} // You can pass a variant for button styles (e.g., outline)
			>
				{isLoading ? <Loader className="mr-2 animate-spin" /> : children}
			</Button>
		</div>
	);
}
