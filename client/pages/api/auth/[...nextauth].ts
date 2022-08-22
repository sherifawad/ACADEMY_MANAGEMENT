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
		// console.log(
		// 	"🚀 ~ file: [...nextauth].ts ~ line 14 ~ refreshAccessToken ~ data",
		// 	JSON.stringify(data, null, 2)
		// );
		const { accessTokenExpiresIn, accessToken, errors } = (data as any) || {};
		if (errors) {
			console.log("🚀 ~ file: [...nextauth].ts ~ line 16 ~ refreshAccessToken ~ errors", errors);
			return {
				...token,
				error: "RefreshAccessTokenError",
			};
		}
		return {
			...token,
			accessToken,
			accessTokenExpires: accessTokenExpiresIn,
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
			// console.log("🚀 ~ file: [...nextauth].ts ~ line 64 ~ jwt ~ user", JSON.stringify(user, null, 2));
			const { accessTokenExpiresIn, accessToken, refreshTokenExpiresIn, refreshToken, ...rest } =
				(user as any) || {};
			// Initial sign in
			if (user) {
				return {
					...token,
					...rest,
					accessToken: accessToken,
					accessTokenExpires: accessTokenExpiresIn,
					refreshToken,
					refreshTokenExpiresIn,
				};
			}
			// Return previous token if the access token has not expired yet

			// add 10 seconds from currentTime
			const afterNow = new Date().getTime() + 10 * 1000;
			if (afterNow < Number(token.accessTokenExpires) * 1000) {
				// console.log("✅ValidToken", new Date().toLocaleTimeString());
				return token;
			}
			// console.log("❌InValidToken", new Date().toLocaleTimeString());

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
