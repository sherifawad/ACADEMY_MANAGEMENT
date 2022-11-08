import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import prisma from "../../../lib/prisma";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@prisma/client";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
	return await NextAuth(req, res, {
		adapter: PrismaAdapter(prisma),
		providers: [
			GithubProvider({
				clientId: process.env.GITHUB_ID ?? "",
				clientSecret: process.env.GITHUB_SECRET ?? "",
			}),
			CredentialsProvider({
				// The name to display on the sign in form (e.g. "Sign in with...")
				name: "Credentials",
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
						return await prisma.user.findFirstOrThrow({
							where: {
								name: name,
							},
							include: {
								role: true,
							},
						});
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
			jwt(params) {
				const customUser = params.user as any;
				// update token
				if (customUser.role) {
					params.token.user = customUser;
				}
				// return final_token
				return params.token;

            
			},
			async session({ session, token, user }) {
				console.log("🚀 ~ file: [...nextauth].ts ~ line 64 ~ session ~ token", token);
				// user object is user from db
				session.user = token?.user || user; // set user id on session object
				// session.dbUser = user
				return session;
			},
		},
		secret: process.env.SECRET,
		session: {
			strategy: "database",
		},
		theme: {
			colorScheme: "auto",
		},
		debug: false,
	});
}
