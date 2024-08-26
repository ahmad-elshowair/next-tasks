import { verifySession } from "@/lib/session";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

export default async function Home() {
	const session = await verifySession();
	return (
		<section className="flex lg:min-h-screen xl:min-h-screen h-[calc(100vh-168px)] p-4 w-full flex-col gap-3">
			{/* THE WELCOME SECTION */}
			<div className="flex flex-col gap-6 rounded-lg bg-neutral-50 xs:px-6 py-10 md:px-20 shadow h-full justify-center items-center">
				<h1 className="text-3xl font-bold mb-4">Welcome to Task Manager</h1>
				{session ? (
					<div className="flex flex-col gap-12 w-8/12 items-center">
						<p className="text-lg text-neutral-700 font-semibold capitalize">
							You are logged in as{" "}
							<span className="text-green-400 ml-4">{session?.user_name}</span>
						</p>
						<Link
							href="/my-tasks"
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
