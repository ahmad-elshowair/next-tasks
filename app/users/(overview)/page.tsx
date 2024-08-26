import { fetchFilteredUsers, fetchUsersPages } from "@/app/actions/user";
import Message from "@/components/Message";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import { CreateBtn } from "@/components/buttons";
import { TasksTableSkeleton } from "@/components/skeletons";
import UsersTable from "@/components/users/UsersTable";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Users Page",
	description:
		"Users page to manage Users which deleting, fetching, creating, and updating Users",
};

const UsersPage = async ({
	searchParams,
}: {
	searchParams: {
		query?: string;
		page?: number;
		message?: string;
		status?: "success" | "error";
	};
}) => {
	const query = searchParams?.query || "";
	const currentPage = Number(searchParams?.page) || 1;
	const totalPages = await fetchUsersPages(query);
	const users = await fetchFilteredUsers(query, currentPage);
	const message = searchParams?.message;
	const status = searchParams?.status;
	return (
		<section className="py-2 px-10 w-full">
			<h1 className=" md:mt-20 text-3xl font-bold mb-4 md:mb-8">Users</h1>
			{message && <Message message={message} status={status} />}
			<section className="flex items-center justify-between gap-2">
				<Search placeholder="Search User..." />
				<CreateBtn href="/users/create" label="Create User" />
			</section>
			<Suspense fallback={<TasksTableSkeleton />}>
				<UsersTable users={users} />
			</Suspense>
			<section className="mt-5 flex w-full justify-center">
				<Pagination totalPages={totalPages} />
			</section>
		</section>
	);
};

export default UsersPage;
