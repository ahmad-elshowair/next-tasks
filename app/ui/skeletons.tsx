// Loading animation
const shimmer =
	"before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export const TaskMobileSkeleton = () => {
	return (
		<div className="mb-2 w-full rounded-md bg-white p-4">
			<div className="flex items-center justify-between border-b border-emerald-100 pb-8">
				<div className="flex items-center">
					<div className="mr-2 h-8 w-8 rounded-full bg-emerald-100"></div>
					<div className="h-6 w-16 rounded bg-emerald-100"></div>
				</div>
				<div className="h-6 w-16 rounded bg-emerald-100"></div>
			</div>
			<div className="flex w-full items-center justify-between pt-4">
				<div>
					<div className="h-6 w-16 rounded bg-emerald-100"></div>
					<div className="mt-2 h-6 w-24 rounded bg-emerald-100"></div>
				</div>
				<div className="flex justify-end gap-2">
					<div className="h-10 w-10 rounded bg-emerald-100"></div>
					<div className="h-10 w-10 rounded bg-emerald-100"></div>
				</div>
			</div>
		</div>
	);
};

export const TableRowSkeleton = () => {
	return (
		<tr className="w-full border-b border-emerald-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
			<td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
				<div className="flex items-center gap-3">
					<div className="h-8 w-8 rounded-full bg-emerald-100"></div>
					<div className="h-6 w-24 rounded bg-emerald-100"></div>
				</div>
			</td>
			<td className="whitespace-nowrap px-3 py-3">
				<div className="h-6 w-16 rounded bg-emerald-100"></div>
			</td>
			<td className="whitespace-nowrap px-3 py-3">
				<div className="h-6 w-16 rounded bg-emerald-100"></div>
			</td>
			<td className="whitespace-nowrap px-3 py-3">
				<div className="h-6 w-16 rounded bg-emerald-100"></div>
			</td>
			<td className="whitespace-nowrap px-3 py-3">
				<div className="h-6 w-16 rounded bg-emerald-100"></div>
			</td>
			<td className="whitespace-nowrap pl-6 pr-3 py-3">
				<div className="flex justify-end gap-3">
					<div className="h-[38px] w-[38px] rounded bg-emerald-100"></div>
					<div className="h-[38px] w-[38px] rounded bg-emerald-100"></div>
				</div>
			</td>
		</tr>
	);
};

export const TasksTableSkeleton = () => {
	return (
		<div className={`${shimmer} mt-6 flow-root `}>
			<div className="inline-block min-w-full align-middle">
				<div className="rounded-lg bg-emerald-50 p-2 md:pt-0">
					<div className="md:hidden">
						<TaskMobileSkeleton />
						<TaskMobileSkeleton />
						<TaskMobileSkeleton />
						<TaskMobileSkeleton />
						<TaskMobileSkeleton />
						<TaskMobileSkeleton />
					</div>
					<table>
						<thead>
							<tr>
								<th scope="col" className="px-4 py-5 font-medium sm:pl-6">
									Customer
								</th>
								<th scope="col" className="px-3 py-5 font-medium">
									Email
								</th>
								<th scope="col" className="px-3 py-5 font-medium">
									Amount
								</th>
								<th scope="col" className="px-3 py-5 font-medium">
									Date
								</th>
								<th scope="col" className="px-3 py-5 font-medium">
									Status
								</th>
								<th
									scope="col"
									className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6">
									<span className="sr-only">Edit</span>
								</th>
							</tr>
						</thead>
						<tbody className="bg-white">
							<TableRowSkeleton />
							<TableRowSkeleton />
							<TableRowSkeleton />
							<TableRowSkeleton />
							<TableRowSkeleton />
							<TableRowSkeleton />
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};
