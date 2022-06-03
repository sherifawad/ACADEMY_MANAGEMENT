import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "lib/prisma";
import { GetUserByEmail, nextAuthToken, ValidateUserCredentials } from "graphql/types";
import { decodeToken, encodeUser, JWT_SECRET, signUser } from "core/jwt";
import Paths from "core/paths";
import { gql } from "@apollo/client";
import { apolloClient } from "lib/apollo";
import CredentialsProvider from "next-auth/providers/credentials";
import { sign } from "jsonwebtoken";
import { Role } from "@prisma/client";
import { MAX_AGE, TOKEN_NAME } from "core/auth-cookies";
import { setAuthToken } from "core/apollo-headers";

const LOGIN_MUTATION = gql`
	mutation Mutation($email: String!, $password: String!) {
		userLogin(email: $email, password: $password) {
			token
			user {
				id
				name
				avatar
				email
				role
				createdAt
			}
		}
	}
`;

export default NextAuth({
	debug: process.env.NODE_ENV !== "production",
	logger: {
		error(code, metadata) {
			console.log({ type: "inside error logger", code, metadata });
		},
		warn(code) {
			console.log({ type: "inside warn logger", code });
		},
		debug(code, metadata) {
			console.log({ type: "inside debug logger", code, metadata });
		},
	},
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "email", type: "text", placeholder: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				try {
					const { email, password }: { email: string; password: string } = credentials;
					apolloClient.setLink(setAuthToken());

					const result = await apolloClient.mutate({
						mutation: LOGIN_MUTATION,
						variables: {
							email,
							password,
						},
					});

					if (result.errors) throw new Error("errors");
					if (!result.data) throw new Error("Data not returned!");

					if (result.data.userLogin) {
						const { user, token } = result.data.userLogin;
						return {
							...user,
							accessToken: token,
						};
					}
				} catch (error) {
					throw new Error(error);
				}
				return null;
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async jwt({ token, user }) {
			if (!!user) {
				const { accessToken, ...rest } = user;
				token.user = rest;
				token.accessToken = accessToken;
			}

			return token;
		},
		// async jwt({ token, user }) {
		// 	// console.log("user", user);
		// 	// console.log("token", token);
		// 	if (user) {
		// 		const {
		// 			accessToken,

		// 			accessTokenExpiresAt,

		// 			refreshToken,
		// 		} = user;

		// 		return {
		// 			accessToken,

		// 			accessTokenExpiresAt,

		// 			refreshToken,
		// 		};
		// 	}

		// 	if (Date.now() < new Date(token.accessTokenExpiresAt + "").getTime()) {
		// 		// console.log("trueee")
		// 		return token;
		// 	}
		// 	// else{

		// 	//   console.log("false");
		// 	//   console.log("date now", Date.now())
		// 	//   console.log("date now", new Date(Date.now()))
		// 	//   console.log("token date", token.accessTokenExpiresAt)
		// 	//   console.log("token date type", typeof token.accessTokenExpiresAt)
		// 	//   console.log("date now new", new Date(token.accessTokenExpiresAt))
		// 	//   console.log("date now get", new Date(token.accessTokenExpiresAt + "").getTime())

		// 	// }
		// 	return await refreshAccessToken(token);
		// },

		async session({ session, token }) {
			if (session) {
				session.accessToken = token.accessToken;
				session.user = token.user;
			}
			return session;
		},
	},
	pages: {
		signIn: Paths.Login,
		signOut: Paths.Logout,
		error: Paths.Login,
	},
	secret: JWT_SECRET,
});
