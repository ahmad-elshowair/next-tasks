"use client";

import TaskLogo from "@/app/components/TaskLogo";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
	const pathname = usePathname();
	const links = [
		{ href: "/", label: "Home" },
		{ href: "/tasks", label: "Tasks" },
	];

	return (
		<nav className=" flex items-center h-16 min-w-screen  bg-gradient-to-tr from-neutral-400 via-slate-400 to-stone-400">
			<section className="w-full px-4 md:px-8 lg:px-16">
				<section className="w-full flex items-center justify-between">
					<div className="flex gap-4">
						<div className="mr-8">
							<TaskLogo />
						</div>
						<ul className="flex gap-4 items-center">
							{links.map((link) => (
								<li
									key={link.href}
									className={`
									text-neutral-900 font-medium hover:border-b-2 border-green-800 duration-200 ease-in-out
										${pathname === link.href ? "text-white" : ""}
									`}>
									<Link href={link.href}>{link.label}</Link>
								</li>
							))}
						</ul>
					</div>
					<div className="flex gap-4 items-center">
						<Link
							href={"/login"}
							className="px-3 py-1 rounded-md bg-blue-400 text-white font-medium hover:bg-blue-700 duration-500 ease-in-out">
							Sign In
						</Link>
						<Link
							href={"/register"}
							className="px-3 py-1 rounded-md bg-green-400 text-neutral-500 hover:bg-green-700 hover:text-white duration-500 ease-in-out">
							Sign Up
						</Link>
					</div>
				</section>
			</section>
		</nav>
	);
};

export default Navbar;
