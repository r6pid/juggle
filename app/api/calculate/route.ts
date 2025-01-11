import { NextResponse } from "next/server";
import { db } from "@/db"; // assuming you have a db helper
import { auth } from "@/auth"; // assuming you have an auth helper

export async function POST() {
	const session = await auth();
	if (!session || !session.user.id) {
		return NextResponse.json(
			{
				error: "Unauthorized",
			},
			{ status: 401 }
		);
	}
	// Fetch timeframes
	const [timeframes, assignments] = await Promise.all([
		db.timeframe.findMany({
			where: { userId: session.user.id },
			select: { id: true, startDate: true, endDate: true },
		}),
		db.assignment.findMany({
			where: { userId: session.user.id },
			select: {
				id: true,
				name: true,
				priority: true,
				difficulty: true,
				due: true,
			},
		}),
	]);

	const schedule = await Promise.all(
		timeframes.map(async (timeframe) => {
			let accumulatedTime = 0;
			const currentDate = new Date();
			const assignmentsInTimeframe = assignments
				.filter(
					({ due }) =>
						new Date(due) >= new Date(timeframe.startDate) &&
						new Date(due) <= new Date(timeframe.endDate)
				)
				.sort((a, b) => {
					const aDueDate = new Date(a.due);
					const bDueDate = new Date(b.due);
					const aPriority =
						(a.difficulty + a.priority) /
						(2 * (aDueDate.getTime() - currentDate.getTime()));
					const bPriority =
						(b.difficulty + b.priority) /
						(2 * (bDueDate.getTime() - currentDate.getTime()));
					return bPriority - aPriority; // Higher priority first
				})
				.map((assignment) => {
					const estimatedTime = assignment.difficulty * 2 + assignment.priority;
					const adjustedTime = estimatedTime * (1 + accumulatedTime / 100);
					accumulatedTime += adjustedTime;
					return { ...assignment, allocation: adjustedTime };
				});

			await Promise.all(
				assignmentsInTimeframe.map(({ id, allocation }) =>
					db.assignment.update({
						where: { id },
						data: {
							timeframeId: timeframe.id,
							allocation: Math.round(allocation),
						},
					})
				)
			);

			return { ...timeframe, assignments: assignmentsInTimeframe };
		})
	);

	console.log(JSON.stringify(schedule));

	return NextResponse.json(
		{
			message: "Success",
			schedule,
		},
		{ status: 201 }
	);
}
