import Link from "next/link";
import { Button } from "./ui/button";
import { auth } from "@/auth";
import Image from "next/image";
import { LogoutButton } from "./LogoutButton";

export default async function Navbar() {
	const session = await auth();
	return (
		<nav className="fixed w-full bg-zinc-50 top-0 z-50 grid h-14 grid-cols-[1fr_auto] items-center gap-4 border-b-border border-b px-4">
			<div>
				<Link
					className="flex w-fit flex-row items-center justify-center gap-3"
					href="/"
				>
					<Image src={"/logo.png"} alt="Logo" width={40} height={40} />
					<p className="text-lg">Juggle</p>
				</Link>
			</div>

			<div className="grid grid-flow-col items-center gap-2">
				<div className="grid grid-flow-col items-center gap-2 ">
					{!session?.user ? (
						<div className="flex items-center w-full justify-center flex-row gap-2">
							<Button className="w-full" asChild>
								<Link href="/signup">Sign Up</Link>
							</Button>
							<Button className="w-full" asChild>
								<Link href="/login">Login</Link>
							</Button>
						</div>
					) : (
						<>
							<Button className="w-full" asChild>
								<Link href="/dashboard">Dashboard</Link>
							</Button>
							<LogoutButton />
						</>
					)}
				</div>
			</div>
		</nav>
	);
}