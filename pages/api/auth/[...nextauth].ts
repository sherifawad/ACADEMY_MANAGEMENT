import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "lib/prisma";
import { GetUserByEmail, nextAuthToken, ValidateUserCredentials } from "graphql/types";
import { decodeToken, encodeUser, getTokenState, JWT_SECRET, signUser } from "core/jwt";
import Paths from "core/paths";
import { gql } from "@apollo/client";
import { apolloClient } from "lib/apollo";
import CredentialsProvider from "next-auth/providers/credentials";
import { sign } from "jsonwebtoken";
import { Role, User } from "@prisma/client";
import { MAX_AGE, TOKEN_NAME } from "core/auth-cookies";
import { setAuthToken } from "core/apollo-headers";
import { REFRESH_TOKEN_MUTATION } from "graphql/mutations/authPayloadMutations";

const LOGIN_MUTATION = gql`
	mutation UserLogin($email: String!, $password: String!) {
		userLogin(email: $email, password: $password) {
			token
			refreshToken
			user {
				id
				name
				avatar
				email
				role
				emailConfirmed
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
						const { user, token, refreshToken, expire } = result.data.userLogin;
						return {
							...user,
							accessToken: token,
							refreshToken,
						};
					}
				} catch (error) {
					console.error("🚀 ~ file: [...nextauth].ts ~ line 85 ~ authorize ~ error", error);
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
			try {
				if (!!user) {
					const { accessToken, refreshToken, ...rest } = user;
					token.user = rest;
					token.accessToken = accessToken;
					token.refreshToken = refreshToken;
				}

				const tokenState = getTokenState(token?.accessToken as string | undefined | null);
				if (!tokenState?.needRefresh || tokenState?.valid) {
					return token;
				}

				apolloClient.setLink(setAuthToken());
				const result = await apolloClient.mutate({
					mutation: REFRESH_TOKEN_MUTATION,
					variables: {
						userId: (token.user as User).id,
						token: token.refreshToken,
					},
				});

				if (result?.data?.refreshToken?.token) {
					token.accessToken = result.data.refreshToken.token;
				}
			} catch (error) {
				console.error("🚀 ~ file: [...nextauth].ts ~ line 118 ~ jwt ~ error", error);
			}
		},

		async session({ session, token }) {
			if (session) {
				session.accessToken = token.accessToken;
				session.refreshToken = token.refreshToken;
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
