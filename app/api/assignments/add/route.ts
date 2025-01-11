import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";
// import { db } from "@/db";
import { auth } from "@/auth";
import { assignmentSchema } from "@/schemas/user";
import { db } from "@/db";

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
	const result = assignmentSchema.safeParse(body);
	if (!result.success) {
		return NextResponse.json(
			{
				error: "Invalid form",
			},
			{ status: 400 }
		);
	}
	const { name, dueDate, difficulty, priority } = result.data;
	await db.assignment.create({
		data: {
			userId: session.user.id,
			name: name,
			due: dueDate,
			difficulty: difficulty,
			priority: priority,
		},
	});
	return NextResponse.json(
		{
			message: "Success",
		},
		{ status: 201 }
	);
}
