import { fetchAllTasksPages, fetchFilteredAllTasks } from "@/app/actions/task";
import { CreateBtn } from "@/components/buttons";
import Message from "@/components/Message";
import TasksTable from "@/components/my-tasks/TasksTable";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import { TasksTableSkeleton } from "@/components/skeletons";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Tasks Page",
	description:
		"Tasks page to manage tasks which deleting, fetching, creating, and updating tasks",
};

const AllTasksPage = async ({
	searchParams,
}: {
	searchParams?: {
		query?: string;
		page?: number;
		message?: string;
		status?: "success" | "error";
	};
}) => {
	const query = searchParams?.query || "";
	const currentPage = Number(searchParams?.page) || 1;
	const totalPages = await fetchAllTasksPages(query);
	const tasks = await fetchFilteredAllTasks(query, currentPage);
	const message = searchParams?.message;
	const status = searchParams?.status;

	return (
		<main className="py-2 px-10 w-full">
			<h1 className="md:mt-20 text-3xl font-bold mb-4 md:mb-8">Tasks</h1>
			{message && status && <Message message={message} status={status} />}
			<section className="flex items-center justify-between gap-2">
				<Search placeholder="Search Task..." />
				<CreateBtn href="/all-tasks/create" label="Create Take" />
			</section>
			<Suspense key={query + currentPage} fallback={<TasksTableSkeleton />}>
				<TasksTable tasks={tasks} edit_href="all-tasks" />
			</Suspense>
			<section className="mt-5 flex w-full justify-center">
				<Pagination totalPages={totalPages} />
			</section>
		</main>
	);
};

export default AllTasksPage;
