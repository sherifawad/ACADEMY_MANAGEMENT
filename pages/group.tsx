import AddGroup from "components/AddGroup";
import AddModel from "components/AddModel";
import GroupsList from "components/GroupsList";
import { setAuthToken } from "core/apollo-headers";
import { GROUPS_QUERY } from "graphql/queries/groupQueries";
import { apolloClient } from "lib/apollo";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

function group({ groups }) {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [isOpened, setIsOpened] = useState(false);

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const router = useRouter();
	// Call this function whenever you want to
	// refresh props!

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
				<title>Group</title>
				<meta name="description" content="group page" />
			</Head>

			<AddModel isOpened={isOpened} onClose={onClose} title="Add Group">
				<AddGroup onProceed={onProceed} onClose={onClose} />
			</AddModel>
			<div className="grid grid-row-[auto_1fr] gap-8">
				<button
					onClick={() => setIsOpened(true)}
					className="justify-self-end block w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					type="button"
				>
					Add Group
				</button>
				<GroupsList groupsItems={groups} />
			</div>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	try {
		const session = await getSession({ req });

		if (!session) {
			return {
				redirect: {
					destination: "/auth",
					permanent: false,
				},
			};
		}

		apolloClient.setLink(setAuthToken(session.accessToken as string));
		const result = await apolloClient.query({ query: GROUPS_QUERY });
		if (result?.data) {
			return {
				props: {
					session,
					groups: result.data.Groups,
				},
			};
		}
	} catch (error) {
		// console.error(
		// 	"🚀 ~ file: group.tsx ~ line 73 ~ constgetServerSideProps:GetServerSideProps= ~ error",
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

export default group;
