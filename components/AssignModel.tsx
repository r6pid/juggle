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
import { Input } from "./ui/input";
import { DatePicker } from "@nextui-org/react";
import { now, getLocalTimeZone } from "@internationalized/date";

export default function AssignModel() {
	return (
		<Dialog>
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
				<div className="space-y-3 mt-2 w-full">
					<div>
						<p className="mb-1">Name</p>
						<Input placeholder="Biology Homework" />
					</div>
					<div>
						<p className="mb-1">Due Date</p>
						<DatePicker
							hideTimeZone
							showMonthAndYearPickers
							defaultValue={now(getLocalTimeZone())}
							label="Event Date"
							variant="bordered"
							inert={true}
						/>
					</div>
				</div>
				<DialogFooter>
					<Button type="submit">Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
