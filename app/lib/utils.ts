import { compareSync, hashSync } from "bcrypt";

export const hash = (password: string) => {
	const salt = process.env.SALT || 10;
	return hashSync(password + process.env.PEPPER, salt);
};

export const isMatch = (userPassword: string, dbPassword: string) => {
	return compareSync(userPassword + process.env.PEPPER, dbPassword);
};
