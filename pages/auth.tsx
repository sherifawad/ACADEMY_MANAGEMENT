import Head from "next/head";
import Register from "components/Register";
import { useState } from "react";
import Login from "components/Login";
import { GetServerSideProps } from "next";

export default function Auth() {
	const [loginActive, setLoginActive] = useState(true);
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
	if (req.cookies.token) {
		return {
			redirect: {
				permanent: false,
				destination: "/",
			},
			props: {},
		};
	}

	return { props: {} };
};
