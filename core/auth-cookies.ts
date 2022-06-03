import { serialize, parse } from "cookie";
import { ServerResponse } from "http";
import { NextApiRequest, NextApiResponse } from "next";

export const TOKEN_NAME = "token";

export const MAX_AGE = 60 * 60 * 24 * 7 * 2; // 2 weeks

export function setTokenCookie(res: ServerResponse | NextApiResponse, token: string) {
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

export function removeTokenCookie(res: NextApiResponse) {
	const cookie = serialize(TOKEN_NAME, "", {
		maxAge: -1,
		path: "/",
	});

	res.setHeader("Set-Cookie", cookie);
}

export function parseCookies(req: NextApiRequest) {
	// For API Routes we don't need to parse the cookies.
	if (req.cookies) return req.cookies;

	// For pages we do need to parse the cookies.
	const cookie = req.headers?.cookie;
	return parse(cookie || "");
}

export function getTokenCookie(req: NextApiRequest) {
	const cookies = parseCookies(req);
	return cookies[TOKEN_NAME];
}
