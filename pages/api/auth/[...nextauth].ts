import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import prisma from "@/lib/prisma";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { fromDate, verifyPassword } from "utils/authUtils";
import GoogleProvider from "next-auth/providers/google";
import { randomUUID } from "crypto";
import Cookies from "cookies";
import { decode, encode } from "next-auth/jwt";

const GOOGLE_AUTHORIZATION_URL =
	"https://accounts.google.com/o/oauth2/v2/auth?" +
	new URLSearchParams({
		prompt: "consent",
		access_type: "offline",
		response_type: "code",
	});

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: any) {
	try {
		const url =
			"https://oauth2.googleapis.com/token?" +
			new URLSearchParams({
				client_id: process.env.GOOGLE_CLIENT_ID ?? "",
				client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "",
				grant_type: "refresh_token",
				refresh_token: token.refreshToken,
			});

		const response = await fetch(url, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			method: "POST",
		});

		const refreshedTokens = await response.json();

		if (!response.ok) {
			throw refreshedTokens;
		}

		return {
			...token,
			accessToken: refreshedTokens.access_token,
			accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
			refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
		};
	} catch (error) {
		console.log(error);

		return {
			...token,
			error: "RefreshAccessTokenError",
		};
	}
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
	return await NextAuth(req, res, {
		adapter: PrismaAdapter(prisma),
		providers: [
			GoogleProvider({
				clientId: process.env.GOOGLE_CLIENT_ID ?? "",
				clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
			}),
			GithubProvider({
				clientId: process.env.GITHUB_ID ?? "",
				clientSecret: process.env.GITHUB_SECRET ?? "",
			}),
			CredentialsProvider({
				// The name to display on the sign in form (e.g. "Sign in with...")
				id: "credentials",
				name: "credentials",
				type: "credentials",
				// `credentials` is used to generate a form on the sign in page.
				// You can specify which fields should be submitted, by adding keys to the `credentials` object.
				// e.g. domain, username, password, 2FA token, etc.
				// You can pass any HTML attribute to the <input> tag through the object.
				credentials: {},
				async authorize(credentials, req) {
					try {
						const { name, password } = credentials as {
							name: string;
							password: string;
						};
						// perform you login logic
						// find out user from db
						const userQuery = await prisma.user.findFirstOrThrow({
							where: {
								name: name,
								isActive: true,
							},
							include: {
								role: true,
							},
						});
						if (userQuery.password && (await verifyPassword(password, userQuery.password))) {
							return userQuery;
						}
						throw new Error("invalid credentials");
					} catch (error) {
						console.log("🚀 ~ file: [...nextauth].ts ~ line 47 ~ authorize ~ error", error);
						throw new Error("invalid credentials");
					}
				},
			}),
		],
		pages: {
			signIn: "/auth/signin",
			// error: '/auth/error',
			signOut: "/auth/signout",
		},
		callbacks: {
			jwt({ token, user, account, isNewUser }) {
				// Initial sign in
				if (account && user) {
					delete (user as any)?.password;
					delete (user as any)?.emailVerified;
					token.user = user;
					// return {
					// 	accessToken: account.access_token,
					// 	accessTokenExpires: Date.now() + (account.expires_in as number) * 1000,
					// 	refreshToken: account.refresh_token,
					// 	user,
					// };
				}
				return token;

				// // Return previous token if the access token has not expired yet
				// if (Date.now() < (token as any).accessTokenExpires) {
				// 	return token;
				// }

				// // Access token has expired, try to update it
				// return refreshAccessToken(token);
			},
			async session({ session, token }) {
				if (token) {
					if (token.user) session.user = token.user;
					if (token.accessToken) (session as any).accessToken = token.accessToken;
					if (token.error) (session as any).error = token.error;
				}
				return session;
			},
			async signIn({ account, user, profile }) {
				if (user) {
					if (account?.provider === "credentials") {
						const checkAccount = await prisma.account.findFirst({
							where: {
								userId: user.id,
							},
						});
						if (!checkAccount) {
							await prisma.account.create({
								data: {
									userId: user.id,
									type: "credentials",
									provider: "credentials",
									providerAccountId: user.id,
								},
							});
						}

						const sessionToken = randomUUID?.();
						const time = Number(process.env.Session_maxAge) || 30 * 24 * 60 * 60;
						const sessionExpiry = fromDate(time);
						await prisma.session.create({
							data: {
								sessionToken: sessionToken,
								userId: user.id,
								expires: sessionExpiry,
							},
						});
						const cookies = new Cookies(req, res);

						cookies.set("next-auth.session-token", sessionToken, {
							expires: sessionExpiry,
						});
					} else {
						if (
							profile?.image ||
							(profile as any)?.picture ||
							(profile as any)?.avatar ||
							(profile as any)?.avatar_url
						) {
							await prisma.user.update({
								where: {
									id: user.id,
								},
								data: {
									image:
										profile?.image ||
										(profile as any)?.picture ||
										(profile as any)?.avatar ||
										(profile as any)?.avatar_url ||
										user.image,
								},
							});
						}
					}
				}
				return true;
			},
		},
		jwt: {
			secret: process.env.NEXTAUTH_SECRET,
			encode(params) {
				if (
					req?.query?.nextauth?.includes("callback") &&
					req?.query?.nextauth.includes("credentials") &&
					req?.method === "POST"
				) {
					const cookies = new Cookies(req, res);
					const cookie = cookies.get("next-auth.session-token");

					if (cookie) return cookie;
					return "";
				}
				return encode(params);
			},
			decode(params) {
				if (
					req?.query?.nextauth?.includes("callback") &&
					req?.query?.nextauth.includes("credentials") &&
					req?.method === "POST"
				) {
					return null;
				}

				// Revert to default behaviour when not in the credentials provider callback flow
				return decode(params);
			},
		},
		secret: process.env.NEXTAUTH_SECRET,
		session: {
			// Choose how you want to save the user session.
			// The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
			// If you use an `adapter` however, we default it to `"database"` instead.
			// You can still force a JWT session by explicitly defining `"jwt"`.
			// When using `"database"`, the session cookie will only contain a `sessionToken` value,
			// which is used to look up the session in the database.
			strategy: "database",
			// strategy: "jwt",

			// Seconds - How long until an idle session expires and is no longer valid.
			maxAge: Number(process.env.Session_maxAge) || 30 * 24 * 60 * 60, // 30 days

			// Seconds - Throttle how frequently to write to database to extend a session.
			// Use it to limit write operations. Set to 0 to always update the database.
			// Note: This option is ignored if using JSON Web Tokens
			updateAge: Number(process.env.Session_updateAge) || 24 * 60 * 60, // 24 hours

			// The session token is usually either a random UUID or string, however if you
			// need a more customized session token string, you can define your own generate function.
			// generateSessionToken: () => {
			// 	return randomUUID?.() ?? randomBytes(32).toString("hex");
			// },
		},
		theme: {
			colorScheme: "auto",
		},
		debug: process.env.NODE_ENV !== "production",
		logger: {
			error(code, ...message) {
				// console.error(code, message);
			},
			warn(code, ...message) {
				// console.warn(code, message);
			},
			debug(code, ...message) {
				// console.log(code, message);
			},
		},
	});
}
