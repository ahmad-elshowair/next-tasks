"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiHome } from "react-icons/bi";
import { GoTasklist } from "react-icons/go";

const NavLinks = () => {
	const pathname = usePathname();
	const links = [
		{ href: "/", label: "Home", icon: BiHome },
		{ href: "/tasks", label: "Dos", icon: GoTasklist },
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
							"flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-semibold hover:bg-green-100 hover:text-neutral-600 md:flex-none md:justify-start md:p-2 md:px-3 shadow",
							{
								"bg-gradient-to-tr from-neutral-400 via-slate-400 to-stone-400":
									pathname === link.href,
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
