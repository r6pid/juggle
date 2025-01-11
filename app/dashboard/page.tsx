import { auth } from "@/auth";
import AssignmentsList from "@/components/AssignmentList";
import AssignModel from "@/components/AssignModel";
import AvailabilityList from "@/components/AvailabilityList";
import AvailabilityModel from "@/components/AvailabilityModel";
import CalculateButton from "@/components/CalculateButton";
import { db } from "@/db";
import { Assignment, Timeframe } from "@/types/user";

export default async function Dashboard() {
	const session = await auth();
	const assignments = await db.assignment.findMany({
		where: { userId: session?.user?.id },
	});
	const timeframes = await db.timeframe.findMany({
		where: { userId: session?.user?.id },
		include: {
			assignments: true,
		},
	});
	return (
		<div className="flex flex-col mx-auto w-full p-8">
			<div className="flex flex-col items-start w-full mt-20 gap-4">
				<AssignModel />
				<div className="p-4 bg-[#0000000a] rounded-sm w-full flex">
					<AssignmentsList assignments={assignments as Assignment[]} />
				</div>
				{assignments.length > 1 && (
					<CalculateButton variant="destructive">
						Calculate Schedule
					</CalculateButton>
				)}
			</div>
			{assignments.length > 2 && (
				<div className="flex flex-col items-start w-full mt-20 gap-4 mb-20">
					<AvailabilityModel />
					<div className="p-4 bg-[#0000000a] rounded-sm w-full flex">
						<AvailabilityList
							assignments={timeframes.flatMap(
								(timeframe) => timeframe.assignments
							)}
							timeframes={timeframes as Timeframe[]}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
