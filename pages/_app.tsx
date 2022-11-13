import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import AuthWrapper from "@/common/AuthWrapper";
import Header from "@/components/layout/Header";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<SessionProvider session={session}>
			<AuthWrapper>
				<Header />
				<Component {...pageProps} />
			</AuthWrapper>
		</SessionProvider>
	);
}
