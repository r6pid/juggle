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
		<>
			{timeframes.length < 1 && (
				<p className="w-full">No timeframes yet, create one to get started!</p>
			)}
			<div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
				{timeframes.map((timeframe, index) => (
					<div key={index}>
						<div className="flex flex-row items-center justify-between">
							<p>
								{new Date(timeframe.startDate).toLocaleString("en-US", {
									month: "short",
									day: "numeric",
									hour: "2-digit",
									minute: "2-digit",
								})}{" "}
								-{" "}
								{new Date(timeframe.endDate).toLocaleString("en-US", {
									month: "short",
									day: "numeric",
									hour: "2-digit",
									minute: "2-digit",
								})}
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
						<div className="flex flex-col gap-2 w-full p-2 border border-gray-700 rounded-lg min-h-72">
							{timeframe.assignments
								.filter((assignment) => assignment.timeframeId === timeframe.id)
								.map((assignment) => (
									<div
										className="flex flex-row p-2 border bg-border rounded-sm items-center justify-between"
										key={assignment.id}
									>
										<p>{assignment.name}</p>
										{assignment.priority >= 7 && (
											<p className="text-red-500">
												{assignment.allocation! > 60
													? `${(assignment.allocation! / 60).toFixed(1)}h`
													: `${assignment.allocation}m`}
											</p>
										)}
										{assignment.priority >= 4 && assignment.priority <= 6 && (
											<p className="text-yellow-500">
												{assignment.allocation! > 60
													? `${(assignment.allocation! / 60).toFixed(1)}h`
													: `${assignment.allocation}m`}
											</p>
										)}
										{assignment.priority < 4 && (
											<p className="text-green-500">
												{assignment.allocation! > 60
													? `${(assignment.allocation! / 60).toFixed(1)}h`
													: `${assignment.allocation}m`}
											</p>
										)}
									</div>
								))}
						</div>
					</div>
				))}
			</div>
		</>
	);
}
