import { ObjectFlatten } from "core/utils";
import { getRefreshToken, userLogin } from "features/authFeature/authMutations";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const refreshAccessToken = async (token: any) => {
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
		accessToken: accessToken,
		accessTokenExpires: accessTokenExpiresIn,
		refreshToken: hash ?? refreshToken,
	};
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
			const { accessTokenExpiresIn, accessToken, refreshExpireIn, hash, ...rest } = (user as any) || {};
			// Initial sign in
			if (user) {
				return {
					...token,
					accessToken: accessToken,
					accessTokenExpires: accessTokenExpiresIn,
					refreshToken: hash,
					...rest,
				};
			}
			// Return previous token if the access token has not expired yet

			if (Date.now() < (token.accessTokenExpires as number) * 1000) {
				return token;
			}

			// Access token has expired, try to update it
			return refreshAccessToken(token);
		},
		async session({ session, token, user }) {
			// Send properties to the client, like an access_token from a provider.
			session.accessToken = token;
			session.user = token.user;
			session.accessToken = token.accessToken || null;
			session.error = token.error || null;
			return session;
		},
	},
};

export default NextAuth(authOptions);
