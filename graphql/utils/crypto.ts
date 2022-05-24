import bcrypt from "bcrypt";

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
