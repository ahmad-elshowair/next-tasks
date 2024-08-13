import Breadcrumb from "@/app/components/BreadCrumb";
import CreateUserForm from "@/app/components/users/CreateUserForm";

const CreateUser = () => {
	return (
		<main>
			<Breadcrumb
				breadcrumbs={[
					{ label: "Users", href: "/users" },
					{
						label: "Create User",
						active: true,
						href: "/users/create",
					},
				]}
			/>
			<CreateUserForm />
		</main>
	);
};

export default CreateUser;
