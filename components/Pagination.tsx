"use client";
import { generatePagination } from "@/lib/helpers";
import { clsx } from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

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

const Pagination = ({ totalPages }: { totalPages: number }) => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const currentPage = Number(searchParams.get("page")) || 1;
	const allPages = generatePagination(currentPage, totalPages);

	const createPageUrl = (pageNumber: number | string) => {
		const params = new URLSearchParams();
		params.set("page", pageNumber.toString());
		return `${pathname}?${params.toString()}`;
	};
	return (
		<div className="inline-flex">
			<PaginationArrow
				direction="left"
				href={createPageUrl(currentPage - 1)}
				isDisabled={currentPage <= 1}
			/>
			<div className="flex -space-x-px">
				{allPages.map((page, index) => {
					let position: "first" | "last" | "single" | "middle" | undefined;
					if (index === 0) position = "first";
					if (index === allPages.length - 1) position = "last";
					if (allPages.length === 1) position === "single";
					if (page === "...") position = "middle";

					return (
						<PaginationNumber
							key={page}
							href={createPageUrl(page)}
							page={page}
							position={position}
							isActive={currentPage === page}
						/>
					);
				})}
			</div>
			<PaginationArrow
				direction="right"
				href={createPageUrl(currentPage + 1)}
				isDisabled={currentPage >= totalPages}
			/>
		</div>
	);
};

export default Pagination;
