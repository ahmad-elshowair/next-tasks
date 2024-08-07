import { roboto_mono } from "@/app/ui/fonts";
import clsx from "clsx";
import Link from "next/link";

type Breadcrumb = {
	label: string;
	href: string;
	active?: boolean;
};

const Breadcrumb = ({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) => {
	return (
		<nav aria-label="Breadcrumb" className="mb-6 block">
			<ol className={clsx(roboto_mono.className, "flex text--xl md:text-2xl")}>
				{breadcrumbs.map((breadcrumb, index) => (
					<li
						className={clsx(
							breadcrumb.active ? "text-green-900" : "text-green-500",
						)}
						key={breadcrumb.href}
						aria-current={breadcrumb.active}>
						<Link href={breadcrumb.href}>{breadcrumb.label}</Link>
						{index < breadcrumbs.length - 1 ? (
							<span className="mx-3 inline-block">/</span>
						) : null}
					</li>
				))}
			</ol>
		</nav>
	);
};

export default Breadcrumb;
