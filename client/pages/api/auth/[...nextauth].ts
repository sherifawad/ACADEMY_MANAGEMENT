import Paths from "core/paths";
import { ObjectFlatten } from "core/utils";
import { getAccessToken, revokeRefreshToken, userLogin } from "features/authFeature/authMutations";
import { user } from "features/userFeature/userTypes";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

const refreshAccessToken = async (token: any) => {
	try {
		const { provider, providerAccountId, refreshToken, accessToken } = (token as any) || {};
		console.log(
			"🚀 ~ file: [...nextauth].ts ~ line 12 ~ refreshAccessToken ~ providerAccountId",
			providerAccountId
		);
		const data = await getAccessToken({ provider, providerAccountId, refreshToken }, accessToken);
		// console.log(
		// 	"🚀 ~ file: [...nextauth].ts ~ line 14 ~ refreshAccessToken ~ data",
		// 	JSON.stringify(data, null, 2)
		// );
		const { errors, ...rest } = (data as any) || {};
		console.log("🚀 ~ file: [...nextauth].ts ~ line 18 ~ refreshAccessToken ~ rest", rest);
		if (errors) {
			console.log("🚀 ~ file: [...nextauth].ts ~ line 16 ~ refreshAccessToken ~ errors", errors);
			return {
				...token,
				error: "RefreshAccessTokenError",
			};
		}
		return {
			accessTokenExpiresIn: rest.accessTokenExpiresIn,
			accessToken: rest.accessToken,
		};
	} catch (error) {
		return {
			...token,
			error: "RefreshAccessTokenError",
		};
	}
};

export const authOptions: NextAuthOptions = {
	debug: process.env.NODE_ENV === "development",
	providers: [
		CredentialsProvider({
			type: "credentials",
			credentials: {},
			async authorize(credentials, _req) {
				const { email, password } = credentials as {
					email: string;
					password: string;
				};
				// perform you login logic
				// find out user from db
				const { data, error } = await userLogin({ email, password, provider: "credentials" });
				// const result = ObjectFlatten(data);
				if (!error) return data;
				return null;
			},
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,

	session: { strategy: "jwt" },
	pages: {
		signIn: Paths.Auth,
		// error: '/auth/error',
		// signOut: '/auth/signout'
	},
	callbacks: {
		async jwt({ token, user }) {
			//TODO: pass account data to backend if no user connected add onetime hash then connect else get connected user accessToken
			// console.log("🚀 ~ file: [...nextauth].ts ~ line 75 ~ jwt ~ token", token);
			// console.log("🚀 ~ file: [...nextauth].ts ~ line 75 ~ jwt ~ user", user);
			// console.log("🚀 ~ file: [...nextauth].ts ~ line 64 ~ jwt ~ user", JSON.stringify(user, null, 2));
			const { accessToken, refreshToken, provider, providerAccountId } = (user as any) || {};
			// Initial sign in
			if (user?.user) {
                
				return {
					...token,
					user: { ...(user as any).user, avatar: (user as any).user.image },
					provider,
					providerAccountId,
					...accessToken,
					...refreshToken,
				};
			}
			// Return previous token if the access token has not expired yet

			// add 10 seconds from currentTime
			const afterNow = new Date().getTime() + 10 * 1000;
			if (afterNow < Number(token.accessTokenExpiresIn) * 1000) {
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
			// console.log("🚀 ~ file: [...nextauth].ts ~ line 104 ~ session ~ session", session);
			return session;
		},
	},
	events: {
		// async signIn(message) { /* on successful sign in */ },
		async signOut({ token }) {
			try {
				// console.log(
				// 	"🚀 ~ file: [...nextauth].ts ~ line 107 ~ signOut ~ token",
				// 	JSON.stringify(token, null, 2)
				// );
				const { user, refreshToken, accessToken } = token || {};
				const { id } = (user as user) || {};
				await revokeRefreshToken({ revokeTokenId: id, token: refreshToken }, accessToken);
			} catch (error) {}
		},
		// async createUser(message) { /* user created */ },
		// async updateUser(message) { /* user updated - e.g. their email was verified */ },
		// async linkAccount(message) { /* account (e.g. Twitter) linked to a user */ },
		// async session(message) { /* session is active */ },
	},
};

export default NextAuth(authOptions);
