import { DatePicker } from "@nextui-org/date-picker";

export default function Home() {
	return (
		<div>
			<DatePicker
				className="max-w-[284px]"
				// hideTimeZone
				// showMonthAndYearPickers
				// defaultValue={now(getLocalTimeZone())}
				label="Birth date"
			/>
		</div>
	);
}
