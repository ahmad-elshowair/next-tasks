"use client";
import { updateInfo, updatePassword } from "@/app/actions/user";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	UpdatePasswordStateForm,
	User,
	UserFormState,
} from "@/lib/definitions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useActionState, useEffect, useState } from "react";
import { FaRegUser, FaUser } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiAdminLine, RiLockPasswordFill } from "react-icons/ri";
import Message from "../Message";
const AccountTab = ({ user }: { user: User }) => {
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

	const initialInfoState: UserFormState = {
		message: null,
		errors: {},
		status: null,
	};
	const initialPasswordState: UpdatePasswordStateForm = {
		message: null,
		errors: {},
		status: null,
	};
	const [infoState, infoAction, isPendingInfo] = useActionState(
		updateInfo,
		initialInfoState,
	);

	const [passwordState, passwordAction, isPendingPassword] = useActionState(
		updatePassword,
		initialPasswordState,
	);
	const router = useRouter();
	useEffect(() => {
		if (passwordState.status === "success" && passwordState.shouldRedirect) {
			const timer = setTimeout(() => {
				router.push("/login");
			}, 4000);
			return () => clearTimeout(timer);
		}
	}, [passwordState, router]);

	return (
		<Tabs defaultValue="info" className="w-full">
			<TabsList className="flex w-full bg-emerald-100">
				<TabsTrigger value="info" className="w-full">
					Info
				</TabsTrigger>
				<TabsTrigger value="password" className=" w-full">
					Password
				</TabsTrigger>
			</TabsList>
			<TabsContent value="info">
				<form action={infoAction}>
					<Card className="bg-emerald-100">
						<CardHeader>
							<CardTitle>Info</CardTitle>
							<CardDescription>
								{`Make changes to your account here. Click save when you're done.`}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="mb-6">
								<Label
									htmlFor="user_name"
									className="block mb-2 text-sm font-bold text-emerald-900">
									User Name
								</Label>
								<div className="relative">
									<Input
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
							{infoState.errors?.user_name && (
								<div id="user_name-error" aria-atomic="true" aria-live="polite">
									{infoState.errors.user_name.map((error: string) => (
										<p key={error} className="text-red-500 text-sm">
											{error}
										</p>
									))}
								</div>
							)}
							<div className="mb-6">
								<Label
									className="block mb-2 text-sm font-bold text-emerald-900"
									htmlFor="email">
									Email
								</Label>
								<div className="relative">
									<Input
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

							{infoState.errors?.email && (
								<div id="email-error" aria-atomic="true" aria-live="polite">
									{infoState.errors.email.map((error: string) => (
										<p key={error} className="text-red-500 text-sm">
											{error}
										</p>
									))}
								</div>
							)}
							<div className="mt-4 flex items-center ">
								<span className="text-2xl text-emerald-700 font-semibold">
									I am
								</span>
								{user.role === "user" ? (
									<span className="ml-2 flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-300 px-3 py-1.5 text-xs font-medium text-emerald-600">
										<span className="text-sm inline-block">User</span>
										<FaRegUser className="h-4 w-4" />
									</span>
								) : (
									<span className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-emerald-300 px-3 py-1.5 text-xs font-medium text-emerald-600">
										<span className="text-sm inline-block">Admin</span>
										<RiAdminLine className="h-4 w-4" />
									</span>
								)}
							</div>
							<div className="mt-4 flex items-center gap-6">
								<div className="">
									{file ? (
										<Image
											src={URL.createObjectURL(file)}
											height={150}
											width={200}
											alt="avatar picture"
											className="rounded-lg w-fit max-h-40"
										/>
									) : (
										<Image
											src={user.image_url || "/default-avatar.png"}
											height={150}
											width={200}
											alt="avatar picture"
											className="rounded-lg w-fit max-h-40"
										/>
									)}
								</div>
								<label
									htmlFor="image_url"
									className="px-6 py-2 rounded-md bg-emerald-50 text-emerald-800 hover:bg-emerald-300 duration-200 transition-colors cursor-pointer">
									Change Avatar
								</label>
								<span className="line-clamp-1 text-sm">{fileName}</span>
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
						</CardContent>
						<CardFooter className="justify-end">
							<Button
								className="bg-green-500 hover:bg-green-700"
								disabled={isPendingInfo}>
								{isPendingInfo ? "Saving..." : "Save changes"}
							</Button>
						</CardFooter>
						{infoState.message && (
							<Message message={infoState.message} status={infoState.status!} />
						)}
					</Card>
				</form>
				{infoState.errors?.other &&
					infoState.errors.other.map((error: string) => (
						<p
							key={error}
							className="mt-2 p-2 rounded-lg bg-red-
							100 text-red-600 uppercase ring-2 ring-red-700">
							{error}
						</p>
					))}
			</TabsContent>
			<TabsContent value="password">
				<form action={passwordAction}>
					<Card className="bg-emerald-100">
						<CardHeader>
							<CardTitle>Password</CardTitle>
							<CardDescription>
								{`Change your password here. After saving, you'll be logged out.`}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div>
								<label
									className="block mb-2 text-sm font-bold text-emerald-900"
									htmlFor="old_password">
									Old Password
								</label>
								<div className="relative">
									<input
										className="peer block w-full border border-emerald-200 pl-10 py-2 outline-2 text-sm placeholder:text-emerald-700 rounded-md"
										type="password"
										id="old_password"
										name="old_password"
										aria-describedby="old_password-error"
										placeholder="***********"
									/>
									<RiLockPasswordFill className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-emerald-700" />
								</div>
							</div>
							{/* old Password error if any  */}
							<div
								id="old_password-error"
								aria-atomic="true"
								aria-live="polite"
								className="mb-4">
								{passwordState.errors?.old_password &&
									passwordState.errors.old_password.map((error: string) => (
										<p key={error} className="p-2 text-red-700">
											{error}
										</p>
									))}
							</div>

							<div className="mb-2">
								<label
									className="block mb-2 text-sm font-bold text-emerald-900"
									htmlFor="new_password">
									New Password
								</label>
								<div className="relative">
									<input
										className="peer block w-full border border-emerald-200 pl-10 py-2 outline-2 text-sm placeholder:text-emerald-700 rounded-md"
										type="password"
										id="new_password"
										name="new_password"
										aria-describedby="new_password-error"
										placeholder="********"
									/>
									<RiLockPasswordFill className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-emerald-700" />
								</div>
							</div>
							{/* New Password error if any  */}
							<div
								id="new_password-error"
								aria-atomic="true"
								aria-live="polite">
								{passwordState.errors?.new_password && (
									<div>
										<p className="text-red-700">New Password Must: </p>
										{passwordState.errors.new_password.map((error: string) => (
											<p key={error} className="pl-4  text-red-500">
												{error}
											</p>
										))}
									</div>
								)}
							</div>
						</CardContent>
						<CardFooter className="justify-end">
							<Button
								className="bg-green-400 hover:bg-green-700"
								disabled={isPendingPassword}>
								{isPendingPassword ? "Changing..." : "Change password"}
							</Button>
						</CardFooter>
						{passwordState.message && (
							<Message
								message={passwordState.message}
								status={passwordState.status!}
							/>
						)}
					</Card>
				</form>
				{passwordState.errors?.other &&
					passwordState.errors.other.map((error: string) => (
						<p
							key={error}
							className="mt-2 p-2 rounded-lg bg-red-100 text-red-700">
							{error}
						</p>
					))}
			</TabsContent>
		</Tabs>
	);
};

export default AccountTab;
