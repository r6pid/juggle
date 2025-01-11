import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db"; // assuming you have a db helper
import { auth } from "@/auth"; // assuming you have an auth helper

import { Assignment } from "@prisma/client"; // Import the Assignment model from your existing Prisma setup
import { Timeframe } from "@prisma/client"; // Import the Timeframe model

// Define a function to sort assignments
const sortAssignments = (assignments: Assignment[]) => {
	return assignments.sort(
		(a, b) =>
			new Date(a.due).getTime() - new Date(b.due).getTime() ||
			b.priority - a.priority ||
			b.difficulty - a.difficulty
	);
};

// Create the optimal schedule with multiple assignments per time frame, including breaks and splitting assignments
export const createSchedule = (
	timeframes: Timeframe[],
	assignments: Assignment[]
) => {
	const sortedAssignments = sortAssignments(assignments);

	const schedule: {
		timeSlot: [Date, Date];
		allocations: { name: string; time: number }[];
	}[] = [];

	for (const timeframe of timeframes) {
		let remainingTime =
			(new Date(timeframe.endDate).getTime() -
				new Date(timeframe.startDate).getTime()) /
			60000;
		const allocations: { name: string; time: number }[] = [];

		for (const assignment of sortedAssignments) {
			if (remainingTime <= 0) break;

			const totalTime =
				30 + assignment.priority * 10 + assignment.difficulty * 8; // Calculate total time
			const timeSpent = Math.min(
				totalTime - (assignment.allocatedTime || 0),
				remainingTime
			);

			if (timeSpent > 0) {
				allocations.push({ name: assignment.name, time: timeSpent });
				assignment.allocatedTime = (assignment.allocatedTime || 0) + timeSpent;
				remainingTime -= timeSpent;

				if (remainingTime >= 5 && totalTime > assignment.allocatedTime) {
					remainingTime -= 5; // Deduct 5 minutes for a break
				}
			}
		}

		if (allocations.length > 0) {
			schedule.push({
				timeSlot: [new Date(timeframe.startDate), new Date(timeframe.endDate)],
				allocations,
			});
		}
	}

	return schedule;
};

export async function POST(request: NextRequest) {
	const session = await auth();
	if (!session || !session.user.id) {
		return NextResponse.json(
			{
				error: "Unauthorized",
			},
			{ status: 401 }
		);
	}

	const body = await request.json();
	const { keep } = body;

	// Fetch timeframes
	const timeframes = await db.timeframe.findMany({
		where: { userId: session.user.id },
		select: {
			userId: true,
			id: true,
			startDate: true,
			endDate: true,
		},
	});

	// Fetch assignments
	const assignments = await db.assignment.findMany({
		where: { userId: session.user.id },
		select: {
			id: true,
			name: true,
			userId: true,
			timeframeId: true,
			allocatedTime: true,
			priority: true,
			difficulty: true,
			due: true,
		},
	});

	// Generate the schedule
	const schedule = await createSchedule(timeframes, assignments);

	console.log(JSON.stringify(schedule));

	return NextResponse.json(
		{
			message: "Success",
			schedule,
		},
		{ status: 201 }
	);
}
