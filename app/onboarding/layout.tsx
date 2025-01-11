export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="min-h-[calc(100dvh)] flex flex-row items-center justify-center px-4">
			{children}
		</main>
	);
}
