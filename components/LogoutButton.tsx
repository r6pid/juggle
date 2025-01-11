"use client";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

export function LogoutButton({ classes }: { classes?: string }) {
	return (
		<Button
			className={cn("", classes)}
			variant="destructive"
			onClick={() => {
				signOut({ redirectTo: "/login" });
			}}
		>
			Logout
		</Button>
	);
}
