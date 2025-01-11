"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import GoogleAuthButton from "@/components/GoogleAuthButton";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
	return (
		<div className="flex flex-col items-center justify-center mx-auto max-w-md w-full">
			<div className="flex flex-col items-start w-full">
				<p className="font-bold text-2xl">Welcome Back!</p>
				<p className="text-muted1 text-sm mt-2">
					Please provide your details below to login
				</p>
			</div>
			<GoogleAuthButton variant="outline">Login with Google</GoogleAuthButton>
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
			<Button className="mb-4 w-full">Login</Button>
			<div className="flex flex-row items-center w-full justify-between">
				<p className="text-sm font-medium text-muted2">
					Don&apos;t have an account?{" "}
					<Link
						href="/signup"
						className="text-accent hover:underline underline-offset-4 transition-all"
					>
						Sign Up
					</Link>
				</p>
				<Link
					href="/forgot"
					className="text-sm font-medium text-muted2 transition-colors hover:text-black"
				>
					Forgot Password
				</Link>
			</div>
		</div>
	);
}
