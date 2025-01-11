import { z } from "zod";

export const assignmentSchema = z
	.object({
		name: z.string().min(2, "Name is too short").max(24, "Name is too long"),
		dueDate: z.coerce.date(),
		dueTime: z.coerce.date(),
		difficulty: z.number().min(0).max(10),
		priority: z.number().min(0).max(10),
	})
	.refine((data) => data.dueDate >= new Date(new Date().toDateString()), {
		message: "Due date must not be in the past.",
		path: ["dueDate"],
	})
	.refine(
		(data) => {
			const now = new Date();
			const isToday = data.dueDate.toDateString() === now.toDateString();
			if (isToday) {
				return data.dueTime >= now;
			}
			return true;
		},
		{
			message: "Due time must not be in the past if due date is today.",
			path: ["dueTime"],
		}
	);

export const availabilitySchema = z
	.object({
		startDate: z.coerce.date(),
		startTime: z.coerce.date(),
		endDate: z.coerce.date(),
		endTime: z.coerce.date(),
	})
	.refine((data) => data.startDate <= data.endDate, {
		message: "End date must be after or on the same day as the start date.",
		path: ["endDate"],
	})
	.refine(
		(data) => {
			if (data.startDate.getTime() === data.endDate.getTime()) {
				return data.startTime <= data.endTime;
			}
			return true;
		},
		{
			message: "End time must be after start time if the dates are the same.",
			path: ["endTime"],
		}
	);
