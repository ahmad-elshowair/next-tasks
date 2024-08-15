import type { Metadata } from "next";

import { inter } from "@/app/components/fonts";
import Sidebar from "@/app/components/Sidebar";
import "@/app/globals.css";

export const metadata: Metadata = {
	title: "Tasks",
	description: "Tasks app to manage tasks as in Dashboard",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} antialiased`}>
				<div className="flex sm:flex-col lg:flex-row md:overflow-hidden">
					<Sidebar />
					<main className="flex-grow md:overflow-y-auto">{children}</main>
				</div>
			</body>
		</html>
	);
}
