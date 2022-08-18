import Head from "next/head";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { getCsrfToken, getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Register from "components/Register";
import Login from "components/Login";
import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";

export default function Auth() {
	const [loginActive, setLoginActive] = useState(true);
	// const { data: session } = useSession();
	const router = useRouter();
	// if (session) {
	// 	router.push("/");
	// }
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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    try{
    const session = await unstable_getServerSession(req, res, authOptions);

	if (session?.user) {
		return {
			redirect: {
				permanent: false,
				destination: "/",
			},
			props: { user: session?.user },
		};
	}}catch(error){

        return { props: {} };
    }
};
