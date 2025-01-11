import { z } from "zod";

export const assignmentSchema = z.object({
	name: z.string().min(2, "Name is too short").max(24, "Name is too long"),
	dueDate: z.coerce.date(),
	dueTime: z.coerce.date(),
	difficulty: z.number().min(0).max(10),
	priority: z.number().min(0).max(10),
});
