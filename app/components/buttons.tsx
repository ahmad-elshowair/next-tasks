import Link from "next/link";
import { FaPencil, FaPlus, FaTrashCan } from "react-icons/fa6";

export const CreateBtn = ({ label, href }: { label: string; href: string }) => {
	return (
		<Link
			href={href}
			className="flex gap-2 items-center h-10 rounded-lg bg-green-500 px-4 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 text-gray-500 focus-visible:outline-green-600 hover:bg-green-600 hover:text-green-50 duration-200 ease-in-out">
			<span className="hidden md:inline">{label}</span>
			<FaPlus className="h-5" />
		</Link>
	);
};

export const EditBtn = ({ href }: { href: string }) => {
	return (
		<Link
			href={href}
			className="rounded-md border p-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-green-50 duration-200 ease-in-out">
			<FaPencil className="w-5" />
		</Link>
	);
};

export const DeleteBtn = () => {
	return (
		<button className="rounded-md border p-2 border-red-600 hover:bg-red-600 hover:text-red-50 text-red-600 duration-200 ease-in-out">
			<span className="sr-only">Delete</span>
			<FaTrashCan className="w-5" />
		</button>
	);
};
