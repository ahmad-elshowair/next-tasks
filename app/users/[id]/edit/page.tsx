import Breadcrumb from "@/app/components/BreadCrumb";

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
			{/* <EditUserForm/> */}
		</main>
	);
};

export default EditUserPage;
