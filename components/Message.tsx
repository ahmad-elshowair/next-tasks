"use client";

import { useEffect, useState } from "react";

const Message = ({
	message,
	status,
}: {
	message?: string;
	status?: "success" | "error";
}) => {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setVisible(false);
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	if (!visible) return null;

	return (
		<div
			className={`fixed top-4 right-4 p-4 rounded-md w-96 text-center${
				status === "success"
					? "bg-green-100 text-green-800"
					: "bg-red-100 text-red-800"
			}`}>
			{message}
		</div>
	);
};

export default Message;
