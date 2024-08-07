"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { generatePagination } from "../../lib/utils";
import PaginationArrow from "./PaginationArrow";
import PaginationNumber from "./PaginationNumber";

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
