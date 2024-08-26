import Breadcrumb from "@/components/BreadCrumb";
import { BreadSkeleton, FormSkeleton } from "@/components/skeletons";
import CreateUserForm from "@/components/users/CreateUserForm";
import { Suspense } from "react";

const CreateUser = () => {
	return (
		<section className="px-10 pt-20 pb-2">
			<Suspense fallback={<BreadSkeleton />}>
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
			</Suspense>
			<Suspense fallback={<FormSkeleton />}>
				<CreateUserForm />
			</Suspense>
		</section>
	);
};

export default CreateUser;
