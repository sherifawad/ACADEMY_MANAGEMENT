import { CookieOptions, Request } from "express";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import srs from "secure-random-string";
import constants from "../core/constants";
import { Context, User } from "../typings/interface";
export type JwtRefreshPayload = {
	userId: string;
	hash: string;
	expiration: Date;
};

type GetUserIdContext = {
	request: Request;
	connection?: any;
};

export const randomRefreshHashGenerations = () => {
	let expiration = new Date();
	expiration.setDate(
		expiration.getDate() + Number(constants.JWT_REFRESH_EXPIRATION_DAYS)
	);
	const refresh_token = srs({ length: 100 });

	return {
		expires_at: Math.floor(expiration.getTime() / 1000),
		refresh_token
	};
};

export const createAccessToken = (payload: User) => {
	let expiration = new Date();
	expiration.setMinutes(
		expiration.getMinutes() +
			Number(constants.JWT_ACCESS_EXPIRATION_Minutes)
	);
	let accessTokenExpiresIn = Math.floor(expiration.getTime() / 1000);
	const accessToken = sign(payload, constants.JWT_ACCESS_SECRET, {
		//convert to seconds
		expiresIn: Number(constants.JWT_ACCESS_EXPIRATION_Minutes) * 60000
	});

	return {
		accessTokenExpiresIn,
		accessToken
	};
};

export const createRefreshToken = (payload: string) => {
	let expiration = new Date();
	expiration.setDate(
		expiration.getDate() + Number(constants.JWT_REFRESH_EXPIRATION_DAYS)
	);
	const tokenExpire =
		Number(constants.JWT_REFRESH_EXPIRATION_DAYS) * 24 * 60 * 60000;

	const refreshToken = sign({ payload }, constants.JWT_REFRESH_SECRET, {
		expiresIn: tokenExpire
	});

	return {
		refreshTokenExpiresIn: Math.floor(expiration.getTime() / 1000),
		refreshToken
	};
};
export const getRefreshToken = (payload: string) => {
	const decoded = verify(payload, constants.JWT_REFRESH_SECRET);

	return {
		decoded
	};
};

// export const createRefreshCookie = (jwt: string): [string, string, CookieOptions] => {
// 	const isProd = process.env.NODE_ENV === "production";
// 	const cookieOptions: CookieOptions = {
// 		secure: isProd ? true : false,
// 		httpOnly: true,
// 		expires: addMilliseconds(Date.now(), ms(constants.JWT_REFRESH_EXPIRATION)),
// 		// Same site if frontend and backend are not separate
// 		// sameSite: true
// 	};

// 	return ["refresh", jwt, cookieOptions];
// };

export const createRefreshCookie = (
	payload: string
): [string, string, CookieOptions] => {
	const isProd = process.env.NODE_ENV === "production";
	const cookieOptions: CookieOptions = {
		secure: isProd ? true : false,
		httpOnly: true,
		expires: new Date()
		// Same site if frontend and backend are not separate
		// sameSite: true
	};

	return ["refresh", payload, cookieOptions];
};

export const removeRefreshCookie = (context: any) => {
	context.response.cookie("refresh", "", { expires: new Date() });
};

export const createTokens = async (
	payload: User,
	refreshTokenPayload: string,
	context?: Context
) => {
	const accessToken = createAccessToken(payload);

	const refreshToken = createRefreshToken(refreshTokenPayload);

	if (!!context) {
		if (refreshTokenPayload) {
			const refreshCookie = createRefreshCookie(refreshTokenPayload);
			context.response.cookie(...refreshCookie);
		}
	}

	return {
		accessToken,
		refreshToken
	};
};

export function getUserId({ request, connection }: GetUserIdContext) {
	const Authorization = connection
		? connection.context.authorization
		: request.get("Authorization");
	if (Authorization) {
		const token = Authorization.replace("Bearer ", "");
		const verifiedToken = verify(token, constants.JWT_ACCESS_SECRET) as
			| User
			| JwtPayload;
		return verifiedToken?.id;
	}
}

// export function getRefreshCookie({
// 	request
// }: Pick<GetUserIdContext, "request">) {
// 	const refreshToken = request.cookies["refresh"];
// 	if (refreshToken) {
// 		// return refreshToken;
// 		const jwtContent = verify(
// 			refreshToken,
// 			constants.JWT_REFRESH_SECRET
// 		) as JwtPayload;
// 		return jwtContent;
// 	}
// }