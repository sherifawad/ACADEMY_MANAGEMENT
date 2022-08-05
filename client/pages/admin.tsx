import Head from "next/head";
import { GetServerSideProps } from "next";
import UsersList from "components/UsersList";
import { useState } from "react";
import AddModel from "components/AddModel";
import AddStudent from "features/studentFeature/AddStudent";
import { createAxiosService } from "core/utils";
import { GET_USERS } from "core/queries/userQueries";
import { useRouter } from "next/router";

export default function Admin({ users }) {
	const [isOpened, setIsOpened] = useState(false);
	const router = useRouter();

	const onProceed = () => {
		router.replace(router.asPath);
		console.log("Proceed clicked");
	};

	const onClose = () => {
		setIsOpened(false);
		console.log("close clicked");
	};
	return (
		<div className="container">
			<Head>
				<title>Admin</title>
				<meta name="description" content="Authentication" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="grid grid-row-[auto_1fr] gap-8">
				<AddModel isOpened={isOpened} onClose={onClose} title="Add Student">
					<AddStudent onProceed={onProceed} onClose={onClose} />
				</AddModel>
				<button
					onClick={() => setIsOpened(true)}
					className="fixed justify-self-end block w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					type="button"
				>
					Add Student
				</button>
				<UsersList users={users} />
			</div>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	try {
		// const session = await getSession({ req });
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

		const result = await createAxiosService(GET_USERS);
		if (result?.data?.data) {
			return {
				props: {
					users: result.data?.data.Users,
				},
			};
		}
	} catch (error) {
		// console.error(
		// 	"🚀 ~ file: admin.tsx ~ line 69 ~ constgetServerSideProps:GetServerSideProps= ~ error",
		// 	error
		// );
		// return {
		// 	props: {
		// 		session: null,
		// 	},
		// };
	}
	return {
		props: {},
	};
};
