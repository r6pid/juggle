"use client";
import { Assignment } from "@/types/user";
import { Loader, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export default function AssignmentList({
	assignments,
}: {
	assignments: Assignment[];
}) {
	const router = useRouter();
	const [loadingId, setLoadingId] = useState<string | null>(null);

	const deleteAssignment = async (id: string) => {
		setLoadingId(id);
		try {
			const response = await fetch(`/api/assignments/delete/`, {
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
				toast.success("Added Assignment");
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
			{assignments.length < 1 && (
				<p>No assignments yet, create one to get started!</p>
			)}
			{assignments.map((assignment, index) => (
				<div
					key={index}
					className="flex shadow-md items-center justify-between p-2 px-4 border-muted2 border w-full rounded-lg h-12"
				>
					<p>{assignment.name}</p>
					<div className="flex flex-row items-center gap-3">
						{assignment.priority >= 7 && (
							<p className="font-semibold text-sm text-red-500">
								High Priority
							</p>
						)}
						{assignment.priority >= 4 && assignment.priority <= 6 && (
							<p className="font-semibold text-sm text-yellow-500">
								Medium Priority
							</p>
						)}
						{assignment.priority < 4 && (
							<p className="font-semibold text-sm text-green-500">
								Low Priority
							</p>
						)}
						{loadingId === assignment.id ? (
							<Loader size={18} className="animate-spin" />
						) : (
							<Trash
								color={"red"}
								size={18}
								className="cursor-pointer"
								onClick={() => deleteAssignment(assignment.id)}
							/>
						)}
					</div>
				</div>
			))}
		</div>
	);
}
