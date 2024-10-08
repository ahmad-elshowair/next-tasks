"use client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
	FaArrowRightToBracket,
	FaRightFromBracket,
	FaUserPlus,
} from "react-icons/fa6";
import { logout } from "../app/actions/auth";

const AuthLinks = ({
	isLoggedIn,
	image_url,
	user_name,
	user_id,
}: {
	isLoggedIn: boolean;
	user_name?: string;
	image_url?: string;
	user_id?: string;
}) => {
	const pathname = usePathname();
	const router = useRouter();
	const handleLogout = async () => {
		await logout();
		router.push("/login");
	};
	return (
		<>
			{isLoggedIn ? (
				<>
					<Link
						href={`/profile/${user_id}`}
						className={clsx(
							"flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-semibold lg:flex-none md:justify-start md:p-2 md:px-3 shadow hover:bg-green-500 text-green-600 bg-emerald-100 hover:text-green-50 duration-200 ease-in-out",
							{
								"bg-green-500 text-orange-50":
									pathname === `/profile/${user_name}`,
							},
						)}>
						<div>
							<div className="flex justify-center items-center gap-2 cursor-pointer">
								<Image
									src={image_url || "/default-avatar.png"}
									height={30}
									width={30}
									alt={`avatar`}
									className="rounded-full hidden md:inline"
								/>
								<span className="line-clamp-1">{user_name || "User Name"}</span>
							</div>
						</div>
					</Link>

					<button
						onClick={handleLogout}
						className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-semibold lg:flex-none md:justify-start md:p-2 md:px-3 shadow hover:bg-green-500 text-green-600 bg-emerald-100 hover:text-green-50 duration-200 ease-in-out">
						<FaRightFromBracket className="w-6" />
						<span className="sm:hidden lg:block">Sign out</span>
					</button>
				</>
			) : (
				<>
					<Link
						href={"/login"}
						className={clsx(
							"flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-semibold lg:flex-none lg:justify-start md:p-2 md:px-3 shadow hover:bg-green-500 text-green-600 bg-emerald-100 hover:text-green-50  duration-200 ease-in-out",
							{
								"bg-green-500 text-orange-50": pathname === "/login",
							},
						)}>
						<FaArrowRightToBracket className="w-6 font-bold" />
						<span className="sm:hidden lg:block">Login</span>
					</Link>
					<Link
						href={"/register"}
						className={clsx(
							"flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-semibold lg:flex-none md:justify-start md:p-2 md:px-3 shadow hover:bg-green-500 text-green-600 bg-emerald-100 hover:text-green-50 duration-200 ease-in-out",
							{
								"bg-green-500 text-orange-50": pathname === "/register",
							},
						)}>
						<FaUserPlus className="w-6 font-bold" />
						<span className="sm:hidden lg:block">Register</span>
					</Link>
				</>
			)}
		</>
	);
};

export default AuthLinks;
