import { AccessTokenState, nextAuthToken } from "graphql/types";
import jwt, { decode, JwtPayload } from "jsonwebtoken";
import { User } from "next-auth";
import { JWT } from "next-auth/jwt";

export const JWT_ALGORITHM = "HS256";
export const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_LEGROOM = 12 * 60;

export function getTokenState(token?: string | null): AccessTokenState {
	if (!token) {
		return { valid: false, needRefresh: true };
	}

	const decoded = decode(token) as JwtPayload;
	console.log("🚀 ~ file: jwt.ts ~ line 16 ~ getTokenState ~ decoded", decoded);
	if (!decoded) {
		return { valid: false, needRefresh: true };
	} else if (decoded.exp && Math.floor(Date.now() / 1000) + REFRESH_TOKEN_LEGROOM > decoded.exp) {
		return { valid: true, needRefresh: true };
	} else {
		return { valid: true, needRefresh: false };
	}
}

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

export const encodeUser = (user: nextAuthToken | User, secret: string | Buffer = JWT_SECRET) => {
	const jwtClaims: JWT = {
		name: user.name,
		email: user.email,
		id: user.id,
		role: user.role,
		user: {
			name: user.name,
			email: user.email,
			id: user.id,
			role: user.role,
			avatar: user.avatar,
		},
		iat: Date.now() / 1000,
		exp: Math.floor(Date.now() / 1000) + 50,
	};
	const encodedToken = jwt.sign(jwtClaims, secret, {
		algorithm: JWT_ALGORITHM,
	});
	return encodedToken;
};
