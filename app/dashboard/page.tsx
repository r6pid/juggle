import { auth } from "@/auth";
import AssignmentsList from "@/components/AssignmentList";
import AssignModel from "@/components/AssignModel";
import AvailabilityList from "@/components/AvailabilityList";
import AvailabilityModel from "@/components/AvailabilityModel";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { Assignment, Timeframe } from "@/types/user";

export default async function Dashboard() {
	const session = await auth();
	const assignments = await db.assignment.findMany({
		where: { userId: session?.user?.id },
	});
	const timeframes = await db.timeframe.findMany({
		where: { userId: session?.user?.id },
	});
	return (
		<div className="flex flex-col mx-auto w-full p-8">
			<div className="flex flex-col items-start w-full mt-20 gap-4">
				<AssignModel />
				<div className="p-4 bg-[#0000000a] rounded-sm w-full flex">
					<AssignmentsList assignments={assignments as Assignment[]} />
				</div>
				{assignments.length > 2 && (
					<Button variant="destructive">Calculate Schedule</Button>
				)}
			</div>
			{assignments.length > 2 && (
				<div className="flex flex-col items-start w-full mt-20 gap-4 mb-20">
					<AvailabilityModel />
					<div className="p-4 bg-[#0000000a] rounded-sm w-full flex">
						<AvailabilityList timeframes={timeframes as Timeframe[]} />
					</div>
				</div>
			)}
		</div>
	);
}
