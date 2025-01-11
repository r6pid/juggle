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
import { DateInput } from "@nextui-org/react";
import { CalendarDate } from "@internationalized/date";
import { TimeInput } from "@nextui-org/react";
import { Time } from "@internationalized/date";
import { Slider } from "@/components/ui/slider";

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
				<div className="space-y-4 mt-2 w-full">
					<div>
						<p className="mb-1">Name</p>
						<Input placeholder="Biology Homework" />
					</div>
					<div>
						<p className="mb-1">Due Date</p>
						<div className="flex flex-row gap-2">
							<DateInput
								className="max-w-sm"
								placeholderValue={new CalendarDate(1995, 11, 6)}
								label={null}
							/>
							<TimeInput defaultValue={new Time(11, 45)} label={null} />
						</div>
					</div>
					<div>
						<p className="mb-1">Difficulty</p>
						<Slider defaultValue={[5]} max={10} min={1} step={1} />
						<div className="flex flex-row items-center justify-between mt-2">
							{Array.from({ length: 10 }, (_, i) => (
								<p key={i} className="w-5 text-center">
									{i + 1}
								</p>
							))}
						</div>
					</div>
					<div>
						<p className="mb-1">Priority</p>
						<Slider defaultValue={[5]} max={10} min={1} step={1} />
						<div className="flex flex-row items-center justify-between mt-2">
							{Array.from({ length: 10 }, (_, i) => (
								<p key={i} className="w-5 text-center">
									{i + 1}
								</p>
							))}
						</div>
					</div>
				</div>
				<DialogFooter>
					<Button type="submit">Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
