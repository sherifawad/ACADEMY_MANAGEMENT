import Jwt, { Jwt as JWType, decode, JwtPayload } from "jsonwebtoken";
import { User } from "../typings/interface";

export const JWT_ALGORITHM = "HS256";
export const JWT_SECRET = process.env.JWT_SECRET || "";
const REFRESH_TOKEN_LEGROOM = 10 * 60;
const oneMinutes = 1000 * 60 * 1;

export function getTokenState(token?: string | null) {
	if (!token) {
		return { valid: false, needRefresh: true };
	}

	const decoded = decode(token) as JwtPayload;
	if (!decoded) {
		return { valid: false, needRefresh: true };
	} else if (
		new Date(decoded.exp as number).getTime() - new Date().getTime() <
		oneMinutes
	) {
		return { valid: true, needRefresh: true };
	} else {
		return { valid: true, needRefresh: false };
	}
}

export const decodeToken = (
	token: string,
	secret: string | Buffer = JWT_SECRET
) => {
	return Jwt.verify(token, secret, {
		algorithms: [JWT_ALGORITHM]
	}) as JWType;
};

export const signUser = (user: User | JWType) => {
	return Jwt.sign(user, JWT_SECRET, {
		algorithm: JWT_ALGORITHM
	});
};

export const encodeUser = (
	user: User,
	secret: string | Buffer = JWT_SECRET,
	exp: string = "5m"
) => {
	const payload = {
		id: user.user_id,
		role: user.user_role
	};
	const encodedToken = Jwt.sign(payload, secret, {
		expiresIn: exp
	});
	return encodedToken;
};
