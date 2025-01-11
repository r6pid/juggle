import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import { Providers } from "@/components/Providers";

const inter = localFont({
	src: [
		{
			path: "./fonts/Inter-Thin.woff2",
			weight: "100",
			style: "normal",
		},
		{
			path: "./fonts/Inter-ExtraLight.woff2",
			weight: "200",
			style: "normal",
		},
		{
			path: "./fonts/Inter-Light.woff2",
			weight: "300",
			style: "normal",
		},
		{
			path: "./fonts/Inter-Regular.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "./fonts/Inter-Medium.woff2",
			weight: "500",
			style: "normal",
		},
		{
			path: "./fonts/Inter-SemiBold.woff2",
			weight: "600",
			style: "normal",
		},
		{
			path: "./fonts/Inter-Bold.woff2",
			weight: "700",
			style: "normal",
		},
		{
			path: "./fonts/Inter-ExtraBold.woff2",
			weight: "800",
			style: "normal",
		},
		{
			path: "./fonts/Inter-Black.woff2",
			weight: "900",
			style: "normal",
		},
	],
	variable: "--font-inter",
});

export const metadata: Metadata = {
	title: {
		template: "%s | Juggle",
		default: "Juggle",
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SessionProvider>
			<html lang="en" suppressHydrationWarning>
				<body className={`${inter.variable} font-sans antialiased`}>
					<Providers>
						<Navbar />
						{children}
						{/* <Toaster
							richColors
							theme="dark"
							closeButton={true}
							duration={4000}
						/> */}
					</Providers>
				</body>
			</html>
		</SessionProvider>
	);
}
