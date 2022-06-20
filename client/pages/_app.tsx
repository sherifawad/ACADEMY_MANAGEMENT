import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import MainLayout from "../components/layout/MainLayout";
import "../styles/globals.css";
import "react-next-dates/dist/style.css";
import { apolloClient } from "lib/apollo";

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
