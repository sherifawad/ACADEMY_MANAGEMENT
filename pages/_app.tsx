import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "lib/apollo";
import App from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<ApolloProvider client={apolloClient}>
			{" "}
			<Component {...pageProps} />
		</ApolloProvider>
	);
}

export default MyApp;
