"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiHome, BiSolidDashboard, BiTask } from "react-icons/bi";
import { FaUsers } from "react-icons/fa6";

const NavLinks = ({ role }: { role: "admin" | "user" | undefined }) => {
	const pathname = usePathname();

	const links = [
		{ href: "/", label: "Home", icon: BiHome },
		{ href: "/dashboard", label: "Dashboard", icon: BiSolidDashboard },

		{ href: "/my-tasks", label: "My Tasks", icon: BiTask },
		{ href: "/all-tasks", label: "All Tasks", icon: BiTask },
		{ href: "/users", label: "Users", icon: FaUsers },
	];

	const filteredLinks = links.filter((link) => {
		if (!role) {
			return link.href === "/";
		}
		if (role !== "admin" && link.href === "/users") {
			return false;
		}
		if (role !== "admin" && link.href === "/dashboard") {
			return false;
		}
		if (role !== "admin" && link.href === "/all-tasks") {
			return false;
		}
		return true;
	});

	return (
		<>
			{filteredLinks.map((link) => {
				const LintIcon = link.icon;
				return (
					<Link
						href={link.href}
						key={link.href}
						className={clsx(
							"flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 md:text-sm font-semibold md:flex-none md:justify-start md:p-2 md:px-3 shadow text-green-600 hover:bg-green-500 bg-emerald-100 hover:text-green-50 duration-200 ease-in-out",
							{
								"bg-green-500 text-orange-50": link.href === pathname,
							},
						)}>
						<LintIcon className="w-6 font-bold" />
						<p className="hidden lg:block">{link.label}</p>
					</Link>
				);
			})}
		</>
	);
};

export default NavLinks;
