import { compareSync, hashSync } from "bcrypt";

export const hash = (password: string) => {
	return hashSync(password + process.env.PEPPER, 10);
};

export const isMatch = (userPassword: string, dbPassword: string) => {
	return compareSync(userPassword + process.env.PEPPER, dbPassword);
};
