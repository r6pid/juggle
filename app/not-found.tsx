import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center">
			<p>404, Not Found</p>
			<Button className="mt-4 w-full" asChild>
				<Link href="/">Go Home</Link>
			</Button>
		</div>
	);
}
