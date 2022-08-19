import Paths from "core/paths";
import { user } from "features/userFeature/userTypes";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function useAuth(shouldRedirect: boolean = false) {
	const { data: session = {} as { user: user; error: string; accessToken: string }, status } = useSession();
	const router = useRouter();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState<user>();
	const [accessToken, setAccessToken] = useState(null);

	const signOutHandler = (path: string = Paths.SignIn) => {
		signOut({ redirect: shouldRedirect, callbackUrl: path }).then((data) => router.replace(data?.url));
	};

	useEffect(() => {
		if (status !== "authenticated") {
			return;
		}

		if ((session?.user as any)?.id) {
			setUser(session?.user);
		} else if (session?.accessToken) {
			setAccessToken(session?.accessToken);
		} else {
			// logging.error("invalid auth state", { data, status });
			// signOut({ callbackUrl: Paths.SignIn, redirect: shouldRedirect });
			signOutHandler();
		}
	}, [status, (session?.user as any)?.id]);

	useEffect(() => {
		if (session?.error === "RefreshAccessTokenError") {
			// signOut({ callbackUrl: Paths.SignIn, redirect: shouldRedirect });
			signOutHandler();
		}

		if (session === null) {
			if (router.route !== Paths.SignIn) {
				router.replace(Paths.SignIn);
			}
			setIsAuthenticated(false);
		} else if (session !== undefined) {
			if (router.route === Paths.SignIn) {
				router.replace(Paths.Home);
			}
			setIsAuthenticated(true);
		}
	}, [session]);

	return { isAuthenticated, accessToken, user, signOutHandler };
}

export default useAuth;
