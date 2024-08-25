"use client";
import { deleteTask } from "@/app/actions/task";
import { deleteUser } from "@/app/actions/user";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { FaTrashCan } from "react-icons/fa6";

const DeleteModal = ({ label, id }: { label: string; id: string }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isPending, startTransition] = useTransition();
	const { replace } = useRouter();
	const pathname = usePathname();

	const handleDelete = async () => {
		startTransition(async () => {
			if (pathname === "/tasks") {
				const { message, status } = await deleteTask(id);
				replace(
					`/tasks?message=${encodeURIComponent(message!)}&status=${status}`,
				);
			}
			const { message, status } = await deleteUser(id);
			replace(
				`/users?message=${encodeURIComponent(message!)}&status=${status}`,
			);
		});
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button className="bg-transparent px-2 border border-red-600 hover:bg-red-600 hover:text-red-50 text-red-600 h-fit">
					<span className="sr-only">Delete</span>
					<FaTrashCan className="w-5" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader className="mb-4">
					<DialogTitle className="text-green-900">Delete {label}</DialogTitle>
				</DialogHeader>
				<DialogDescription className="text-orange-700 font-bold">
					Are you sure you want to delete this {label}?
				</DialogDescription>
				<DialogFooter>
					<DialogClose>
						<Button className="border border-emerald-500 bg-emerald-50 text-emerald-700 hover:bg-emerald-500 hover:text-emerald-50 h-fit">
							Close
						</Button>
					</DialogClose>
					<form action="">
						<Button
							type="submit"
							onClick={handleDelete}
							disabled={isPending}
							className="bg-red-200 text-red-700 hover:bg-red-500 hover:text-red-50 h-fit">
							{isPending ? "Deleting..." : "Delete"}
						</Button>
					</form>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteModal;
