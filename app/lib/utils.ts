import { compareSync, hashSync } from "bcrypt";

export const hash = (password: string) => {
	return hashSync(password + process.env.PEPPER, 10);
};

export const isMatch = (userPassword: string, dbPassword: string) => {
	return compareSync(userPassword + process.env.PEPPER, dbPassword);
};

export const generatePagination = (currentPage: number, totalPages: number) => {
	// if pages less or equal 7
	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}

	if (currentPage <= 3) {
		return [1, 2, 3, "...", totalPages - 1, totalPages];
	}

	if (currentPage >= totalPages - 2) {
		return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
	}
	return [
		1,
		"...",
		currentPage - 1,
		currentPage,
		currentPage + 1,
		"...",
		totalPages,
	];
};
