import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

export default function Home() {
	const session = { logged: false, name: "ahmad" };
	return (
		<main className="flex min-h-screen p-4 w-full">
			{/* <div className="flex h-20 shrink-0 items-end rounded-lg bg-gradient-to-tr from-neutral-400 via-slate-400 to-stone-400 p-4 md:h-52">
				<TaskLogo />
			</div> */}
			<div className="flex flex-col gap-6 grow">
				{/* THE WELCOME SECTION */}
				<div className="flex flex-col justify-center gap-6 rounded-lg bg-neutral-50 px-6 py-10 md:px-20 shadow">
					<h1 className="text-3xl font-bold mb-4">Welcome to Task Manager</h1>
					{session.logged ? (
						<>
							<p className="text-lg text-neutral-700 font-semibold capitalize">
								You are logged in as {session.name}
							</p>
							<Link
								href="/tasks"
								className="text-lg font-bold hover:text-neutral-50 bg-green-300 rounded-lg flex py-3 px-6 hover:bg-green-400 duration-200 ease-in-out items-center justify-between w-56 [hover:>ps-3]">
								View Tasks
								<BsArrowRight className="text-2xl" />
							</Link>
						</>
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

				{/* THE BANNER SECTION  */}
				<div className="flex items-center justify-center p-6 md:px-28 md:py-12">
					<Image
						src={"/hero-desktop.png"}
						height={760}
						width={1000}
						className="hidden md:block"
						alt="Screenshot of the Tasks project showing desktop version"
					/>
					<Image
						src={"/hero-mobile.png"}
						height={620}
						width={560}
						className="block md:hidden"
						alt="Screenshot of the Tasks project showing desktop version"
					/>
				</div>
			</div>
		</main>
	);
}
