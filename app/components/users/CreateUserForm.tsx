import { FaUser } from "react-icons/fa6";

const CreateUserForm = () => {
	return (
		<form>
			<div className="rounded-lg bg-emerald-100 p-4 md:p-6">
				<div className="mb-4">
					<label
						className="block mb-2 text-sm font-medium text-emerald-900"
						htmlFor="user_name">
						User Name
					</label>
					<div className="relative">
						<input
							className="peer block w-full border border-emerald-200 pl-10 pu-2 outline-2 text-sm placeholder:text-emerald-700"
							type="text"
							id="user_name"
							name="user_name"
							defaultValue={""}
							aria-describedby="user_name-error"
							placeholder="john-de"
						/>
						<FaUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-emerald-700" />
					</div>
				</div>
			</div>
		</form>
	);
};

export default CreateUserForm;
