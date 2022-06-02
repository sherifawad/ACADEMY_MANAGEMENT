import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "lib/apollo";
import { SessionProvider } from "next-auth/react";
import MainLayout from "../components/layout/MainLayout";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<ApolloProvider client={apolloClient}>
			<SessionProvider session={session}>
				<MainLayout>
					<Component {...pageProps} />
				</MainLayout>
			</SessionProvider>
		</ApolloProvider>
	);
}

export default MyApp;
