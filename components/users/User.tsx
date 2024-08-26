import { EditBtn } from "@/components/buttons";
import DeleteModal from "@/components/DeleteModal";
import { UserTable } from "@/lib/definitions";
import Image from "next/image";

const User = (user: UserTable) => {
	return (
		<div className="mb-2 w-full rounded-md bg-gray-50 p-4">
			<div className="flex items-center justify-between border-b pb-4">
				<div>
					<div className="mb-2 flex items-center">
						<Image
							src={user.image_url}
							className="mr-2 rounded-full"
							height={28}
							width={28}
							alt="profile picture"
						/>
						<h2 className="text-lg font-bold">{user.user_name}</h2>
					</div>
					<p className="text-sm text-green-500">{user.email}</p>
				</div>
				<p>{user.created_at?.toString().slice(4, 16)}</p>
			</div>
			<div className="flex w-full items-center justify-between pt-4">
				<div>
					<p className="text-xl font-medium">{user.role}</p>
				</div>
				<div className="flex justify-end gap-2">
					<EditBtn href={`/users/${user.user_id}/edit`} />
					<DeleteModal label="User" id={user.user_id} />
				</div>
			</div>
		</div>
	);
};

export default User;
