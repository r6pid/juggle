import { auth } from "@/auth";
import { db } from "@/db";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
	const session = await auth();
	if (!session || !session.user || !session.user.id) {
		return NextResponse.json(
			{
				message: "Unathorized",
			},
			{ status: 401 }
		);
	}
	const body = await request.json();
	const { id } = body;

	await db.timeframe.delete({
		where: { id: id },
	});

	return NextResponse.json(
		{
			message: "Success",
		},
		{ status: 201 }
	);
}
