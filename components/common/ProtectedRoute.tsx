import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const { status, data: session } = useSession();

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/");
		}
	}, [router, status]);

	useEffect(() => {
		if ((session as any)?.error && (session as any)?.error === "RefreshAccessTokenError") {
			signIn(); // Force sign in to hopefully resolve error
		}
	}, [session]);

	if (status === "unauthenticated") return null;

	return <>{children}</>;
};

export default ProtectedRoute;
