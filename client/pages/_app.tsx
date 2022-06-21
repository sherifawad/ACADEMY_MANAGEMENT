import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import MainLayout from "../components/layout/MainLayout";
import "../styles/globals.css";
import "react-next-dates/dist/style.css";
import { apolloClient } from "lib/apollo";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<SessionProvider session={session}>
			<QueryClientProvider client={queryClient}>
				<ApolloProvider client={apolloClient}>
					<MainLayout>
						<Component {...pageProps} />
					</MainLayout>
				</ApolloProvider>
			</QueryClientProvider>
		</SessionProvider>
	);
}

export default MyApp;
