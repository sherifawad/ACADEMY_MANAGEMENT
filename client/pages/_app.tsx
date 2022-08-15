import { SessionProvider } from "next-auth/react";
import MainLayout from "../components/layout/MainLayout";
import "../styles/globals.css";
import "react-next-dates/dist/style.css";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	// if (typeof document === "undefined") {
	// 	React.useLayoutEffect = React.useEffect;
	// }
	const [queryClient] = useState(() => new QueryClient());

	return (
		<SessionProvider session={session}>
			<QueryClientProvider client={queryClient}>
				<MainLayout>
					<Component {...pageProps} />
				</MainLayout>
			</QueryClientProvider>
		</SessionProvider>
	);
}

export default MyApp;
