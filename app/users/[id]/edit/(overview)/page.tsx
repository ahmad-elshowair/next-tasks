import { fetchUserById } from "@/app/actions/user";
import Breadcrumb from "@/components/BreadCrumb";
import { BreadSkeleton, FormSkeleton } from "@/components/skeletons";
import EditUserFrom from "@/components/users/EditUserForm";
import { Suspense } from "react";

const EditUserPage = async ({ params }: { params: { id: string } }) => {
	const { id } = params;
	const user = await fetchUserById(id);
	return (
		<section className="px-10 pt-20 pb-2">
			<Suspense fallback={<BreadSkeleton />}>
				<Breadcrumb
					breadcrumbs={[
						{ label: "Users", href: "/users" },
						{ label: "Edit User", href: `/users/${id}edit`, active: true },
					]}
				/>
			</Suspense>
			<Suspense fallback={<FormSkeleton />}>
				<EditUserFrom user={user} />
			</Suspense>
		</section>
	);
};

export default EditUserPage;
