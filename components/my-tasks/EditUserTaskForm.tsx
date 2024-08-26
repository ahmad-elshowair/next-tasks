"use client";
import { userUpdateTask } from "@/app/actions/task";
import { EditTaskFrom, UserTaskStateFrom } from "@/lib/definitions";
import Link from "next/link";
import { useActionState } from "react";
import { CiText } from "react-icons/ci";
import { FaCircleCheck, FaClock } from "react-icons/fa6";
import Message from "../Message";

const EditUserTaskForm = (task: EditTaskFrom) => {
	const initialState: UserTaskStateFrom = {
		message: null,
		status: null,
		errors: {},
	};

	const updateTaskWithId = userUpdateTask.bind(null, task.task_id);
	const [state, formAction, isPending] = useActionState(
		updateTaskWithId,
		initialState,
	);
	return (
		<form action={formAction}>
			{state.message && (
				<Message status={state.status!} message={state.message} />
			)}
			<div className="rounded-lg bg-emerald-100 p-4 md:p-6">
				<div className="mb-2">
					<label className="mb-2 block text-sm font-medium" htmlFor="title">
						Title
					</label>
					<div className="relative">
						<input
							id="title"
							name="title"
							className="peer block w-full rounded-md border border-emerald-200 py-2 pl-10 text-sm outline-2 placeholder:text-emerald-700"
							defaultValue={task.title}
							aria-describedby="title-error"
							placeholder="Describe your task..."
						/>
						<CiText className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-emerald-700" />
					</div>
				</div>
				{/* Show error here  */}
				<div id="title-error" aria-atomic="true" aria-live="polite">
					{state.errors?.title &&
						state.errors.title.map((error: string) => (
							<p key={error} className="text-sm text-red-600">
								{error}
							</p>
						))}
				</div>
				<fieldset className="mt-4">
					<legend className="mb-2 block text-sm font-medium capitalize">
						set the task status
					</legend>
					<div className="rounded-md border border-emerald-200 bg-white px-[14px] py-3">
						<div className="flex gap-4">
							<div className="flex items-center">
								<input
									id="done"
									name="is_completed"
									type="radio"
									value={"true"}
									defaultChecked={task.is_completed === true}
									className="h-4 w-4 cursor-pointer border-emerald-300 bg-emerald-100 text-emerald-600 focus:ring-2"
									aria-describedby="is_completed-error"
								/>
								<label
									htmlFor="done"
									className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-medium text-emerald-600">
									<span className="hidden md:inline">Done</span>
									<FaCircleCheck className="w-4 -h-4" />
								</label>
							</div>
							<div className="flex items-center">
								<input
									id="nope"
									name="is_completed"
									type="radio"
									value={"false"}
									defaultChecked={task.is_completed === false}
									className="h-4 w-4 cursor-pointer border-emerald-300 bg-emerald-100 text-emerald-600 focus:ring-2"
									aria-describedby="is_completed-error"
								/>
								<label
									htmlFor="nope"
									className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-medium text-emerald-600">
									<span className="hidden md:inline">Nope</span>
									<FaClock className="w-4 -h-4" />
								</label>
							</div>
						</div>
					</div>
				</fieldset>
				{/* error goes here  */}
				<div id="is_completed-error" aria-atomic="true" aria-live="polite">
					{state.errors?.is_completed &&
						state.errors.is_completed.map((error: string) => (
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
					disabled={isPending}
					className="h-10 rounded-lg bg-green-500 px-4 text-sm font-medium transition-colors hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 active:bg-green-500 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 text-green-50">
					{isPending ? "Saving..." : "Save Changes"}
				</button>
			</div>
		</form>
	);
};

export default EditUserTaskForm;
