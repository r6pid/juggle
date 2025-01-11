"use client";
import { Timeframe } from "@/types/user";
import { Loader, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export default function AvailabilityList({
	timeframes,
}: {
	timeframes: Timeframe[];
}) {
	const router = useRouter();
	const [loadingId, setLoadingId] = useState<string | null>(null);

	const deleteTimeframe = async (id: string) => {
		setLoadingId(id);
		try {
			const response = await fetch(`/api/availability/delete/`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: id,
				}),
			});
			const responseData = await response.json();
			if (!response.ok) {
				toast.error(responseData.error);
			} else {
				toast.success("Added Timeframe");
			}
		} catch (error) {
			toast.error("Something went wrong");
			console.error(error);
		} finally {
			router.refresh();
			setLoadingId(null);
		}
	};

	return (
		<div className="w-full grid gap-4 grid-cols-2">
			{timeframes.length < 1 && (
				<p>No timeframes yet, create one to get started!</p>
			)}
			{timeframes.map((timeframe, index) => (
				<div key={index}>
					<div className="flex flex-row items-center justify-between">
						<p>
							{timeframe.startDate.toLocaleString()} -{" "}
							{timeframe.endDate.toLocaleString()}
						</p>
						{loadingId === timeframe.id ? (
							<Loader size={18} className="animate-spin" />
						) : (
							<Trash
								color={"red"}
								size={18}
								className="cursor-pointer"
								onClick={() => deleteTimeframe(timeframe.id)}
							/>
						)}
					</div>
					<div className="flex items-center justify-between p-2 border border-gray-700 rounded-lg h-72"></div>
				</div>
			))}
		</div>
	);
}
