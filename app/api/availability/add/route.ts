import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";
// import { db } from "@/db";
import { auth } from "@/auth";
import { availabilitySchema } from "@/schemas/user";
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
	const result = availabilitySchema.safeParse(body);
	if (!result.success) {
		return NextResponse.json(
			{
				error: "Invalid form",
			},
			{ status: 400 }
		);
	}
	const { startDate, endDate } = result.data;
	await db.user.update({
		where: { id: session.user.id },
		data: {
			timeframes: {
				create: {
					startDate: startDate,
					endDate: endDate,
				},
			},
		},
	});
	return NextResponse.json(
		{
			message: "Success",
		},
		{ status: 201 }
	);
}
