import { auth } from "@/auth";
import AssignmentsList from "@/components/AssignmentList";
import AssignModel from "@/components/AssignModel";
import AvailabilityList from "@/components/AvailabilityList";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { Assignment } from "@/types/user";

export default async function Dashboard() {
	const session = await auth();
	const assignments = await db.assignment.findMany({
		where: { userId: session?.user?.id },
	});
	return (
		<div className="flex flex-col mx-auto w-full p-8">
			<div className="flex flex-col items-start w-full mt-20 gap-4">
				<AssignModel />
				<div className="p-4 bg-[#0000000a] rounded-sm w-full flex">
					<AssignmentsList assignments={assignments as Assignment[]} />
				</div>
				<Button variant="destructive">Calculate Schedule</Button>
			</div>
			<div className="flex flex-col items-start w-full mt-20 gap-4 mb-20">
				<Button>Add Availability</Button>
				<div className="p-4 bg-[#0000000a] rounded-sm w-full flex">
					<AvailabilityList />
				</div>
			</div>
		</div>
	);
}
