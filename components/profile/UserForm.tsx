"use client";
import { updateUser } from "@/app/actions/user";
import { UserEditForm, UserFormState } from "@/lib/definitions";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useActionState, useState } from "react";
import { FaRegUser, FaUser } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiAdminLine, RiLockPasswordFill } from "react-icons/ri";

const UserFrom = ({ user }: { user: UserEditForm }) => {
	const [file, setFile] = useState<File | null>(null);
	const [fileName, setFileName] = useState<string>(
		user.image_url || "No file Chosen",
	);

	const MAX_SIZE = 500 * 1024;
	const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
	const [imageError, setImageError] = useState("");

	const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
		const input = event.target;
		const file = input.files?.[0];

		console.log(file?.type);

		if (file) {
			if (file.size > MAX_SIZE) {
				setImageError(`File size must be less than ${MAX_SIZE / 1024} KB`);
				setFile(null);
				setFileName("No file chosen");
				event.target.value = "";
				return;
			}

			if (!ALLOWED_TYPES.includes(file.type)) {
				setImageError(
					"File type not allowed, Please use JPEG, PNG, GIF, or JPG",
				);
				setFile(null);
				setFileName("No file chosen");
				event.target.value = "";
				return;
			}

			setImageError("");
			setFile(file);
			setFileName(file.name);
		}
	};

	const initialState: UserFormState = { message: null, errors: {} };
	const [state, formAction, isPending] = useActionState(
		updateUser,
		initialState,
	);
	return (
		<form action={formAction}>
			<input type="hidden" name="user_id" value={user.user_id} />
			<div className="rounded-lg bg-emerald-100 p-4 md:p-6">
				<div className="mb-4">
					<label
						className="block mb-2 text-sm font-medium text-emerald-900"
						htmlFor="user_name">
						User Name
					</label>
					<div className="relative">
						<input
							className="peer block w-full border border-emerald-200 pl-10 py-2 outline-2 text-sm placeholder:text-emerald-700 rounded-md"
							type="text"
							id="user_name"
							name="user_name"
							defaultValue={user.user_name}
							aria-describedby="user_name-error"
						/>
						<FaUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-emerald-700" />
					</div>
				</div>
				{/* DISPLAY ERROR IF ANY FOR THE USER NAME */}
				{state.errors?.user_name && (
					<div id="user_name-error" aria-atomic="true" aria-live="polite">
						{state.errors.user_name.map((error: string) => (
							<p key={error} className="text-red-500 text-sm">
								{error}
							</p>
						))}
					</div>
				)}
				<div className="mb-4">
					<label
						className="block mb-2 text-sm font-medium text-emerald-900"
						htmlFor="email">
						Email
					</label>
					<div className="relative">
						<input
							className="peer block w-full border border-emerald-200 pl-10 py-2 outline-2 text-sm placeholder:text-emerald-700 rounded-md"
							id="email"
							name="email"
							defaultValue={user.email}
							aria-describedby="email-error"
							placeholder="example@gamil.com"
						/>
						<MdOutlineAlternateEmail className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-emerald-700" />
					</div>
				</div>
				{/* DISPLAY ERROR IF ANY FOR THE EMAIL */}

				{state.errors?.email && (
					<div id="email-error" aria-atomic="true" aria-live="polite">
						{state.errors.email.map((error: string) => (
							<p key={error} className="text-red-500 text-sm">
								{error}
							</p>
						))}
					</div>
				)}
				<div className="mb-4">
					<label
						className="block mb-2 text-sm font-medium text-emerald-900"
						htmlFor="password">
						Password
					</label>
					<div className="relative">
						<input
							className="peer block w-full border border-emerald-200 pl-10 py-2 outline-2 text-sm placeholder:text-emerald-700 rounded-md"
							type="password"
							id="password"
							name="password"
							aria-describedby="password-error"
							placeholder="********"
						/>
						<RiLockPasswordFill className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-emerald-700" />
					</div>
				</div>
				<div className="mb-4">
					<label
						className="block mb-2 text-sm font-medium text-emerald-900"
						htmlFor="new-password">
						New Password
					</label>
					<div className="relative">
						<input
							className="peer block w-full border border-emerald-200 pl-10 py-2 outline-2 text-sm placeholder:text-emerald-700 rounded-md"
							type="password"
							id="new-password"
							name="new-password"
							aria-describedby="new_password-error"
							placeholder="********"
						/>
						<RiLockPasswordFill className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-emerald-700" />
					</div>
				</div>
				{/* DISPLAY ERROR IF ANY FOR THE PASSWORD */}
				<fieldset>
					<legend className="mb-2 block text-sm font-medium">Role</legend>
					<div className="rounded-md border border-emerald-200 bg-white px-[14px] py-3">
						<div className="flex gap-4">
							<div className="flex items-center">
								<input
									type="radio"
									id="user"
									name="role"
									value="user"
									defaultChecked={user.role === "user"}
									className="h-4 w-4 cursor-pointer border-emerald-300 bg-emerald-100 text-emerald-600 focus:ring-2"
									aria-describedby="role-error"
								/>
								<label
									className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-medium text-emerald-600"
									htmlFor="user">
									<span className="text-sm inline-block">User</span>
									<FaRegUser className="h-4 w-4" />
								</label>
							</div>
							<div className="flex items-center">
								<input
									type="radio"
									id="admin"
									name="role"
									value="admin"
									defaultChecked={user.role === "admin"}
									className="h-4 w-4 cursor-pointer border-emerald-300 bg-emerald-100 text-emerald-600 focus:ring-2"
								/>
								<label
									className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-medium text-emerald-600"
									htmlFor="admin">
									<span className="text-sm inline-block">Admin</span>
									<RiAdminLine className="h-4 w-4" />
								</label>
							</div>
						</div>
					</div>
				</fieldset>
				{/* DISPLAY ERROR IF ANY FOR THE ROLE */}
				{state.errors?.role && (
					<div id="role-error" aria-atomic="true" aria-live="polite">
						{state.errors.role.map((error: string) => (
							<p key={error} className="text-red-500 text-sm">
								{error}
							</p>
						))}
					</div>
				)}

				<div className="mt-4 flex items-center gap-6">
					{file ? (
						<Image
							src={URL.createObjectURL(file)}
							height={80}
							width={80}
							alt="avatar picture"
							className="rounded-full"
						/>
					) : (
						<Image
							src={user.image_url || "/default-avatar.png"}
							height={80}
							width={80}
							alt="avatar picture"
							className="rounded-full"
						/>
					)}
					<label
						htmlFor="image_url"
						className="px-6 py-2 rounded-md bg-emerald-50 text-emerald-800 hover:bg-emerald-300 duration-200 transition-colors cursor-pointer">
						Change Avatar
					</label>
					<span>{fileName}</span>
					<input
						type="file"
						id="image_url"
						name="image_url"
						className="hidden"
						onChange={handleFile}
					/>
				</div>
				{imageError && (
					<p className="mt-2 p-2 rounded-lg bg-red-100 text-red-600 uppercase ring-2 ring-red-700">
						{imageError}
					</p>
				)}
			</div>
			{state.message && (
				<div
					className={`mt-4 p-4 rounded-md ${
						state.errors
							? " bg-red-100 text-red-700"
							: "bg-green-100 text-green-700"
					}`}>
					{state.message}
				</div>
			)}
			{Object.entries(state.errors || {}).map(([key, errors]) => (
				<div
					key={key}
					className="mt-2 p-4 rounded-md bg-red-
					100 text-red-700">
					{errors.join(", ")}
				</div>
			))}
			<div className="mt-6 flex justify-end gap-4">
				<button
					type="submit"
					className="rounded-md bg-green-500 px-6 py-2 text-sm font-medium transition-colors hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-50 active:bg-green-600 duration-200 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 text-green-50"
					disabled={isPending}>
					{isPending ? "Saving..." : "Save Changes"}
				</button>
			</div>
		</form>
	);
};

export default UserFrom;
