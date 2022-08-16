import { ObjectFlatten } from "core/utils";
import { userLogin } from "features/authFeature/authMutations";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
	debug: true,
	providers: [
		CredentialsProvider({
			type: "credentials",
			credentials: {},
			async authorize(credentials, req) {
				const { email, password } = credentials as {
					email: string;
					password: string;
				};
				// perform you login logic
				// find out user from db
				const data = await userLogin({ email, password });
				const result = ObjectFlatten(data);
				return result;
				if (email !== "john@gmail.com" || password !== "1234") {
					throw new Error("invalid credentials");
				}

				// if everything is fine
				return {
					id: "1234",
					name: "John Doe",
					email: "john@gmail.com",
					role: "admin",
					avatar: "johnAvatar.png",
				};
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,

	jwt: {
		maxAge: 60 * 60 * 24 * 30,
	},
	session: { strategy: "jwt", maxAge: 24 * 60 * 60, updateAge: 24 * 60 * 60 },
	pages: {
		signIn: "/auth/signin",
		// error: '/auth/error',
		// signOut: '/auth/signout'
	},
	callbacks: {
		async jwt({ token, user }) {
			// update token
			if (user) {
				token = { token, ...user };
				token.avatar = "johnAvatar.png";
				console.log("🚀 ~ file: [...nextauth].ts ~ line 53 ~ jwt ~ token", token);
			}

			// return final_token
			return token;
		},
		async session({ session, token, user }) {
			// Send properties to the client, like an access_token from a provider.
			session.accessToken = token;
			return session;
		},
	},
};

export default NextAuth(authOptions);
