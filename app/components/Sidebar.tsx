import AuthLinks from "@/app/components/AuthLinks";
import NavLinks from "@/app/components/NavLinks";
import TaskLogo from "@/app/components/TaskLogo";
import { verifySession } from "../lib/session";

const Sidebar = async () => {
	const session = await verifySession();
	const isLoggedIn = !!session;

	return (
		<>
			<section className="sm:w-full sm:h-fit lg:h-screen lg:w-64 sticky top-0">
				<aside className="flex h-full flex-col px-3 py-4 md:px-2">
					<section className="mb-2 flex sm:h-20 items-end justify-start rounded-md bg-gradient-to-tr from-neutral-400 via-slate-400 to-stone-400 p-4 lg:h-40">
						<TaskLogo />
					</section>
					<div className="flex grow sm:flex-row justify-between sm:space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2">
						<NavLinks />
						<div className="sm:hidden h-auto w-full grow rounded-md bg-emerald-100 lg:block shadow"></div>
						<AuthLinks isLoggedIn={isLoggedIn} />
					</div>
				</aside>
			</section>
		</>
	);
};

export default Sidebar;
