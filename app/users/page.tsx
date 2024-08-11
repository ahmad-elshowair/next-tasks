import type { Metadata } from "next";

const UsersPage = () => {
	return <main className="flex p-4 w-full">UsersPage</main>;
};
export const metadata: Metadata = {
	title: "Users Page",
	description:
		"Users page to manage Users which deleting, fetching, creating, and updating Users",
};

export default UsersPage;
