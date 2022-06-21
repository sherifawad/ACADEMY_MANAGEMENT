import Head from "next/head";
import { GetServerSideProps } from "next";
import { getCsrfToken, getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getToken } from "next-auth/jwt";
import UsersList from "components/UsersList";

export default function Admin({ session, users }) {
	return (
		<div className="container">
			<Head>
				<title>Admin</title>
				<meta name="description" content="Authentication" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{users?.map((user, index) => (
				<div key={index}>{user.name}</div>
			))}
			<UsersList />
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	try {
		const session = await getSession({ req });

		// if (!session) {
		// 	return {
		// 		redirect: {
		// 			destination: "/auth",
		// 			permanent: false,
		// 		},
		// 	};
		// }

		// apolloClient.setLink(setAuthToken());
		// const result = await apolloClient.query({ query: GET_USERS });
		// if (result?.data) {
		// 	return {
		// 		props: {
		// 			users: result.data.Users,
		// 		},
		// 	};
		// }
	} catch (error) {
		// console.error(
		// 	"🚀 ~ file: admin.tsx ~ line 69 ~ constgetServerSideProps:GetServerSideProps= ~ error",
		// 	error
		// );
		return {
			props: {
				session: null,
			},
		};
	}
	return {
		props: {},
	};
};
