import Head from "next/head";
import Register from "components/Register";
import { useEffect, useState } from "react";
import Login from "components/Login";
import { GetServerSideProps } from "next";
import { getCsrfToken, getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Auth() {
	const [loginActive, setLoginActive] = useState(true);
	const { data: session } = useSession();
	const router = useRouter();
	if (session) {
		router.push("/");
	}
	return (
		<div className="container">
			<Head>
				<title>Auth</title>
				<meta name="description" content="Authentication" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{!loginActive && <Register setLogin={setLoginActive} />}
			{loginActive && <Login setLogin={setLoginActive} />}
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const session = await getSession({ req });

	if (session?.user) {
		return {
			redirect: {
				permanent: false,
				destination: "/",
			},
			props: { user: session?.user },
		};
	}
	return { props: {} };
};
