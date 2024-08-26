"use client";

const NotAuthorized = () => {
	return (
		<div className="flex rounded-lg bg-neutral-50 border border-green-400/75 shadow h-[calc(100vh-32px)] justify-center items-center">
			<h1 className="text-3xl font-bold text-green-900 uppercase text-center">
				You are Not Authorized
			</h1>
		</div>
	);
};

export default NotAuthorized;
