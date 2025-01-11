"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GoogleAuthButton from "@/components/GoogleAuthButton";
import { Input } from "@/components/ui/input";

export default function SignupPage() {
	return (
		<div className="flex flex-col items-center justify-center mx-auto max-w-md w-full">
			<div className="flex flex-col items-start w-full">
				<p className="font-bold text-2xl">Welcome to Juggle!</p>
				<p className="text-muted1 text-sm mt-2">
					Please provide your details below to sign up
				</p>
			</div>
			<GoogleAuthButton variant="outline">Signup with Google</GoogleAuthButton>
			<p className="text-default w-full font-normal text-[13px] leading-[1.6154] tracking-[-0.003rem] relative -mx-6 text-center">
				<span className="absolute left-0 top-1/2 h-px w-full bg-[#0000001a]"></span>
				<span className="relative z-10 px-2 text-muted1 bg-background">
					or continue with
				</span>
			</p>
			<div className="flex flex-col items-start w-full my-8">
				<div className="w-full">
					<p className="mb-1 text-base font-medium">Email Address</p>
					<Input placeholder="Enter your email address" />
				</div>
				<div className="w-full mt-4">
					<p className="mb-1 text-base font-medium">Password</p>
					<Input placeholder="Enter your password" />
				</div>
			</div>
			<Button className="mb-4 w-full">Sign Up</Button>
			<div className="flex flex-row items-center w-full justify-between">
				<p className="text-sm font-medium text-muted2">
					Already have an account?{" "}
					<Link
						href="/login"
						className="text-accent hover:underline underline-offset-4 transition-all"
					>
						Login
					</Link>
				</p>
			</div>
		</div>
	);
}
