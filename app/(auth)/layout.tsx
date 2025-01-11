export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<main className="px-4 flex flex-col justify-center mt-40">
				{children}
			</main>
		</div>
	);
}
