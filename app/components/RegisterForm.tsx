import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiEnglishInput, RiLockPasswordFill } from "react-icons/ri";

const RegisterForm = () => {
	return (
		<form action="">
			<div className="flex flex-col bg-emerald-100 px-5 py-10 rounded-lg">
				<h1 className="text-2xl font-bold text-center mb-5">Register</h1>
				<div className="mt-3 ">
					<label
						htmlFor="user_name"
						className="block mb-2 text-sm font-medium text-emerald-900">
						User Name
					</label>
					<div className="relative">
						<input
							className="peer block w-full border border-emerald-200 pl-10 py-2 outline-2 text-sm placeholder:text-emerald-700 rounded-md"
							name="user_name"
							id="user_name"
							placeholder="ahmad-saeed"
							aria-describedby="user_name-error"
						/>
						<RiEnglishInput className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-emerald-700" />
					</div>
				</div>
				{/* display an error of the user name if any  */}

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
				{/* display an error of the email if any  */}
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
				{/* display an error of the password if any  */}

				<div className="mt-6">
					<button className="rounded-md px-4 py-2 bg-green-500 hover:bg-green-600 duration-200 ease-in-out text-emerald-50 w-full ">
						Register
					</button>
				</div>
			</div>
		</form>
	);
};

export default RegisterForm;
