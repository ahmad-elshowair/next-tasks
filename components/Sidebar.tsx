import AuthLinks from "@/components/AuthLinks";
import NavLinks from "@/components/NavLinks";
import TaskLogo from "@/components/TaskLogo";
import { verifySession } from "../lib/session";

const Sidebar = async () => {
	const session = await verifySession();
	const isLoggedIn = !!session;
	const role = session?.role;
	const user_id = session?.user_id;

	return (
		<>
			<section className="w-full h-fit lg:h-screen lg:w-64 sticky top-0">
				<aside className="flex h-full flex-col px-3 py-4 md:px-2">
					<section className="mb-2 flex h-20 items-end justify-start rounded-md bg-gradient-to-tr from-neutral-400 via-slate-400 to-stone-400 p-4 lg:h-40">
						<TaskLogo />
					</section>
					<section className="flex grow flex-row justify-between space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2">
						<NavLinks role={role} />
						<div className="hidden h-auto w-full grow rounded-md bg-emerald-100 md:block shadow" />
						<AuthLinks
							isLoggedIn={isLoggedIn}
							user_name={session?.user_name}
							image_url={session?.image_url}
							user_id={user_id}
						/>
					</section>
				</aside>
			</section>
		</>
	);
};

export default Sidebar;
