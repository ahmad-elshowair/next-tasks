"use client";
import TaskLogo from "@/app/components/TaskLogo";
import { GoSignOut } from "react-icons/go";
import NavLinks from "./NavLinks";

const Sidebar = () => {
	return (
		<aside className="flex h-full flex-col px-3 py-4 md:px-2">
			<section className="mb-2 flex h-20 items-end justify-start rounded-md bg-gradient-to-tr from-neutral-400 via-slate-400 to-stone-400 p-4 md:h-40">
				<div className="w-32 text-white md:w-40">
					<TaskLogo />
				</div>
			</section>
			<div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
				<NavLinks />
				<div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block shadow"></div>
				<form action="">
					<button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-semibold hover:bg-green-100 hover:text-neutral-600 md:flex-none md:justify-start md:p-2 md:px-3 shadow">
						<GoSignOut className="w-6" />
						<span className="hidden md:block">Sign out</span>
					</button>
				</form>
			</div>
		</aside>
	);
};

export default Sidebar;
