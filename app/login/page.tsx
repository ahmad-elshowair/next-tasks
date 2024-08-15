import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import TaskLogo from "../components/TaskLogo";

const LoginPage = () => {
	return (
		<main className="flex p-4 w-full justify-center items-center">
			<section className="w-4/12 flex flex-col gap-6">
				<div className="w-full rounded-lg bg-gradient-to-tr from-neutral-400 via-slate-400 to-stone-400">
					<TaskLogo />
				</div>
				<form action="">
					<div className="flex flex-col">
						<div className="mt-3 ">
							<label
								htmlFor="email"
								className="block mb-2 text-sm font-medium text-emerald-900">
								Email
							</label>
							<div className="relative">
								<input
									className="peer block w-full border border-emerald-200 pl-10 py-2 outline-2 text-sm placeholder:text-emerald-700 rounded-md"
									name="email"
									id="email"
									placeholder="example@gmail.com"
									aria-describedby="email-error"
								/>
								<MdOutlineAlternateEmail className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-emerald-700" />
							</div>
						</div>
						<div className="mt-3 ">
							<label
								htmlFor="password"
								className="block mb-2 text-sm font-medium text-emerald-900">
								Password
							</label>
							<div className="relative">
								<input
									className="peer block w-full border border-emerald-200 pl-10 py-2 outline-2 text-sm placeholder:text-emerald-700 rounded-md"
									name="password"
									id="password"
									type="password"
									placeholder="********"
									aria-describedby="password-error"
								/>
								<RiLockPasswordFill className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-emerald-700" />
							</div>
						</div>
					</div>
				</form>
			</section>
		</main>
	);
};

export default LoginPage;
