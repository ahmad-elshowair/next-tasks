import { fetchFilteredUsers, fetchUsersPages } from "@/app/actions/user";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import { CreateBtn } from "@/components/buttons";
import UsersTable from "@/components/users/UsersTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Users Page",
	description:
		"Users page to manage Users which deleting, fetching, creating, and updating Users",
};

const UsersPage = async ({
	searchParams,
}: {
	searchParams: { query?: string; page?: number };
}) => {
	const query = searchParams?.query || "";
	const currentPage = Number(searchParams?.page) || 1;
	const totalPages = await fetchUsersPages(query);
	const users = await fetchFilteredUsers(query, currentPage);
	return (
		<main className="py-2 px-10 w-full">
			<h1 className=" md:mt-20 text-3xl font-bold mb-4 md:mb-8">Users</h1>
			<section className="flex items-center justify-between gap-2">
				<Search placeholder="Search User..." />
				<CreateBtn href="/users/create" label="Create User" />
			</section>
			<UsersTable users={users} />
			<section className="mt-5 flex w-full justify-center">
				<Pagination totalPages={totalPages} />
			</section>
		</main>
	);
};

export default UsersPage;
