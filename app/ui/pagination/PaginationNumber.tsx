import clsx from "clsx";
import Link from "next/link";

const PaginationNumber = ({
	page,
	href,
	isActive,
	position,
}: {
	page: number | string;
	href: string;
	isActive: boolean;
	position?: "first" | "last" | "middle" | "single";
}) => {
	const className = clsx(
		"flex h-10 w-10 items-center justify-center text-sm border",
		{
			"rounded-l-md": position === "first" || position === "single",
			"rounded-r-md": position === "last" || position === "single",
			"z-10 bg-emerald-600 border-emerald-600 text-emerald-50": isActive,
			"hover:bg-green-100": !isActive && position !== "middle",
			"text-green-300": position === "middle",
		},
	);
	return isActive || position === "middle" ? (
		<div className={className}>{page}</div>
	) : (
		<Link href={href} className={className}>
			{page}
		</Link>
	);
};

export default PaginationNumber;
