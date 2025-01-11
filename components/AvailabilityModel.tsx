"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogDescription,
} from "@/components/ui/dialog";
import { DateInput } from "@nextui-org/react";
import { TimeInput } from "@nextui-org/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { availabilitySchema } from "@/schemas/user";
import { useState } from "react";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AvailabilityModel() {
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const form = useForm<z.infer<typeof availabilitySchema>>({
		resolver: zodResolver(availabilitySchema),
		defaultValues: {
			startDate: new Date(),
			startTime: new Date(),
			endDate: new Date(),
			endTime: new Date(),
		},
	});

	const onSubmit = async (values: z.infer<typeof availabilitySchema>) => {
		const combinedStartDateTime = new Date(
			values.startDate.setHours(
				values.startTime.getHours(),
				values.startTime.getMinutes(),
				values.startTime.getSeconds()
			)
		);
		const combinedEndDateTime = new Date(
			values.endDate.setHours(
				values.endTime.getHours(),
				values.endTime.getMinutes(),
				values.endTime.getSeconds()
			)
		);

		const updatedValues = {
			...values,
			startDate: combinedStartDateTime,
			endDate: combinedEndDateTime,
		};
		setIsLoading(true);
		try {
			const response = await fetch(`/api/availability/add/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					startDate: updatedValues.startDate,
					startTime: updatedValues.startTime,
					endDate: updatedValues.endDate,
					endTime: updatedValues.endTime,
				}),
			});
			const responseData = await response.json();
			if (!response.ok) {
				toast.error(responseData.error);
			} else {
				toast.success("Added Time-Frame");
			}
		} catch (error) {
			toast.error("Something went wrong");
			console.error(error);
		} finally {
			router.refresh();
			setIsLoading(false);
			setOpen(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>Add Time-Frame</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Time-Frame</DialogTitle>
					<DialogDescription>
						Make sure to fill in all the fields before saving.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 mt-2 w-full"
					>
						<div className="flex flex-row gap-2 w-full">
							<FormField
								control={form.control}
								name="startDate"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormControl>
											<DateInput
												label="Start Date"
												labelPlacement="outside"
												onChange={(newDate) => {
													// Create a Date object
													const dateObject = new Date(
														newDate?.year ?? 1970,
														(newDate?.month ?? 1) - 1,
														newDate?.day ?? 1
													); // month is zero-based
													field.onChange(dateObject);
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="startTime"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormControl>
											<TimeInput
												label="Start Time"
												labelPlacement="outside"
												onChange={(newTime) => {
													const timeObject = new Date(
														1970,
														0,
														1,
														newTime?.hour ?? 0,
														newTime?.minute ?? 0,
														newTime?.second ?? 0,
														newTime?.millisecond ?? 0
													);
													field.onChange(timeObject);
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="flex flex-row gap-2 w-full">
							<FormField
								control={form.control}
								name="endDate"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormControl>
											<DateInput
												label="End Date"
												labelPlacement="outside"
												onChange={(newDate) => {
													// Create a Date object
													const dateObject = new Date(
														newDate?.year ?? 1970,
														(newDate?.month ?? 1) - 1,
														newDate?.day ?? 1
													); // month is zero-based
													field.onChange(dateObject);
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="endTime"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormControl>
											<TimeInput
												label="End Time"
												labelPlacement="outside"
												onChange={(newTime) => {
													const timeObject = new Date(
														1970,
														0,
														1,
														newTime?.hour ?? 0,
														newTime?.minute ?? 0,
														newTime?.second ?? 0,
														newTime?.millisecond ?? 0
													);
													field.onChange(timeObject);
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<DialogFooter className="w-full">
							<Button className="w-full mt-4" type="submit">
								{isLoading && <Loader className="mr-2 animate-spin" />}
								Save Availability Time-Frame
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
