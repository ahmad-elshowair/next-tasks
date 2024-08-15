import Breadcrumb from "@/app/components/BreadCrumb";
import EditUserFrom from "@/app/components/users/EditUserForm";

const EditUserPage = ({ params }: { params: { id: string } }) => {
	const { id } = params;

	return (
		<section className="px-10 pt-20 pb-2">
			<Breadcrumb
				breadcrumbs={[
					{ label: "Users", href: "/users" },
					{ label: "Edit User", href: `/users/${id}edit`, active: true },
				]}
			/>
			<EditUserFrom />
		</section>
	);
};

export default EditUserPage;
