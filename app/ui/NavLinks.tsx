"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiHome, BiSolidDashboard, BiTask } from "react-icons/bi";
import { FaUsers } from "react-icons/fa6";

const NavLinks = () => {
	const pathname = usePathname();
	const links = [
		{ href: "/", label: "Home", icon: BiHome },
		{ href: "/dashboard", label: "Dashboard", icon: BiSolidDashboard },

		{ href: "/tasks", label: "Tasks", icon: BiTask },
		{ href: "/users", label: "Users", icon: FaUsers },
	];
	return (
		<>
			{links.map((link) => {
				const LintIcon = link.icon;
				return (
					<Link
						href={link.href}
						key={link.href}
						className={clsx(
							"flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-semibold md:flex-none md:justify-start md:p-2 md:px-3 shadow text-green-600 hover:bg-green-500 bg-emerald-100 hover:text-green-50 duration-200 ease-in-out",
							{
								"bg-green-500 text-orange-50": link.href === pathname,
							},
						)}>
						<LintIcon className="w-6 font-bold" />
						<p className="hidden md:block">{link.label}</p>
					</Link>
				);
			})}
		</>
	);
};

export default NavLinks;
