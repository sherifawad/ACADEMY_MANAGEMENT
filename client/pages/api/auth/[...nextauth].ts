import Paths from "core/paths";
import { ObjectFlatten } from "core/utils";
import {
	getAccessToken,
	getHubLogin,
	getHubRegister,
	revokeRefreshToken,
	userLogin,
} from "features/authFeature/authMutations";
import { user } from "features/userFeature/userTypes";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

const refreshAccessToken = async (token: any) => {
	try {
		const { provider, providerAccountId, refreshToken, accessToken } = (token as any) || {};
		// console.log(
		// 	"🚀 ~ file: [...nextauth].ts ~ line 12 ~ refreshAccessToken ~ providerAccountId",
		// 	providerAccountId
		// );
		const data = await getAccessToken({ provider, providerAccountId, refreshToken }, accessToken);
		// console.log(
		// 	"🚀 ~ file: [...nextauth].ts ~ line 14 ~ refreshAccessToken ~ data",
		// 	JSON.stringify(data, null, 2)
		// );
		const { error, ...rest } = (data as any) || {};
		// console.log("🚀 ~ file: [...nextauth].ts ~ line 18 ~ refreshAccessToken ~ rest", rest);
		if (error) {
			// console.log("🚀 ~ file: [...nextauth].ts ~ line 16 ~ refreshAccessToken ~ errors", errors);
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
	// debug: process.env.NODE_ENV === "development",
	providers: [
		CredentialsProvider({
			type: "credentials",
			id: "credentialsId",
			credentials: {},
			async authorize(credentials, _req) {
				const { email, password } = credentials as {
					email: string;
					password: string;
				};
				// perform you login logic
				// find out user from db
				// console.log("🚀 ~ file: [...nextauth].ts ~ line 57 ~ authorize ~ email", email);
				const { data, error } = await userLogin({ email, password, provider: "credentials" });
				// const result = ObjectFlatten(data);
				if (!error) return data;
				return null;
			},
		}),
		GitHubProvider({
			id: "githubLogin",
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		GitHubProvider({
			id: "githubRegister",
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
		// async signIn({ user, account, profile, email, credentials }) {
		// 	if (account?.provider === "githubRegister") {
		// 		const { data, error } = await getHubLogin({
		// 			provider: "github",
		// 			providerAccountId: account.providerAccountId,
		// 			type: account.type,
		// 			name: profile?.name,
		// 		});
		// 		// const result = ObjectFlatten(data);
		// 		if (!error) {
		// 			user = { ...data };
		// 			account = { ...data };
		// 			profile = { ...data };
		// 			return true;
		// 		}
		// 		return false;
		// 	}

		// 	return false;
		// },

		async jwt({ token, user, profile, account }) {
			try {
				//TODO: pass account data to backend if no user connected add onetime hash then connect else get connected user accessToken
				// console.log("🚀 ~ file: [...nextauth].ts ~ line 75 ~ jwt ~ token", token);
				// console.log("🚀 ~ file: [...nextauth].ts ~ line 64 ~ jwt ~ user", JSON.stringify(user, null, 2));
				// Initial sign in
				if (user) {
					if (account?.provider === "githubLogin") {
						const { data, error } = await getHubLogin({
							provider: "github",
							providerAccountId: account.providerAccountId,
							type: account.type,
							name: profile?.name,
						});
						// const result = ObjectFlatten(data);
						if (!error) {
							const { accessToken, refreshToken, provider, providerAccountId } =
								(data as any) || {};

							return {
								...token,
								user: { ...(data as any)?.user, avatar: (data as any)?.user?.image },
								provider,
								providerAccountId,
								...accessToken,
								...refreshToken,
							};
						}
					} else if (account?.provider === "githubRegister") {
						if (user && account && profile) {
							const providerRegisterData = {
								provider: "github",
								type: account.type,
								providerAccountId: account.providerAccountId,
								token_type: account.tokenType,
								scope: account.scope,
								name: profile.name,
								email: profile.email,
								image: profile.image,
							};
							return {
								...token,
								providerRegisterData,
							};
						}
					} else if (account?.provider === "credentialsId") {
						const { accessToken, refreshToken, provider, providerAccountId } =
							(user as any) || {};
						if (user?.user) {
							return {
								...token,
								user: { ...(user as any)?.user, avatar: (user as any)?.user?.image },
								provider,
								providerAccountId,
								...accessToken,
								...refreshToken,
							};
						}
					}
					return token;
				}
				// if (user?.user) {
				// 	return {
				// 		...token,
				// 		user: { ...(user as any)?.user, avatar: (user as any)?.user?.image },
				// 		provider,
				// 		providerAccountId,
				// 		...accessToken,
				// 		...refreshToken,
				// 	};
				// }
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
			} catch (error) {
				console.log("🚀 ~ file: [...nextauth].ts ~ line 194 ~ jwt ~ error", error);
				return token;
			}
		},
		async session({ session, token, user }) {
			try {
				// Send properties to the client, like an access_token from a provider.
				session.user = token.user || null;
				session.account = token.userAccount || null;
				session.profile = token.userProfile || null;
				session.accessToken = token.accessToken || null;
				session.error = token.error || null;
				session.providerRegisterData = token.providerRegisterData || null;

				// const storageName = localStorage.getItem("name");
				// console.log("🚀 ~ file: [...nextauth].ts ~ line 208 ~ session ~ storageName", storageName);
				// console.log("🚀 ~ file: [...nextauth].ts ~ line 104 ~ session ~ session", session);
				return session;
			} catch (error) {
				console.log("🚀 ~ file: [...nextauth].ts ~ line 215 ~ session ~ error", error);
			}
		},
	},
	events: {
		// async signIn({ account, profile }) {},
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
