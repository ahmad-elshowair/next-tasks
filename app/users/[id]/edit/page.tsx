import Breadcrumb from "@/app/components/BreadCrumb";
import EditUserFrom from "@/app/components/users/EditUserForm";

const EditUserPage = ({ params }: { params: { id: string } }) => {
	const { id } = params;

	return (
		<main>
			<Breadcrumb
				breadcrumbs={[
					{ label: "Users", href: "/users" },
					{ label: "Edit User", href: `/users/${id}edit`, active: true },
				]}
			/>
			<EditUserFrom />
		</main>
	);
};

export default EditUserPage;
