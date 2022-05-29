import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "lib/apollo";
import MainLayout from "../components/layout/MainLayout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<ApolloProvider client={apolloClient}>
			{" "}
			<MainLayout>
				<Component {...pageProps} />
			</MainLayout>
		</ApolloProvider>
	);
}

export default MyApp;
