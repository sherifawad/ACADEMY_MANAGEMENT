import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "lib/prisma";
import { GetUserByEmail, ValidateUserCredentials } from "graphql/types";
import { decodeToken, encodeUser, JWT_SECRET, signUser } from "core/jwt";
import Paths from "core/paths";
import { Role } from "@prisma/client";
import Credentials from "next-auth/providers/credentials";
import { gql } from "@apollo/client";
import { apolloClient } from "lib/apollo";
import CredentialsProvider from "next-auth/providers/credentials";
import { sign } from "jsonwebtoken";

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
	debug: process.env.NODE_ENV !== 'production',
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
							name: user.name,
							email: user.email,
							image: user.avatar,
							roles: user.roles,
							access_token: token,
                            id: user.id,

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
	pages: {
		signIn: Paths.Login,
		signOut: Paths.Logout,
		error: Paths.Login,
	},
	secret: JWT_SECRET,
});
