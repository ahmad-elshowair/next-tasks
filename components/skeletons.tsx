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
		<tr className="min-w-full border-b border-emerald-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
			<td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
				<div className="flex items-center gap-3">
					<div className="h-8 w-8 rounded-full bg-emerald-100" />
					<div className="h-6 w-24 rounded bg-emerald-100" />
				</div>
			</td>
			<td className="whitespace-nowrap px-3 py-3">
				<div className="h-6 w-16 rounded bg-emerald-100" />
			</td>
			<td className="whitespace-nowrap px-3 py-3">
				<div className="h-6 w-16 rounded bg-emerald-100" />
			</td>
			<td className="whitespace-nowrap px-3 py-3">
				<div className="h-6 w-16 rounded bg-emerald-100" />
			</td>
			<td className="whitespace-nowrap px-3 py-3">
				<div className="h-6 w-16 rounded bg-emerald-100" />
			</td>
			<td className="whitespace-nowrap pl-6 pr-3 py-3">
				<div className="flex justify-end gap-3">
					<div className="h-[38px] w-[38px] rounded bg-emerald-100" />
					<div className="h-[38px] w-[38px] rounded bg-emerald-100" />
				</div>
			</td>
		</tr>
	);
};

export const TasksTableSkeleton = () => {
	return (
		<div className={`${shimmer} mt-6 flow-root`}>
			<div className="block min-w-full align-middle">
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
									User
								</th>
								<th scope="col" className="px-3 py-5 font-medium">
									Email
								</th>
								<th scope="col" className="px-3 py-5 font-medium">
									Title
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
									<span className="sr-only">Actions</span>
								</th>
							</tr>
						</thead>
						<tbody className="bg-white min-w-full">
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

export const CardSkeleton = () => {
	return (
		<div
			className={`${shimmer} relative overflow-hidden rounded-xl bg-emerald-100 p-2 shadow-sm`}>
			<div className="flex p-4">
				<div className="h-5 -w-5 rounded-md bg-emerald-200" />
				<div className=" ml-2 h-6 w-16 rounded-md bg-emerald-200 text-sm font-medium" />
			</div>
			<div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
				<div className="w-20 h-7 rounded-md bg-emerald-200" />
			</div>
		</div>
	);
};

export const CardsSkeleton = () => {
	return (
		<>
			<CardSkeleton />
			<CardSkeleton />
			<CardSkeleton />
			<CardSkeleton />
		</>
	);
};

export const TaskSkeleton = () => {
	return (
		<div
			className={`${shimmer} flex flex-row items-center justify-between border-b border-emerald-100 py-4`}>
			<div className="flex items-center">
				<div className="mr-2 h-8 w-8 rounded-full bg-emerald-200" />
				<div className="min-w-0">
					<div className="h-5 w-40 rounded-md bg-emerald-200" />
					<div className="mt-2 h-4 w-14 rounded-md bg-emerald-200" />
				</div>
			</div>
			<div className="mt-2 h-4 w-14 rounded-md bg-emerald-200" />
		</div>
	);
};

export const LatestTasksSkeleton = () => {
	return (
		<div
			className={`${shimmer} relative flex w-full flex-col overflow-hidden md:col-span-4`}>
			<div className="mb-4 h-8 w-36 rounded-md bg-emerald-100" />
			<div className="flex grow flex-col justify-between rounded-xl bg-emerald-200 p-4">
				<div className="bg-white px-6">
					<TaskSkeleton />
					<TaskSkeleton />
					<TaskSkeleton />
					<TaskSkeleton />
					<TaskSkeleton />
				</div>
				<div className="flex items-center pb-2 pt-6">
					<div className="bg-emerald-200 h-5 w-5 rounded-full" />
					<div className="bg-emerald-200 ml-2 h-4 w-20 rounded-md" />
				</div>
			</div>
		</div>
	);
};

export const DashboardSkeleton = () => {
	return (
		<div className="shimmer">
			<div
				className={`relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-emerald-100`}
			/>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				<CardSkeleton />
				<CardSkeleton />
				<CardSkeleton />
				<CardSkeleton />
			</div>
			<div className="mt-6 flex min-w-full items-center justify-center">
				<LatestTasksSkeleton />
			</div>
		</div>
	);
};

export const InputSkeleton = () => {
	return (
		<div className="mb-4">
			<div className="relative w-full h-12 block rounded-md bg-emerald-50" />
		</div>
	);
};
export const MyTasksSkelton = () => {
	return (
		<div className="shimmer mt-6">
			<div className="py-2 px-10 w-full">
				<div className="mb-4 md:mb-8 w-16 h-2 bg-slate-400" />
				<div className="flex items-center justify-between gap-2">
					<InputSkeleton />
					<div className="h-10 bg-green-300 w-8" />
				</div>
				<div className="relative mt-4 w-full overflow-hidden rounded-md bg-emerald-100">
					<TasksTableSkeleton />
				</div>
			</div>
		</div>
	);
};

export const BreadSkeleton = () => {
	return (
		<div className="mb-6 block">
			<div className="flex items-center gap-2">
				<div className="rounded-md w-16 h-6 bg-emerald-100" />
				<div className="rounded-md w-16 h-6 bg-emerald-100" />
			</div>
		</div>
	);
};

export const FormSkeleton = () => {
	return (
		<>
			<div className="rounded-lg bg-emerald-100 p-4 md:p-6">
				<InputSkeleton />
				<InputSkeleton />
				<InputSkeleton />
			</div>
			<div className="mt-6 flex justify-end gap-4">
				<div className="h-10 w-20 bg-emerald-100 rounded-md" />
				<div className="h-10 w-20 bg-green-500 rounded-md" />
			</div>
		</>
	);
};

export const EditTaskSkeleton = () => {
	return (
		<div className="shimmer px-10 pt-20 pb-2">
			<BreadSkeleton />
			<FormSkeleton />
		</div>
	);
};
