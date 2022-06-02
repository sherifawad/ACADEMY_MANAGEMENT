import jwt from "jsonwebtoken";
import { User } from "next-auth";
import { JWT } from "next-auth/jwt";

export const JWT_ALGORITHM = "HS256";
export const JWT_SECRET = process.env.JWT_SECRET;

export const decodeToken = (token: string, secret: string | Buffer = JWT_SECRET) => {
	return jwt.verify(token, secret, {
		algorithms: [JWT_ALGORITHM],
	}) as JWT;
};

export const signUser = (user: User | JWT) => {
	return jwt.sign(user, JWT_SECRET, {
		algorithm: JWT_ALGORITHM,
	});
};

export const encodeUser = (user: JWT, secret: string | Buffer = JWT_SECRET) => {
	const jwtClaims: JWT = {
		name: user.name,
		email: user.email,
		id: user.id,
		role: user.role,
		iat: Date.now() / 1000,
		exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
	};
	const encodedToken = jwt.sign(jwtClaims, secret, {
		algorithm: JWT_ALGORITHM,
	});
	return encodedToken;
};
