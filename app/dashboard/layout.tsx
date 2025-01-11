export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<main className="flex flex-col justify-center px-4">{children}</main>
		</div>
	);
}
