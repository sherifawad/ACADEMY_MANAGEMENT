import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "lib/apollo";
import { SessionProvider } from "next-auth/react";
import MainLayout from "../components/layout/MainLayout";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
			<ApolloProvider client={apolloClient}>
				<MainLayout>
					<Component {...pageProps} />
				</MainLayout>
			</ApolloProvider>
		</SessionProvider>
	);
}

export default MyApp;
