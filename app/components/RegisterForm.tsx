"use client";
import { register } from "@/app/actions/auth";
import { RegisterFormState } from "@/app/lib/definitions";
import { useFormState, useFormStatus } from "react-dom";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiEnglishInput, RiLockPasswordFill } from "react-icons/ri";

const RegisterForm = () => {
	const initialState: RegisterFormState = { message: null, errors: {} };

	const [state, formAction] = useFormState(register, initialState);
	const { pending } = useFormStatus();
	return (
		<form action={formAction}>
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
				<div id="user_name-error" aria-atomic="true" aria-live="polite">
					{state?.errors?.user_name &&
						state.errors.user_name.map((error: string) => (
							<p key={error} className="text-red-500 text-sm">
								{error}
							</p>
						))}
				</div>

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
				<div id="email-error" aria-live="polite" aria-atomic="true">
					{state?.errors?.email &&
						state.errors.email.map((error: string) => (
							<p className="mt-2 text-xs text-red-500" key={error}>
								{error}
							</p>
						))}
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
				{/* display an error of the password if any  */}
				<div id="password-error" aria-live="polite" aria-atomic="true">
					{state?.errors?.password && (
						<div>
							<p className="text-red-500">Password Must: </p>
							{state.errors.password.map((error: string) => (
								<p className="mt-2 pl-4 text-xs text-red-500" key={error}>
									{error}
								</p>
							))}
						</div>
					)}
				</div>

				<div className="mt-6">
					<button
						className="rounded-md px-4 py-2 bg-green-500 hover:bg-green-600 duration-200 ease-in-out text-emerald-50 w-full"
						type="submit"
						aria-disabled={pending}>
						{pending ? "Registering..." : "Register"}
					</button>
				</div>
			</div>
		</form>
	);
};

export default RegisterForm;
