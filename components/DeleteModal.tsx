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
import { FaTrashCan } from "react-icons/fa6";

const DeleteModal = ({ label }: { label: string }) => {
	return (
		<Dialog>
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
					<form>
						<Button
							type="submit"
							className="bg-red-200 text-red-700 hover:bg-red-500 hover:text-red-50 h-fit">
							Delete
						</Button>
					</form>
				</DialogFooter>
			</DialogContent>
		</Dialog>

		// <Dialog>
		// 	<DialogTrigger asChild>
		// 		<Button className="rounded-md border p-2 border-red-600 hover:bg-red-600 hover:text-red-50 text-red-600 duration-200 ease-in-out">
		// 			<span className="sr-only">Delete</span>
		// 			<FaTrashCan className="w-5" />
		// 		</Button>
		// 	</DialogTrigger>
		// 	<DialogContent className="sm:max-w-md">
		// 		<DialogHeader>
		// 			<DialogTitle>{label}</DialogTitle>
		// 		</DialogHeader>
		// 		<DialogDescription>
		// 			Are you sure you want to delete this item?
		// 		</DialogDescription>
		// 		<DialogFooter className="sm:justify-start">
		// 			<DialogClose>
		// 				<Button
		// 					className="rounded-md border p-2 border-gray-600 hover:bg-gray-600
		// 					hover:text-gray-50 text-gray-600 duration-200 ease-in-out"
		// 					type="button">
		// 					Cancel
		// 				</Button>
		// 			</DialogClose>
		// 			<Button type="submit">Delete</Button>
		// 		</DialogFooter>
		// 	</DialogContent>
		// </Dialog>
	);
};

export default DeleteModal;
