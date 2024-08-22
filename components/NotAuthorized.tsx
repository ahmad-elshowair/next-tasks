"use client";
import { usePathname } from "next/navigation";

const NotAuthorized = () => {
	const pathname = usePathname().split("/");

	return (
		<div className="flex rounded-lg bg-neutral-50 border border-green-400/75 shadow h-[calc(100vh-32px)] justify-center items-center">
			<h1 className="text-3xl font-bold text-green-900 uppercase text-center">
				You are Not Authorized to
				<span className="text-green-400"> {pathname}</span>
			</h1>
		</div>
	);
};

export default NotAuthorized;
