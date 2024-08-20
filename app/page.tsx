import { verifySession } from "@/app/lib/session";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import TaskLogo from "./components/TaskLogo";

export default async function Home() {
	const session = await verifySession();
	return (
		<section className="flex min-h-screen h-full p-4 w-full flex-col gap-3">
			{/* THE LOGO SECTION  */}
			<div className="flex items-end rounded-lg bg-gradient-to-tr from-neutral-400 via-slate-400 to-stone-400 p-4 md:h-[30%]">
				<TaskLogo />
			</div>

			{/* THE WELCOME SECTION */}
			<div className="flex flex-col gap-6 rounded-lg bg-neutral-50 px-6 py-10 md:px-20 shadow h-[70%] justify-center">
				<h1 className="text-3xl font-bold mb-4">Welcome to Task Manager</h1>
				{session ? (
					<div className="flex flex-col gap-12 w-8/12 ">
						<p className="text-lg text-neutral-700 font-semibold capitalize">
							You are logged in as{" "}
							<span className="text-green-400 ml-4">{session?.user_name}</span>
						</p>
						<Link
							href="/tasks"
							className="flex text-lg font-bold items-center gap-2 hover:text-green-500 group duration-500 ease-in-out">
							<span className="group-hover:mr-4">View Tasks</span>
							<i className="text-2xl">
								<BsArrowRight />
							</i>
						</Link>
					</div>
				) : (
					<p className="text-neutral-700 font-semibold">
						Please{" "}
						<Link href={"/login"} className=" text-blue-500 hover:underline">
							Login
						</Link>{" "}
						to access your tasks.
					</p>
				)}
			</div>
		</section>
	);
}
