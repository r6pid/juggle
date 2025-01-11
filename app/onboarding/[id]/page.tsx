"use client";
import NotFound from "@/app/not-found";
import { Button } from "@/components/ui/button";
import { Field, Radio, RadioGroup } from "@headlessui/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const onboardingQuestions = [
	{
		id: 1,
		question: "I usually complete my work or assignments on time",
	},
	{
		id: 2,
		question: "I wait until the last moment to complete my assignments",
	},
	{
		id: 3,
		question: "To help complete my work I plan breaks often.",
	},
	{
		id: 4,
		question: "I have a lot of late or missing assignments",
	},
	{
		id: 5,
		question: "I can stay focused for hours at a time",
	},
];

const levels = [
	{ id: 1, color: "#ff8787" },
	{ id: 2, color: "#ffc9c9" },
	{ id: 3, color: "#fff5f5" },
	{ id: 4, color: "#fff" },
	{ id: 5, color: "#ebfbee" },
	{ id: 6, color: "#b2f2bb" },
	{ id: 7, color: "#69db7c" },
];

export default function OnboardingPage() {
	const [selected, setSelected] = useState(levels[3]);
	const router = useRouter();
	const params = useParams();
	const currentId = parseInt(params.id as string, 10);

	if (!onboardingQuestions.some((question) => question.id === currentId)) {
		return <NotFound />;
	}

	function handleContinueClick() {
		if (currentId < 5) {
			return router.push(`/onboarding/${currentId + 1}`);
		} else {
			return router.push(`/dashboard`);
		}
	}
	return (
		<div className="flex flex-row gap-10 md:gap-20 h-[24rem] items-start justify-center">
			<div className="flex flex-col items-center justify-center">
				{onboardingQuestions.map((question) => (
					<div
						key={question.id}
						className="flex flex-col justify-center items-center"
					>
						<Link
							href={`/onboarding/${question.id}`}
							className={`w-12 h-12 flex items-center border-2 border-black justify-center rounded-full ${
								question.id === currentId ? "bg-accent2" : "bg-accent3"
							}`}
						>
							{question.id}
						</Link>
						{question.id !== onboardingQuestions.length && (
							<div className="h-9 w-0.5 bg-black mx-2"></div>
						)}
					</div>
				))}
			</div>
			<div className="flex flex-col min-h-full relative items-start justify-between max-w-[26rem] w-full">
				<div className="">
					<p className="text-4xl">Question #{currentId}</p>
					<p className="text-muted1 mt-2 text-base">
						Please answer these questions to the best of your abilities
					</p>
				</div>
				<p className="font-semibold text-xl mb-2 w-full break-words">
					{onboardingQuestions[currentId - 1].question}
				</p>
				<div className="w-full">
					<RadioGroup
						value={selected}
						onChange={setSelected}
						aria-label="Server size"
						className="flex flex-row items-center justify-between"
					>
						{levels.map((level) => (
							<Field key={level.id} className="flex items-center gap-2">
								<Radio
									value={level}
									style={{ backgroundColor: level.color }}
									className={`group flex h-10 w-10 items-center justify-center rounded-full border-[1px] data-[checked]:border-2 cursor-pointer opacity-30 border-black data-[checked]:opacity-100`}
								></Radio>
							</Field>
						))}
					</RadioGroup>
					<div className="flex flex-row items-center justify-between mt-2 w-full">
						<p className="text-red-500">Disagree</p>
						<p className="text-green-500">Agree</p>
					</div>
				</div>
				<Button className="w-full" onClick={() => handleContinueClick()}>
					{currentId !== onboardingQuestions.length
						? "Next Question"
						: "Finish Onboarding"}
				</Button>
			</div>
		</div>
	);
}
