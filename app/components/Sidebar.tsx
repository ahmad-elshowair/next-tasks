"use client";
import TaskLogo from "@/app/components/TaskLogo";
import Link from "next/link";
import {
	FaArrowRightToBracket,
	FaRightFromBracket,
	FaUserPlus,
} from "react-icons/fa6";
import NavLinks from "./NavLinks";

const Sidebar = () => {
	const session = { logged: false };
	return (
		<aside className="flex h-full flex-col px-3 py-4 md:px-2 sticky top-0">
			<section className="mb-2 flex sm:h-20 items-end justify-start rounded-md bg-gradient-to-tr from-neutral-400 via-slate-400 to-stone-400 p-4 lg:h-40">
				<TaskLogo />
			</section>
			<div className="flex grow sm:flex-row justify-between sm:space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2">
				<NavLinks />
				<div className="sm:hidden h-auto w-full grow rounded-md bg-emerald-100 lg:block shadow"></div>
				{!session.logged ? (
					<>
						<Link
							href={"/login"}
							className="sm:flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-semibold lg:flex-none lg:justify-start md:p-2 md:px-3 shadow hover:bg-green-500 text-green-600 bg-emerald-100 hover:text-green-50  duration-200 ease-in-out">
							<FaArrowRightToBracket className="w-6 font-bold" />
							<span className="sm:hidden lg:block">Login</span>
						</Link>
						<Link
							href={"/register"}
							className="sm:flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-semibold lg:flex-none md:justify-start md:p-2 md:px-3 shadow hover:bg-green-500 text-green-600 bg-emerald-100 hover:text-green-50 duration-200 ease-in-out">
							<FaUserPlus className="w-6 font-bold" />
							<span className="sm:hidden lg:block">Register</span>
						</Link>
					</>
				) : (
					<form action="">
						<button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-semibold md:flex-none md:justify-start md:p-2 md:px-3 shadow hover:bg-green-500 text-green-600 bg-emerald-100 hover:text-green-50 duration-200 ease-in-out">
							<FaRightFromBracket className="w-6" />
							<span className="sm:hidden lg:block">Sign out</span>
						</button>
					</form>
				)}
			</div>
		</aside>
	);
};

export default Sidebar;
