import { serialize, parse } from "cookie";
import { Response, Request } from "express";

export const TOKEN_NAME = "RefreshToken";

export const MAX_AGE = 60 * 60 * 24 * 7 * 2; // 2 weeks

export function setTokenCookie(res: Response, token: string) {
	const cookie = serialize(TOKEN_NAME, token, {
		maxAge: MAX_AGE,
		expires: new Date(Date.now() + MAX_AGE * 1000),
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		path: "/",
		sameSite: "strict",
	});

	res.setHeader("Set-Cookie", cookie);
}

export function removeTokenCookie(res: Response) {
	const cookie = serialize(TOKEN_NAME, "", {
		maxAge: -1,
		path: "/",
	});

	res.setHeader("Set-Cookie", cookie);
}

export function parseCookies(req: Request) {
	// For API Routes we don't need to parse the cookies.
	if (req.cookies) return req.cookies;

	// For pages we do need to parse the cookies.
	const cookie = req.headers?.cookie;
	return parse(cookie || "");
}

export function getTokenCookie(req: Request) {
	const cookies = parseCookies(req);
	return cookies[TOKEN_NAME];
}