import React from "react";
import Sidebar from "../components/Sidebar";

export default function layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
			<div className="w-full flex-none md:w-64">
				<Sidebar />
			</div>
			<main className="flex-grow p-6 md:overflow-y-auto md:p-12">
				{children}
			</main>
		</div>
	);
}
