import clsx from "clsx";
import Link from "next/link";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

const PaginationArrow = ({
	href,
	direction,
	isDisabled,
}: {
	href: string;
	direction: "left" | "right";
	isDisabled: boolean;
}) => {
	const className = clsx(
		"flex h-10 w-10 items-center justify-center rounded-md border",
		{
			"pointer-event-none text-emerald-300": isDisabled,
			"hover:bg-emerald-100": !isDisabled,
			"mr-2 md:mr-4": direction === "left",
			"ml-2 md:ml-4": direction === "right",
		},
	);

	const icon =
		direction === "left" ? (
			<FaAngleDoubleLeft className="w-4" />
		) : (
			<FaAngleDoubleRight className="w-4" />
		);
	return isDisabled ? (
		<div className={className}>{icon}</div>
	) : (
		<Link href={href} className={className}>
			{icon}
		</Link>
	);
};
export default PaginationArrow;
