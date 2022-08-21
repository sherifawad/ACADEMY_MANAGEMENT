import Paths from "core/paths";
import { ObjectFlatten } from "core/utils";
import { getRefreshToken, userLogin } from "features/authFeature/authMutations";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const refreshAccessToken = async (token: any) => {
	try {
		const {
			user: { id },
			refreshToken,
		} = (token as any) || {};
		const data = await getRefreshToken({ userId: id, token: refreshToken });
		const { accessTokenExpiresIn, accessToken, hash, errors } = (data as any) || {};
		if (errors) {
			return {
				...token,
				error: "RefreshAccessTokenError",
			};
		}
		return {
			...token,
			accessToken,
			accessTokenExpires: accessTokenExpiresIn,
			refreshToken: hash ?? refreshToken,
		};
	} catch (error) {
		return {
			...token,
			error: "RefreshAccessTokenError",
		};
	}
};

export const authOptions: NextAuthOptions = {
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
				// const result = ObjectFlatten(data);
				return data;
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,

	session: { strategy: "jwt" },
	pages: {
		signIn: Paths.SignIn,
		// error: '/auth/error',
		// signOut: '/auth/signout'
	},
	callbacks: {
		async jwt({ token, user }) {
			const { accessTokenExpiresIn, accessToken, refreshExpireIn, hash, ...rest } = (user as any) || {};
			// Initial sign in
			if (user) {
				return {
					...token,
					...rest,
					accessToken: accessToken,
					accessTokenExpires: accessTokenExpiresIn,
					refreshToken: hash,
					refreshExpireIn,
				};
			}
			// Return previous token if the access token has not expired yet

			// add 10 seconds from currentTime
			const afterNow = new Date().getTime() + 10 * 1000;
			if (afterNow < Number(token.accessTokenExpires) * 1000) {
				return token;
			}

			// Access token has expired, try to update it
			return await refreshAccessToken(token);
		},
		async session({ session, token, user }) {
			// Send properties to the client, like an access_token from a provider.
			session.user = token.user;
			session.accessToken = token.accessToken || null;
			session.error = token.error || null;
			return session;
		},
	},
};

export default NextAuth(authOptions);
