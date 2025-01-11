"use client";
import { FcGoogle } from "react-icons/fc";
import { Button } from "./ui/button";
import React from "react";
import { signIn } from "next-auth/react";

export default function GoogleAuthButton({
	children,
	variant,
}: {
	children: React.ReactNode;
	variant?:
		| "default"
		| "destructive"
		| "outline"
		| "secondary"
		| null
		| undefined;
}) {
	return (
		<Button
			variant={variant}
			className="my-8 w-full"
			onClick={() => signIn("google")}
		>
			<FcGoogle className="mr-1" size={30} />
			{children}
		</Button>
	);
}
