import Breadcrumb from "@/components/BreadCrumb";
import CreateUserForm from "@/components/users/CreateUserForm";

const CreateUser = () => {
	return (
		<section className="px-10 pt-20 pb-2">
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
		</section>
	);
};

export default CreateUser;
