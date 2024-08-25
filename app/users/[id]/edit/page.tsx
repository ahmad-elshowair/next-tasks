import { fetchUserById } from "@/app/actions/user";
import Breadcrumb from "@/components/BreadCrumb";
import EditUserFrom from "@/components/users/EditUserForm";

const EditUserPage = async ({ params }: { params: { id: string } }) => {
	const { id } = params;
	const user = await fetchUserById(id);
	return (
		<section className="px-10 pt-20 pb-2">
			<Breadcrumb
				breadcrumbs={[
					{ label: "Users", href: "/users" },
					{ label: "Edit User", href: `/users/${id}edit`, active: true },
				]}
			/>
			<EditUserFrom user={user} />
		</section>
	);
};

export default EditUserPage;
