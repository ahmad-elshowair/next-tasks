import { SessionPayload } from "@/app/lib/definitions";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import "server-only";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export const encrypt = async (payload: SessionPayload) => {
	try {
		return new SignJWT(payload)
			.setProtectedHeader({ alg: "HS256" })
			.setIssuedAt()
			.setExpirationTime("7d")
			.sign(encodedKey);
	} catch (error) {
		console.error(`FAILED TO ENCRYPT SESSION: ${(error as Error).message}`);
		throw new Error("ENCRYPTION FAILED !");
	}
};

export const decrypt = async (session: string | undefined = "") => {
	try {
		if (!session) {
			throw new Error("Session token is missing!");
		}
		const { payload } = await jwtVerify(session, encodedKey, {
			algorithms: ["HS256"],
		});
		return payload;
	} catch (error) {
		console.error(`Failed to Verify Session: ${(error as Error).message}`);
		throw new Error(`DECRYPTION FAILED: ${error}`);
	}
};

export const createSession = async (user: SessionPayload) => {
	try {
		const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
		const session = await encrypt({
			user_id: user.user_id,
			user_name: user.user_name,
			image_url: user.image_url,
			expiresAt: expiresAt,
			role: user.role,
		});
		cookies().set("user-session", session, {
			httpOnly: true,
			secure: true,
			sameSite: "lax",
			path: "/",
			expires: expiresAt,
		});
		console.log("Session created successfully"); // Debugging log
	} catch (error) {
		console.error(`FAILED TO CREATE SESSION: ${(error as Error).message}`);
		throw new Error(`SESSION CREATING FAILED!: ${error}`);
	}
};

export const updateSession = async () => {
	try {
		const session = cookies().get("user-session")?.value;
		const payload = await decrypt(session);
		if (!session || !payload) {
			return null;
		}
		const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
		cookies().set("user-session", session, {
			httpOnly: true,
			secure: true,
			expires: expiresAt,
			sameSite: "lax",
			path: "/",
		});
	} catch (error) {
		console.error(`FAILED TO UPDATE SESSION: ${(error as Error).message}`);
		throw new Error("SESSION UPDATING FAILED!");
	}
};

export const verifySession = async (): Promise<SessionPayload | null> => {
	try {
		const cookie = cookies().get("user-session")?.value;
		if (!cookie) {
			console.error("NO SESSION COOKIE FOUND!");
			redirect("/login");
		}
		const session = await decrypt(cookie);
		if (!session) {
			redirect("/login");
		}
		return session as SessionPayload;
	} catch (error) {
		console.error(`FAILED TO VERIFY SESSION: ${(error as Error).message}`);
		return null;
	}
};

export const deleteSession = async () => {
	try {
		cookies().delete("user-session");
	} catch (error) {
		console.error(`FAILED TO DELETE SESSION: ${(error as Error).message}`);
		throw new Error("SESSION DELETING FAILED!");
	}
};
