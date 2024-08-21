"use client";
import { createUserTask } from "@/app/actions/task";
import { UserCreateTaskStateFrom } from "@/app/lib/definitions";
import Link from "next/link";
import { useFormState } from "react-dom";
import { CiText } from "react-icons/ci";

const CreateUserTaskForm = () => {
	const initialState: UserCreateTaskStateFrom = { message: null, errors: {} };
	const [state, formAction] = useFormState(createUserTask, initialState);
	return (
		<form action={formAction}>
			<div className="rounded-lg bg-emerald-100 p-4 md:p-6">
				<div className="mb-4">
					<label className="mb-2 block text-sm font-medium" htmlFor="title">
						Title
					</label>
					<div className="relative">
						<input
							id="title"
							name="title"
							className="peer block w-full rounded-md border border-emerald-200 py-2 pl-10 text-sm outline-2 placeholder:text-emerald-700"
							aria-describedby="title-error"
							placeholder="Describe your task..."
						/>
						<CiText className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-emerald-700" />
					</div>
				</div>
				{/* Show error here  */}
				<div id="title-error">
					{state.errors?.title &&
						state.errors.title.map((error: string) => (
							<p key={error} className="text-sm text-red-600">
								{error}
							</p>
						))}
				</div>
			</div>
			<div className="mt-6 flex justify-end gap-4">
				<Link
					href={"/my-tasks"}
					className="flex h-10 items-center rounded-lg bg-emerald-100 px-4 text-sm font-medium text-emerald-600 transition-colors hover:bg-emerald-200">
					Cancel
				</Link>
				<button
					type="submit"
					className="h-10 rounded-lg bg-green-500 px-4 text-sm font-medium transition-colors hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 active:bg-green-500 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 text-green-50">
					Create Task
				</button>
			</div>
		</form>
	);
};

export default CreateUserTaskForm;
