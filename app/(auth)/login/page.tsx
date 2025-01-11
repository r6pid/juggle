"use client"

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
	return (
		<div className="flex justify-center items-start min-h-screen">
			<div className="pt-4">
				<h1>
					Welcome Back
				</h1>
				<h2>
					Provide your details to login to juggle
				</h2>
				<Button onClick={() => signIn("google")}>Login with Google</Button>
			</div>
		</div>
	);
}
