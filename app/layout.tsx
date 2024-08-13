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
					<div className="sm:w-full sm:h-fit lg:h-screen  flex-none lg:w-64">
						<Sidebar />
					</div>
					<main className="flex-grow p-6 md:overflow-y-auto md:p-12">
						{children}
					</main>
				</div>
			</body>
		</html>
	);
}
