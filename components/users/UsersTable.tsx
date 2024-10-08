import { EditBtn } from "@/components/buttons";
import DeleteModal from "@/components/DeleteModal";
import User from "@/components/users/User";
import { UserTable } from "@/lib/definitions";
import Image from "next/image";

const UsersTable = ({ users }: { users: UserTable[] }) => {
	return (
		<section className="mt-6 flow-root">
			<div className="inline-block min-w-full align-middle">
				<div className="rounded-lg bg-emerald-100 p-2 md:mt-0">
					<div className="lg:hidden">
						{users.length > 0 ? (
							users.map((user) => <User {...user} key={user.user_id} />)
						) : (
							<p className="text-4xl text-red-100 border rounded-md p-4 bg-red-200">
								No Users found
							</p>
						)}
					</div>
					<table className="hidden lg:table min-w-full text-emerald-900">
						<thead className="rounded-lg text-left text-sm font-normal">
							<tr>
								<th scope="col" className="px-4 py-5 font-medium">
									Avatar
								</th>
								<th scope="col" className="px-4 py-5 font-medium">
									User Name
								</th>
								<th scope="col" className="px-4 py-5 font-medium">
									Email
								</th>
								<th scope="col" className="px-4 py-5 font-medium">
									Role
								</th>
								<th scope="col" className="px-4 py-5 font-medium">
									Joined since{" "}
								</th>
								<th scope="col" className="px-4 py-5 font-medium">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="bg-white">
							{users.map((user) => (
								<tr
									key={user.user_id}
									className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
									<td className="py-3 pl-6 pr-3 whitespace-nowrap">
										<Image
											src={user.image_url || "/default-avatar.png"}
											height={40}
											width={40}
											alt={`${user.user_name}'s profile avatar`}
											className="rounded-2xl"
										/>
									</td>
									<td className="p-3 whitespace-nowrap text-sm">
										{user.user_name}
									</td>
									<td className="p-3 whitespace-nowrap text-sm">
										{user.email}
									</td>
									<td className="p-3 whitespace-nowrap text-sm">{user.role}</td>
									<td className="p-3 whitespace-nowrap text-sm">
										{user.created_at?.toString().slice(4, 16)}
									</td>
									<td className="whitespace-nowrap px-3">
										<div className="flex items-center gap-3">
											<EditBtn href={`/users/${user.user_id}/edit`} />
											<DeleteModal label="User" id={user.user_id} />
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
};

export default UsersTable;
