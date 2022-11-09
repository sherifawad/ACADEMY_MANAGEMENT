import bcrypt from "bcrypt";
import { randomUUID } from "crypto";

/**
 * Returns a hash given a password
 * @param password Plaintext password to verify
 * @param hash Hashed password to compare against
 */
export async function verifyPassword(password: string, hash: string) {
	return await bcrypt.compare(password, hash);
}

/**
 * hashed password
 * @param user_password
 */
export const hashPassword = async (user_password: string): Promise<string> => {
	const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS || "10", 10));
	return bcrypt.hash(user_password, salt);
};

// Helper functions to generate unique keys and calculate the expiry dates for session cookies

export const fromDate = (time: number, date = Date.now()) => {
	console.log("🚀 ~ file: authUtils.ts ~ line 25 ~ fromDate ~ time", time);
	return new Date(date + time * 1000);
};
