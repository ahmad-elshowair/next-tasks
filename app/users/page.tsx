import type { Metadata } from "next";
import Search from "../ui/Search";
import { CreateBtn } from "../ui/buttons";

export const metadata: Metadata = {
	title: "Users Page",
	description:
		"Users page to manage Users which deleting, fetching, creating, and updating Users",
};

const UsersPage = () => {
	return (
		<main className="p-4 w-full">
			<h1 className="text-3xl font-bold mb-4 md:mb-8">Users</h1>
			<section className="flex items-center justify-between gap-2">
				<Search placeholder="Search User..." />
				<CreateBtn href="/users/create" label="Create User" />
			</section>
			{/* <UsersTable/> */}
			<section className="mt-5 flex w-full justify-center">
				{/* <Pagination/> */}
			</section>
		</main>
	);
};

export default UsersPage;
