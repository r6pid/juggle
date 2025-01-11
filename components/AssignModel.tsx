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
import { Slider } from "@/components/ui/slider";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { assignmentSchema } from "@/schemas/user";
import { useState } from "react";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AssignModel() {
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const form = useForm<z.infer<typeof assignmentSchema>>({
		resolver: zodResolver(assignmentSchema),
		defaultValues: {
			name: "",
			dueDate: new Date(),
			dueTime: new Date(),
			difficulty: 5,
			priority: 5,
		},
	});

	const onSubmit = async (values: z.infer<typeof assignmentSchema>) => {
		const combinedDateTime = new Date(
			values.dueDate.setHours(
				values.dueTime.getHours(),
				values.dueTime.getMinutes(),
				values.dueTime.getSeconds()
			)
		);

		const updatedValues = {
			...values,
			dueDate: combinedDateTime,
			dueTime: combinedDateTime,
		};
		setIsLoading(true);
		try {
			const response = await fetch(`/api/assignments/add/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: updatedValues.name,
					priority: updatedValues.priority,
					dueDate: updatedValues.dueDate,
					dueTime: updatedValues.dueTime,
					difficulty: updatedValues.difficulty,
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
			setIsLoading(false);
			setOpen(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>Add Assignment</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Assignment</DialogTitle>
					<DialogDescription>
						Make sure to fill in all the fields before saving.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 mt-2 w-full"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="Biology Video #2" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex flex-row gap-2 w-full">
							<FormField
								control={form.control}
								name="dueDate"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormControl>
											<DateInput
												label="Due Date"
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
								name="dueTime"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormControl>
											<TimeInput
												label="Due Time"
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
						<FormField
							control={form.control}
							name="difficulty"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Difficulty</FormLabel>
									<FormControl>
										<Slider
											defaultValue={[5]}
											max={10}
											min={1}
											step={1}
											onValueChange={(value) => field.onChange(value[0])}
										/>
									</FormControl>
									<div className="flex flex-row items-center justify-between mt-2">
										{Array.from({ length: 10 }, (_, i) => (
											<p key={i} className="w-5 text-center">
												{i + 1}
											</p>
										))}
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="priority"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Priority</FormLabel>
									<FormControl>
										<Slider
											defaultValue={[5]}
											max={10}
											min={1}
											step={1}
											onValueChange={(value) => field.onChange(value[0])}
										/>
									</FormControl>
									<div className="flex flex-row items-center justify-between mt-2">
										{Array.from({ length: 10 }, (_, i) => (
											<p key={i} className="w-5 text-center">
												{i + 1}
											</p>
										))}
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter className="w-full">
							<Button className="w-full mt-4" type="submit">
								{isLoading && <Loader className="mr-2 animate-spin" />}
								Save Assignment
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
