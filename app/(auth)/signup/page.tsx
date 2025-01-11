import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
	return (
		<form
			action={async () => {
				"use server";
				await signIn("google");
			}}
		>
			<Button type="submit">Sign Up with Google</Button>
		</form>
	);
}
