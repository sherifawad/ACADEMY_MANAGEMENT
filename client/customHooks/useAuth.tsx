import Paths from "core/paths";
import { revokeRefreshToken } from "features/authFeature/authMutations";
import { user } from "features/userFeature/userTypes";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function useAuth(shouldRedirect: boolean = false) {
	const { data: session, status } = useSession();
	const { user, error, accessToken } =
		(session as unknown as { user: user; error: boolean; accessToken: string }) || {};
	const { id } = user || {};
	const router = useRouter();
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [currentUser, setCurrentUser] = useState<user>();
	const [currentAccessToken, setCurrentAccessToken] = useState<string>(null);

	const signOutHandler = async (path: string = undefined) => {
		signOut({ redirect: shouldRedirect, callbackUrl: path }).then((data) => router.replace(data?.url));
	};

	useEffect(() => {
		if (session?.providerRegisterData && localStorage) {
			const json = JSON.stringify(session.providerRegisterData);
			localStorage.setItem("providerRegisterData", json);
		}
		if (session?.error === "RefreshAccessTokenError") {
			console.log("🚀 ~ file: useAuth.tsx ~ line 28 ~ useEffect ~ RefreshAccessTokenError")
			setIsAuthenticated(false);
			signOutHandler();
			return;
		}

		if (status !== "authenticated") {
			setIsAuthenticated(false);
			return;
		}
		setIsAuthenticated(true);

		if (id) {
			setCurrentUser(session?.user);
		}
		if (accessToken) {
			setCurrentAccessToken(accessToken);
		}
	}, [session]);

	return { isAuthenticated, accessToken: currentAccessToken, user: currentUser, signOutHandler };
}

export default useAuth;
