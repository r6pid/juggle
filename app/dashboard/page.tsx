import AssignmentsButton from "@/components/AssignmentsButton";
import CalculateButton from "@/components/CalculateButton";
import AssignmentsList from "@/components/AssignmentList";
import AvailabilityButton from "@/components/AvailabilityButton";
import AvailabilityList from "@/components/AvailabilityList";

export default function Dashboard() {
	return (
		<div className="flex flex-col mx-auto w-full">
			<div className="flex flex-col items-start w-full mt-20 gap-4">
				<AssignmentsButton variant="default">
					{" "}
					Add Assignments{" "}
				</AssignmentsButton>
				<AssignmentsList />
				<div className="ml-auto">
					<CalculateButton variant="destructive"> Calculate </CalculateButton>
				</div>
			</div>
			<div className="flex flex-col items-start w-full mt-20 gap-4 mb-20">
				<AvailabilityButton> Add Availability </AvailabilityButton>
				<AvailabilityList />
			</div>
		</div>
	);
}
